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
        {projects.map((project, i) => (
          <RevealOnScroll key={project.name} index={i}>
            {/* The whole row responds: it warms, indents slightly and its rule
                brightens, so hovering feels like the row itself is live. */}
            <li className="group -mx-4 flex flex-col gap-1.5 rounded-sm border-b border-line px-4 py-6 transition-all duration-300 hover:translate-x-1 hover:border-white/30 hover:bg-white/[0.03]">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                {/* When a project has its own page, the title itself is the way in. */}
                {project.pageUrl ? (
                  <a href={project.pageUrl} className="text-xl text-text">
                    {project.name}
                  </a>
                ) : (
                  <h3 className="text-xl text-text">{project.name}</h3>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-1.5 text-[13px] text-text-muted transition-colors hover:text-text"
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
        ))}
      </ul>
    </Section>
  )
}
