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
import landingAbout from '../assets/truehue/landing/about-us.png'
import landingDarkTheme from '../assets/truehue/landing/dark-theme.png'
import landingDownload from '../assets/truehue/landing/download.png'
import landingFeatures from '../assets/truehue/landing/features.png'
import landingFooter from '../assets/truehue/landing/footer.png'
import landingHome from '../assets/truehue/landing/home.png'
import landingHowToUse from '../assets/truehue/landing/how-to-use.png'
import landingTeam from '../assets/truehue/landing/our-team-redacted.png'

export type ProjectShowcaseItem = {
  image: string
  title: string
}

export const projects = [
  {
    name: 'TrueHue: Color Identification and Assistance App',
    presentation: 'mobile-app',
    description: 'A color identification and assistance application for individuals with color vision deficiency, delivered as a mobile-based system with a web-based landing page.',
    problem: 'Supports colorblind users by identifying colors and assisting with color-related tasks through mobile and web experiences.',
    technologies: ['React Native', 'Expo', 'Three.js', 'K-Nearest Neighbors', 'Web Landing Page'],
    features: [
      'AR live view and photo color detection',
      'Recolorization, voice feedback, and spot color filtering',
      'Integrated Farnsworth D-15 test',
      'Validated with IT experts, eye specialists, and end-users',
    ],
    githubUrl: profile.githubUrl,
    liveUrl: profile.githubUrl,
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
  {
    name: 'TrueHue Landing Page',
    presentation: 'landing-page',
    description: 'A web-based landing page created to support the TrueHue mobile app distribution and presentation.',
    problem: 'Provides a simple web entry point for the capstone project without overstating unavailable details.',
    technologies: ['React', 'TypeScript', 'Responsive Web Design'],
    features: ['Supports the capstone mobile app presentation', 'Keeps the interface lightweight and recruiter-friendly', 'Ready for screenshots and repo links'],
    githubUrl: profile.githubUrl,
    liveUrl: profile.githubUrl,
    status: 'Supporting project',
    showcase: [
      { image: landingHome, title: 'Home' },
      { image: landingFeatures, title: 'Features' },
      { image: landingHowToUse, title: 'How to Use the App' },
      { image: landingDownload, title: 'Download TrueHue' },
      { image: landingDarkTheme, title: 'Dark Theme' },
      { image: landingAbout, title: 'About Us' },
      { image: landingTeam, title: 'Our Team' },
      { image: landingFooter, title: 'Footer' },
    ] satisfies ProjectShowcaseItem[],
  },
] as const
