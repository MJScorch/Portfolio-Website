import { useRecentFilms } from "../../lib/letterboxd"

const LETTERBOXD_URL = "https://letterboxd.com/MJScorch/"

/** Half-star aware rating, rendered in the same white as everything else. */
function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  return (
    <span aria-label={`${rating} out of 5`} className="text-[12px] leading-none text-text-dim">
      {"★".repeat(full)}
      {half && "½"}
    </span>
  )
}

/** A shelf of recently-watched films, styled like spines on a shelf. */
export function FilmShelf() {
  const films = useRecentFilms()
  if (films.length === 0) return null

  return (
    <div className="mt-16">
      <div className="mb-5 flex items-baseline justify-between gap-6">
        <h3 className="text-[13px] tracking-[0.12em] text-text-dim uppercase">Recently watched</h3>
        <a
          href={LETTERBOXD_URL}
          target="_blank"
          rel="noopener"
          className="shrink-0 text-[13px] text-text-muted transition-colors hover:text-text"
        >
          Letterboxd →
        </a>
      </div>

      {/* Scrolls horizontally on narrow screens rather than wrapping into a grid. */}
      <ul className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        {films.map((film) => (
          <li key={film.url} className="w-[104px] shrink-0">
            <a href={film.url} target="_blank" rel="noopener" className="group block">
              <div className="mb-2 aspect-[2/3] overflow-hidden border border-line bg-white/5">
                {film.posterUrl && (
                  <img
                    src={film.posterUrl}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                )}
              </div>
              <p className="truncate text-[13px] text-text-dim transition-colors group-hover:text-text">{film.title}</p>
              {film.rating !== undefined && <Stars rating={film.rating} />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
