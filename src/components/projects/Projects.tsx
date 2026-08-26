import { GITHUB_URL } from "../../data/links"
import { projects } from "../../data/projects"
import { GitHubIcon } from "../shared/icons"
import { RevealOnScroll } from "../shared/RevealOnScroll"
import { Section } from "../shared/Section"

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      action={
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener"
          className="flex shrink-0 items-center gap-2 text-[15px] text-text-dim transition-colors hover:text-text"
        >
          <GitHubIcon className="h-5 w-5" />
          All repositories
        </a>
      }
    >
      <ul className="flex flex-col">
        {projects.map((project, i) => {
          const href = project.page ? `/${project.page.slug}` : undefined
          return (
            <RevealOnScroll key={project.name} index={i}>
              {/* `relative` anchors the stretched link below, so the whole row
                  is one click target without nesting anchors. */}
              <li className="group relative -mx-4 flex flex-col gap-1.5 rounded-sm border-b border-line px-4 py-6 transition-all duration-300 hover:translate-x-1 hover:border-white/30 hover:bg-white/[0.03]">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  {href ? (
                    // The ::after overlay is what makes the entire row clickable
                    // while keeping a single real anchor for screen readers.
                    <a href={href} className="text-xl text-text after:absolute after:inset-0 after:content-['']">
                      {project.name}
                    </a>
                  ) : (
                    <h3 className="text-xl text-text">{project.name}</h3>
                  )}
                  {project.githubUrl && (
                    // Sits above the overlay so it wins the click and goes to
                    // the repository instead of the project page.
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener"
                      className="relative z-10 flex items-center gap-1.5 text-[13px] text-text-muted transition-colors hover:text-text"
                    >
                      <GitHubIcon className="h-3.5 w-3.5" />
                      Repository
                    </a>
                  )}
                </div>
                <p className="text-[13px] tracking-[0.06em] text-text-muted uppercase transition-colors duration-300 group-hover:text-text-dim">
                  {project.stack}
                </p>
                <p className="text-[15px] text-text-dim transition-colors duration-300 group-hover:text-text">
                  {project.summary}
                </p>
              </li>
            </RevealOnScroll>
          )
        })}
      </ul>
    </Section>
  )
}
