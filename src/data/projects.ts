import { profile } from './profile'

import mobileArLiveView from '../assets/truehue/mobile/ar-live-view.png'
import mobileAssistiveMode from '../assets/truehue/mobile/assistive-mode.png'
import mobileColorLibrary from '../assets/truehue/mobile/color-library.png'
import mobileColorSegmentation from '../assets/truehue/mobile/color-segmentation.png'
import mobileFarnsworth from '../assets/truehue/mobile/farnsworth.png'
import mobilePhotoCapture from '../assets/truehue/mobile/photo-capture.png'
import mobilePhotoSelect from '../assets/truehue/mobile/photo-select.png'
import mobileRecolorization from '../assets/truehue/mobile/recolorization.png'
import mobileSimulationMode from '../assets/truehue/mobile/simulation-mode.png'
import mobileSimulationProtanDeutan from '../assets/truehue/mobile/simulation-protan-deutan.png'
import mobileSimulationTritan from '../assets/truehue/mobile/simulation-tritan.png'
import mobileVoiceFeedback from '../assets/truehue/mobile/voice-feedback.png'

export type ProjectShowcaseItem = {
  image: string
  title: string
}

export const projects = [
  {
    name: 'TrueHue: Color Identification and Assistance App',
    presentation: 'mobile-app',
    description:
      'A color identification and assistance application for individuals with color vision deficiency, delivered as a mobile-based system with a web-based landing page. The application can be downloaded by visiting the TrueHue landing page.',
    problem:
      'Supports colorblind users by identifying colors and assisting with color-related tasks through mobile and web experiences.',
    technologies: ['Dart', 'Flutter', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'AR live view and real-time photo color detection',
      'Recolorization, voice feedback, and spot color filtering',
      'Integrated Farnsworth D-15 color vision assessment test',
      'Web-based landing page for app presentation and distribution',
      'Validated with IT experts, eye specialists, and end-users',
    ],
    githubUrl: profile.githubUrl,
    liveUrl: 'https://truehue.vercel.app',
    status: 'Capstone',
    showcase: [
      { image: mobileFarnsworth, title: 'Farnsworth D-15 Test' },
      { image: mobileArLiveView, title: 'AR Live View Color Detection' },
      { image: mobileAssistiveMode, title: 'Assistive Mode' },
      { image: mobileSimulationMode, title: 'Simulation Mode' },
      { image: mobileSimulationProtanDeutan, title: 'Simulation Mode' },
      { image: mobileSimulationTritan, title: 'Simulation Mode' },
      { image: mobilePhotoSelect, title: 'Photo Color Detection' },
      { image: mobilePhotoCapture, title: 'Photo Color Detection' },
      { image: mobileVoiceFeedback, title: 'Voice Feedback' },
      { image: mobileRecolorization, title: 'Recolorization' },
      { image: mobileColorSegmentation, title: 'Color Segmentation' },
      { image: mobileColorLibrary, title: 'Color Library' },
    ] satisfies ProjectShowcaseItem[],
  },
] as const
