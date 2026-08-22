export const sections = [
  { id: 'about', label: 'README' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Credentials' },
] as const

export const commandItems = [
  { label: 'Go to README', target: 'about' },
  { label: 'Go to Education', target: 'education' },
  { label: 'Go to Skills', target: 'skills' },
  { label: 'Go to Projects', target: 'projects' },
  { label: 'Go to Experience', target: 'experience' },
  { label: 'Go to Credentials', target: 'credentials' },
  { label: 'Contact Dessiree', target: 'contact' },
] as const