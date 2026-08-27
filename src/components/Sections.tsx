import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, FileText, GraduationCap, Mail, MapPin } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { education } from '../data/education'
import { certifications, leadership } from '../data/credentials'
import { experience } from '../data/experience'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { skillGroups } from '../data/skills'
import { fetchGithubRepositories, type GithubRepository } from '../services/github'
import { GitHubMark, LinkedInMark } from './Icons'
import { ProjectPreview } from './ProjectPreview'
import { ProjectShowcase } from './ProjectShowcase'

type SectionShellProps = {
  id: string
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}

function SectionShell({ id, eyebrow, title, description, children }: SectionShellProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mb-6 flex flex-col gap-2">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent-green)]">{eyebrow}</p>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-3xl">{title}</h2>
        <p className="max-w-3xl text-sm leading-7 text-[var(--text)] sm:text-base">{description}</p>
      </div>
      {children}
    </motion.section>
  )
}

function Tag({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'blue' | 'purple' | 'green' }) {
  const toneClasses = {
    default: 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-strong)]',
    blue: 'border-[color-mix(in_srgb,var(--accent-blue)_45%,var(--border))] bg-[color-mix(in_srgb,var(--accent-blue)_10%,var(--surface))] text-[var(--accent-blue)]',
    purple: 'border-[color-mix(in_srgb,var(--accent-purple)_45%,var(--border))] bg-[color-mix(in_srgb,var(--accent-purple)_10%,var(--surface))] text-[var(--accent-purple)]',
    green: 'border-[color-mix(in_srgb,var(--accent-green)_45%,var(--border))] bg-[color-mix(in_srgb,var(--accent-green)_10%,var(--surface))] text-[var(--accent-green)]',
  }

  return <span className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs ${toneClasses[tone]}`}>{children}</span>
}

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="README.md"
      title="About / README"
      description=""
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
          <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3 font-mono text-xs text-[var(--text)]">
            <FileText className="h-4 w-4 text-[var(--accent-green)]" />
            README.md
          </div>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--text-strong)] sm:text-base">
            <p>IT graduate specializing in Web & Mobile Application Development, with a practical mix of technical, creative, and organizational skills. I enjoy building responsive web and mobile experiences, designing interfaces that are easy to use, and keeping projects, requirements, and documentation organized along the way.</p>
            <p>
              <strong className="text-[var(--text-strong)]text-justify sm:text-lg">Educational background:</strong> Bachelor of Science in Information Technology with a specialization in Web and Mobile Application at Tarlac State University.
            </p>
            <p>
              <strong className="text-[var(--text-strong)]text-justify sm:text-lg">Career focus:</strong> building useful digital experiences, improving workflows, supporting technical projects, and creating solutions that are both user-friendly and practical.
            </p>
            <p>
              <strong className="text-[var(--text-strong)] text-justify sm:text-lg">Developer statement:</strong> I love clean interfaces, organized code, clear documentation, and solutions that solve an actual problem. I believe good work doesn't always need to be complicated—it just needs to work well.
            </p>
            <p>
              <strong className="text-[var(--text-strong)] text-justify sm:text-lg">Capstone highlight:</strong> TrueHue is a color identification and assistance mobile application designed to help individuals with color vision deficiency identify colors through features such as real-time camera detection, voice feedback, photo color detection, and recolorization.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-5">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--text)]">$ git status</p>
          <div className="mt-4 space-y-3 font-mono text-sm leading-7 text-[var(--text-strong)]">
            <p>On branch main</p>
            <p>Highlights:</p>
            <div className="space-y-2 pl-4 text-[var(--text)]">
              <p>→ Cum Laude (GWA: 1.583)</p>
              <p>→ Web and Mobile application development</p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

export function SkillsSection() {
  return (
    <SectionShell
      id="skills"
      eyebrow="skills.json"
      title="Skills & Tools"
      description=" "
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
            <h3 className="text-base font-semibold text-[var(--text-strong)]">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag key={item} tone={group.title === 'Frameworks / Libraries' ? 'green' : group.title === 'Soft Skills' ? 'purple' : 'default'}>
                  {item}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

export function ProjectsSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const activeProject = activeProjectIndex === null ? null : projects[activeProjectIndex]

  const [repositories, setRepositories] = useState<GithubRepository[]>([])
  const [reposLoading, setReposLoading] = useState(false)
  const [reposError, setReposError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadRepositories() {
      if (!profile.githubUsername) {
        return
      }

      setReposLoading(true)
      const result = await fetchGithubRepositories(profile.githubUsername)

      if (!mounted) {
        return
      }

      setRepositories(result.repositories)
      setReposError(result.error)
      setReposLoading(false)
    }

    void loadRepositories()

    return () => {
      mounted = false
    }
  }, [])

  const closeShowcase = () => {
    setActiveProjectIndex(null)
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }

  const openShowcase = (projectIndex: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setActiveProjectIndex(projectIndex)
  }

  const capstone = projects[0]

  return (
    <>
      <SectionShell
        id="projects"
        eyebrow="projects/capstone"
        title="Projects"
        description=" "
      >
        {capstone && (
          <article className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
              {/* Left Column: Interactive Mobile Preview */}
              <div className="flex flex-col justify-center">
                <ProjectPreview
                  projectName={capstone.name}
                  slides={capstone.showcase}
                  presentation={capstone.presentation}
                  onOpen={(trigger) => openShowcase(0, trigger)}
                />
              </div>

              {/* Right Column: Project Details & Actions */}
              <div className="flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent-green)]">branch: main</p>
                    <Tag tone="green">Capstone</Tag>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-strong)] sm:text-2xl">{capstone.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--text-strong)]">{capstone.description}</p>
                  </div>
                  <p className="text-sm leading-6 text-[var(--text)]">
                    <strong className="text-[var(--text-strong)]">Problem solved:</strong> {capstone.problem}
                  </p>

                  <div>
                    <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--text)]">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {capstone.technologies.map((technology) => (
                        <Tag key={technology} tone="blue">
                          {technology}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--text)]">Key Features</p>
                    <ul className="space-y-2 text-sm leading-6 text-[var(--text)]">
                      {capstone.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full aspect-square bg-[var(--accent-green)]" />
                          <span className="flex-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={capstone.liveUrl || 'https://truehue.vercel.app'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-[var(--accent-green)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-green-hover)]"
                    style={{ color: 'white' }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Project
                  </a>
                  <a
                    href={capstone.githubUrl || profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-5 py-2.5 text-sm font-medium text-[var(--text-strong)] transition hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]"
                  >
                    <GitHubMark className="h-4 w-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* GitHub Repositories */}
        <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--text)]">$ git activity</p>
              <h3 className="mt-1 text-lg font-semibold text-[var(--text-strong)]">GitHub Repositories</h3>
            </div>
            <GitHubMark className="h-5 w-5 text-[var(--accent-blue)]" />
          </div>

          {reposLoading ? <p className="mt-4 text-sm text-[var(--text)]">Loading GitHub repositories...</p> : null}
          {reposError ? <p className="mt-4 text-sm text-[var(--accent-error)]">{reposError}</p> : null}

          {!reposLoading && !reposError && repositories.length === 0 ? (
            <div className="mt-4 rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-muted)] p-5 text-sm leading-7 text-[var(--text)]">
              Add a GitHub username to VITE_GITHUB_USERNAME to show live repository data.
            </div>
          ) : null}

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {repositories.map((repository) => {
              const repoTechMap: Record<string, string[]> = {
                myportfolio: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
                'gourmet-discoveries': ['React', 'Vite', 'JavaScript', 'HTML', 'CSS'],
                'simple-calculator': ['HTML', 'CSS', 'JavaScript'],
                studentrecord: ['PHP', 'MySQL'],
              }

              const repoLiveUrlMap: Record<string, string> = {
                'gourmet-discoveries': 'https://gourmet-discoveries.vercel.app/',
                gourmetdiscoveries: 'https://gourmet-discoveries.vercel.app/',
                'simple-calculator': 'https://siridc.github.io/Simple-Calculator/',
                simplecalculator: 'https://siridc.github.io/Simple-Calculator/',
              }

              const normalizedKey = repository.name.toLowerCase().replace(/[^a-z0-9]/g, '')
              const techStack =
                repoTechMap[normalizedKey] ||
                repoTechMap[repository.name.toLowerCase()] ||
                (repository.language ? [repository.language] : [])

              const liveUrl =
                repoLiveUrlMap[normalizedKey] ||
                repoLiveUrlMap[repository.name.toLowerCase()] ||
                repository.homepage ||
                null

              const description =
                repository.description ??
                (repository.name.toLowerCase() === 'myportfolio'
                  ? 'Modern developer portfolio built with React, TypeScript, Tailwind CSS, Vite, and Framer Motion.'
                  : 'No description available.')

              return (
                <article key={repository.html_url} className="flex flex-col justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-base font-semibold text-[var(--text-strong)]">{repository.name}</h4>
                      <GitHubMark className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text)]" />
                    </div>
                    <p className="mt-1.5 text-sm leading-6 text-[var(--text)]">{description}</p>
                    {techStack.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {techStack.map((tech) => (
                          <Tag key={tech} tone="blue">
                            {tech}
                          </Tag>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2.5 pt-2">
                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md bg-[var(--accent-green)] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[var(--accent-green-hover)]"
                        style={{ color: 'white' }}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View Project
                      </a>
                    )}
                    <a
                      href={repository.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-strong)] transition hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]"
                    >
                      <GitHubMark className="h-3.5 w-3.5" />
                      Open repository
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </SectionShell>

      <AnimatePresence>
        {activeProject ? (
          <ProjectShowcase
            projectName={activeProject.name}
            slides={activeProject.showcase}
            onClose={closeShowcase}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

export function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      eyebrow="git log --experience"
      title="Experience"
      description=" "
    >
      <div className="space-y-4">
        {experience.map((item) => (
          <article key={`${item.organization}-${item.role}`} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-strong)]">{item.organization}</h3>
                <p className="text-sm text-[var(--text)]">{item.role}</p>
              </div>
              <Tag tone="green">{item.dates}</Tag>
            </div>
            <div className="mt-4 space-y-2 text-sm leading-6 text-[var(--text)]">
              {item.summary.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}

export function EducationSection() {
  return (
    <SectionShell
      id="education"
      eyebrow="education"
      title="Education"
      description=" "
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {education.map((entry) => (
          <article key={entry.institution} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--accent-green)]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-strong)]">{entry.degree}</h3>
                <p className="mt-1 text-sm text-[var(--text)]">{entry.specialization}</p>
                <p className="mt-2 text-sm font-medium text-[var(--text-strong)]">{entry.institution}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text)]">{entry.note}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}

export function CredentialsSection() {
  return (
    <SectionShell
      id="credentials"
      eyebrow="resume details"
      title="Certifications & Leadership"
      description=" "
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
          <h3 className="text-lg font-semibold text-[var(--text-strong)]">Certifications</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text)]">
            {certifications.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full aspect-square bg-[var(--accent-green)]" />
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
          <h3 className="text-lg font-semibold text-[var(--text-strong)]">Leadership Experience</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text)]">
            {leadership.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full aspect-square bg-[var(--accent-blue)]" />
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </SectionShell>
  )
}

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [subject, setSubject] = useState('')
  const [emailCopied, setEmailCopied] = useState(false)

  const resetForm = () => {
    setName('')
    setEmail('')
    setSubject('')
    setBody('')
    setStatus('idle')
    setMessage('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!profile.contactEndpoint) {
      setStatus('error')
      setMessage(profile.contactHint)
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch(profile.contactEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message: body }),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setStatus('success')
      setMessage('✓ Message sent successfully! Thanks for reaching out. I\'ll get back to you soon.')
      // Do not use resetForm() here immediately if we want to show the success message, 
      // because resetForm clears the message. We only want to clear the inputs.
      setName('')
      setEmail('')
      setSubject('')
      setBody('')
    } catch {
      setStatus('error')
      setMessage('⚠ Something went wrong. Please try again or contact me directly via email.')
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setEmailCopied(true)
      window.setTimeout(() => setEmailCopied(false), 1800)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <SectionShell
      id="contact"
      eyebrow="contact"
      title="Let's Connect Before I Push Another Commit"
      description="Have a project, job opportunity, or collaboration in mind? Feel free to send me a message."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Left — Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] sm:p-8">
          <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3 font-mono text-xs text-[var(--text)]">
            <Mail className="h-4 w-4 text-[var(--accent-green)]" />
            send-message.sh
          </div>
          <div className="mt-5 flex flex-1 flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-[var(--text-strong)]">
                Name
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={status === 'loading'}
                  className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-3 text-sm text-[var(--text-strong)] outline-none transition placeholder:text-[var(--text)] focus:border-[var(--accent-blue)] disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[var(--text-strong)]">
                Email
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={status === 'loading'}
                  className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-3 text-sm text-[var(--text-strong)] outline-none transition placeholder:text-[var(--text)] focus:border-[var(--accent-blue)] disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium text-[var(--text-strong)]">
              What can I help you with?
              <select
                required
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                disabled={status === 'loading'}
                className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--accent-blue)] disabled:cursor-not-allowed disabled:opacity-50 [&:invalid]:text-[var(--text)]"
              >
                <option value="" disabled>Select inquiry type</option>
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="Freelance Project">Freelance Project</option>
                <option value="Collaboration">Collaboration</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </label>
            <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-[var(--text-strong)]">
              Message
              <textarea
                required
                value={body}
                onChange={(event) => setBody(event.target.value)}
                disabled={status === 'loading'}
                className="min-h-[100px] flex-1 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-3 text-sm text-[var(--text-strong)] outline-none transition placeholder:text-[var(--text)] focus:border-[var(--accent-blue)] disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tell me about your role, project, or inquiry"
              />
            </label>

            <div className="mt-2 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--accent-green)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-green-hover)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center rounded-md border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text-strong)] transition hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reset
              </button>
            </div>

            {message && (
              <div
                className={`mt-2 rounded-md border px-4 py-3 text-sm ${
                  status === 'error'
                    ? 'border-[color-mix(in_srgb,var(--accent-error)_30%,var(--border))] bg-[color-mix(in_srgb,var(--accent-error)_10%,var(--surface))] text-[var(--accent-error)]'
                    : 'border-[color-mix(in_srgb,var(--accent-green)_30%,var(--border))] bg-[color-mix(in_srgb,var(--accent-green)_10%,var(--surface))] text-[var(--accent-green)]'
                }`}
                aria-live="polite"
              >
                {message}
              </div>
            )}
          </div>
        </form>

        {/* Right — Contact Information */}
        <div className="flex flex-col gap-5 h-full">
          <div className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] sm:p-8">
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3 font-mono text-xs text-[var(--text)]">
              <ExternalLink className="h-4 w-4 text-[var(--accent-blue)]" />
              contact-info.json
            </div>

            <div className="mt-6 flex flex-col justify-center gap-10 h-[calc(100%-3rem)]">
              {/* Email */}
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--accent-green)]">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-strong)]">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    onClick={copyEmail}
                    className="mt-1 block text-sm text-[var(--accent-blue)] transition hover:underline"
                  >
                    {emailCopied ? '✓ Copied to clipboard!' : profile.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--accent-green)]">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-strong)]">Location</p>
                  <p className="mt-1 text-sm text-[var(--text)]">{profile.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-5 sm:px-8 sm:py-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--text)]">$ git remote -v</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--text-strong)] transition hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]"
              >
                <GitHubMark className="h-5 w-5" />
                GitHub
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--text-strong)] transition hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]"
              >
                <LinkedInMark className="h-5 w-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}