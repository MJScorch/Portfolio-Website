export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-[860px] flex-col gap-4 px-8 text-[13px] text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span>© 2026 Matthew Scorziello · University of Waterloo</span>
          {/* Attribution required by the model and recording licences. */}
          <span>3D model: Dave Love, CC-BY 4.0</span>
          <span>
            Music: Cavalleria Rusticana Intermezzo, Harid Conservatory Philharmonia / Arthur Weisberg, CC BY-NC-ND 4.0
          </span>
        </div>
        <a
          href="https://www.biblegateway.com/passage/?search=Matthew%205%3A14-16&version=DRA"
          target="_blank"
          rel="noopener"
          className="shrink-0 transition-colors hover:text-text"
        >
          Matthew 5:14-16
        </a>
      </div>
    </footer>
  )
}
