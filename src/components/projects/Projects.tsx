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
            <li className="border-b border-line py-4">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-center gap-3 text-xl text-text transition-colors hover:text-text-dim"
                >
                  <GitHubIcon className="h-4 w-4 text-text-muted transition-colors group-hover:text-text-dim" />
                  {project.name}
                </a>
              ) : (
                <span className="flex items-center gap-3 text-xl text-text-muted">
                  <span className="h-4 w-4" />
                  {project.name}
                </span>
              )}
            </li>
          </RevealOnScroll>
        ))}
      </ul>
    </Section>
  )
}
