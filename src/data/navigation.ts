export const sections = [
  { id: 'about', label: 'README' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

export const commandItems = [
  { label: 'Go to README', target: 'about' },
  { label: 'Go to Skills', target: 'skills' },
  { label: 'Go to Projects', target: 'projects' },
  { label: 'Go to GitHub', target: 'github' },
  { label: 'Go to Experience', target: 'experience' },
  { label: 'Go to Credentials', target: 'credentials' },
  { label: 'Go to Education', target: 'education' },
  { label: 'Contact Dessiree', target: 'contact' },
] as const