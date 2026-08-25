// One-off build tool: repairs the raw Sketchfab export's broken textures and
// repackages it as a single glb. Run manually via `npm run optimize:model`
// whenever the source model changes. Not part of the Vite build — output is
// committed to public/models/f2006.glb.
//
// Fidelity over file size: geometry and textures are kept at native
// resolution/precision. No mesh simplification, no texture resizing or
// recompression, no geometry quantization. The only changes from the raw
// source are (a) patching baseColorTexture on materials the source shipped
// with broken blank placeholder images, using the matching loose PNGs that
// ship alongside the glb, and (b) lossless structural cleanup (dedup of
// exact-duplicate materials/textures, pruning of unused nodes/accessors).
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, prune, PRUNE_DEFAULTS } from '@gltf-transform/functions';
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '../2006-ferrari-f2006/source/cim_2006_ferrari.glb');
const DST = path.resolve(__dirname, '../public/models/f2006.glb');
const LOOSE_TEXTURES_DIR = path.resolve(__dirname, '../2006-ferrari-f2006/textures');

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const document = await io.read(SRC);
const root = document.getRoot();
const materialByName = (name) => root.listMaterials().find((m) => m.getName() === name);

// The source export shipped broken 4x4/16x16 blank-white placeholder
// baseColorTexture images on 6 materials (a bug in whatever tool produced
// this glb) — the real livery art survives as full-resolution loose PNGs
// alongside the glb; wire those back in by content-matched name, at their
// native resolution (no resize/recompression). The loose PNGs were dumped
// from their original DDS files without correcting for DDS's bottom-up row
// order, so each is stored VERTICALLY FLIPPED from how the mesh's UVs expect
// to sample it. The fix is a vertical flip, NOT a 180° rotation: a rotation
// is a vertical flip *plus* a horizontal one, and that extra horizontal
// mirror re-lands every decal at the wrong U position (right-side-up but
// scattered onto the wrong panels, and nose geometry sampling the atlas's
// black background instead of red bodywork).
//
// Verified against the atlas's own copyright text, which is a reliable
// orientation reference: in the raw PNG it reads left-to-right in correct
// letter order with each glyph mirrored top-to-bottom — the signature of a
// pure vertical flip. `.flip()` restores it to plain readable text, while
// `.rotate(180)` renders it mirrored.
//
// Lossless: a pixel permutation, not a resample or re-encode.
const RECOVERED_TEXTURES = {
  'WCCARBODY.021': 'wccarbody.png',
  'WCEXTRA0.023': 'wcextra0.png',
  'WCEXTRA1.023': 'wcextra1.png',
  'WCWING.023': 'wcwing.png',
};

for (const [materialName, fileName] of Object.entries(RECOVERED_TEXTURES)) {
  const material = materialByName(materialName);
  if (!material) throw new Error(`Material not found: ${materialName}`);
  const raw = readFileSync(path.join(LOOSE_TEXTURES_DIR, fileName));
  const image = await sharp(raw).flip().png({ compressionLevel: 9 }).toBuffer();
  const texture = document.createTexture(fileName).setImage(image).setMimeType('image/png');
  material.setBaseColorTexture(texture);
}

// FER06WHEEL (wheel fairing) and COCKPIT (cockpit trim) use a heavily tiled
// UV layout (~150x repeat) for what was presumably a fine mesh/weave detail
// texture — that source texture isn't present anywhere in this export (only
// the same broken blank placeholder), so there's nothing to recover. Falls
// back to a plain dark tint rather than glaring white; these are minor,
// low-visibility surfaces relative to the body/wing.
for (const materialName of ['FER06WHEEL.003', 'COCKPIT.015']) {
  const material = materialByName(materialName);
  if (!material) throw new Error(`Material not found: ${materialName}`);
  material.setBaseColorTexture(null);
  material.setBaseColorFactor([0.05, 0.05, 0.05, 1]);
}

// KHR_materials_specular stores specular *intensity* in the specularTexture's
// ALPHA channel. The same broken DDS->PNG dump that corrupted the base colour
// maps also zeroed the alpha on most of these, so every affected material was
// rendering with specularIntensity = 0 — no specular highlight and no HDRI
// environment reflection at all. That is what made the paint read flat and
// matte rather than glossy Ferrari red.
//
// The tell: CHROME.003's specular alpha survived at 255, and chrome was the
// one surface still reflecting properly.
//
// Where the alpha is entirely zero the texture carries no usable information,
// so drop it and let the material's own specularFactor (authored as 1.0)
// apply uniformly. This restores the authored specular response rather than
// substituting a hand-built material.
let specularFixed = 0;
for (const material of root.listMaterials()) {
  const specular = material.getExtension('KHR_materials_specular');
  const specularTexture = specular?.getSpecularTexture();
  if (!specularTexture) continue;

  const { channels } = await sharp(Buffer.from(specularTexture.getImage())).stats();
  const alpha = channels[3];
  if (!alpha || alpha.max !== 0) continue;

  specular.setSpecularTexture(null);
  specularFixed++;
}

await document.transform(
  dedup(),
  // prune()'s single-color-texture detection has a bug on this file: it
  // silently drops baseColorTexture on several body-panel materials instead
  // of just the (genuinely single-color) specular textures it's targeting.
  // Skip texture-channel pruning; node/mesh/accessor pruning still runs.
  prune({ propertyTypes: PRUNE_DEFAULTS.propertyTypes.filter((t) => t !== 'Texture') }),
);

await io.write(DST, document);

const srcBytes = statSync(SRC).size;
const dstBytes = statSync(DST).size;
console.log(`${formatMB(srcBytes)} -> ${formatMB(dstBytes)}`);
console.log(`dropped ${specularFixed} zero-alpha specular textures`);
