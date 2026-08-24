import { pageClosingCtaDefaults } from '@/lib/cta/defaults'
import { emptySeoData } from '@/lib/seo/types'
import type { TutorialCourse, TutorialLesson, TutorialPageContentData } from './types'

const SAMPLE_YOUTUBE_URL = 'https://www.youtube.com/watch?v=u8Pkx_shFXg'

function lesson(
  id: string,
  slug: string,
  title: string,
  duration: string,
  image: string,
  imageAlt: string,
): TutorialLesson {
  return {
    id,
    slug,
    title,
    duration,
    image,
    imageAlt,
    videoUrl: SAMPLE_YOUTUBE_URL,
  }
}

const living =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80'
const contemporary =
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80'
const openPlan =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80'
const kitchen =
  'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1400&q=80'
const bedroom =
  'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1400&q=80'
const lighting =
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80'
const house =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80'
const kitchenIsland =
  'https://images.unsplash.com/photo-1556911220-e15b21be304b?auto=format&fit=crop&w=1400&q=80'
const bathroom =
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=80'
const styled =
  'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1400&q=80'
const team =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80'
const furnished =
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80'
const timber =
  'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=1400&q=80'
const apartment =
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80'
const moodboard =
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=80'
const meeting =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80'

export const tutorialCourses: TutorialCourse[] = [
  {
    id: '1',
    slug: 'beginner-series',
    title: 'Full series for beginners',
    description: 'Start with DX Interiors — from your first project to a finished photorealistic board.',
    category: "Beginner's guide",
    image: living,
    imageAlt: 'Bright living room used as the beginner course cover',
    featuredBeginner: true,
    lessons: [
      lesson('1-1', 'overview', 'Beginner series overview', '01:08', living, 'Living room overview thumbnail'),
      lesson('1-2', 'first-project', 'Create your first project', '05:36', contemporary, 'Contemporary living room project setup'),
      lesson('1-3', 'workspace', 'Navigate the workspace', '04:12', openPlan, 'Open-plan interior showing the workspace'),
      lesson('1-4', 'capture', 'Capture a room in minutes', '06:48', kitchen, 'Kitchen interior ready for room capture'),
      lesson('1-5', 'materials', 'Choose materials that feel right', '07:22', bedroom, 'Bedroom with layered textiles and finishes'),
      lesson('1-6', 'lighting', 'Lighting basics for photoreal renders', '08:05', lighting, 'Living room with warm ambient lighting'),
    ],
  },
  {
    id: '2',
    slug: 'capture-and-floor-plan',
    title: 'Capture & floor plan',
    description: 'Scan a space, lock in dimensions, and start a floor plan without the guesswork.',
    category: 'Capture',
    image: house,
    imageAlt: 'Modern house interior with clear spatial flow',
    featuredBeginner: true,
    lessons: [
      lesson('2-1', 'start-floor-plan', 'Start a floor plan quickly', '03:41', house, 'Modern house interior'),
      lesson('2-2', 'scan-a-room', 'Scan a room accurately', '05:10', kitchen, 'Kitchen ready for capture'),
      lesson('2-3', 'edit-walls', 'Adjust walls and openings', '04:55', openPlan, 'Open-plan layout'),
    ],
  },
  {
    id: '3',
    slug: 'materials-and-finishes',
    title: 'Materials & finishes',
    description: 'See real stone, timber, and textiles in context before you commit.',
    category: 'Materials',
    image: timber,
    imageAlt: 'Interior with timber flooring and stone surfaces',
    featuredBeginner: true,
    lessons: [
      lesson('3-1', 'browse-materials', 'Browse the materials library', '04:18', timber, 'Timber and stone interior'),
      lesson('3-2', 'stone-and-timber', 'Pair stone and timber', '06:11', bedroom, 'Bedroom with layered finishes'),
      lesson('3-3', 'apply-to-surfaces', 'Apply finishes to surfaces', '05:02', styled, 'Styled living room'),
    ],
  },
  {
    id: '4',
    slug: 'kitchen-and-bath',
    title: 'Kitchen & bath',
    description: 'Lay out cabinetry, stone, and fixtures so wet areas feel resolved before build.',
    category: 'Kitchen & Bath',
    image: timber,
    imageAlt: 'Modern kitchen cabinetry and island',
    featuredBeginner: true,
    lessons: [
      lesson('4-1', 'kitchen-layout', 'Design a kitchen layout that works', '09:14', timber, 'Kitchen island layout'),
      lesson('4-2', 'bathroom-finishes', 'Bathroom finishes in context', '05:58', bathroom, 'Contemporary bathroom'),
      lesson('4-3', 'wet-area-lighting', 'Light a wet area', '04:33', bathroom, 'Bathroom lighting'),
    ],
  },
  {
    id: '5',
    slug: 'lighting',
    title: 'Lighting',
    description: 'Set daylight and evening mood so renders feel like the finished room.',
    category: 'Lighting',
    image: lighting,
    imageAlt: 'Living room with warm ambient lighting',
    lessons: [
      lesson('5-1', 'lighting-basics', 'Lighting basics', '08:05', lighting, 'Warm ambient lighting'),
      lesson('5-2', 'day-to-night', 'From daylight to evening mood', '05:44', apartment, 'Apartment with layered lighting'),
      lesson('5-3', 'accent-lights', 'Accent lights and lamps', '03:52', furnished, 'Furnished living room'),
    ],
  },
  {
    id: '6',
    slug: 'export-and-present',
    title: 'Export & present',
    description: 'Turn a scheme into a client-ready board and walk through options together.',
    category: 'Export',
    image: styled,
    imageAlt: 'Styled living room ready for presentation',
    lessons: [
      lesson('6-1', 'export-board', 'Export a photorealistic board', '04:27', styled, 'Styled living room board'),
      lesson('6-2', 'share-clients', 'Share options with clients', '03:19', team, 'Team reviewing a design'),
      lesson('6-3', 'stakeholders', 'Present a scheme to stakeholders', '07:09', meeting, 'Meeting space presentation'),
    ],
  },
  {
    id: '7',
    slug: 'real-world-demos',
    title: 'Real-world demos',
    description: 'Watch a full living-room refresh from capture through to the finished look.',
    category: 'Real-World Demo',
    image: furnished,
    imageAlt: 'Furnished living room used in a demo walkthrough',
    lessons: [
      lesson('7-1', 'living-room-refresh', 'Living room refresh', '11:03', furnished, 'Furnished living room'),
      lesson('7-2', 'compact-apartment', 'Compact apartment walkthrough', '08:40', apartment, 'Compact apartment interior'),
    ],
  },
  {
    id: '8',
    slug: 'webinars',
    title: 'Webinars',
    description: 'Longer sessions on the five-step workflow and how teams use DX Interiors.',
    category: 'Webinars',
    image: moodboard,
    imageAlt: 'Interior design mood board on a desk',
    lessons: [
      lesson('8-1', 'five-step-workflow', 'The five-step design workflow', '28:16', moodboard, 'Mood board on a desk'),
      lesson('8-2', 'team-workflow', 'Running a team workflow', '22:05', team, 'Team collaboration session'),
    ],
  },
  {
    id: '9',
    slug: 'business',
    title: 'For studios & business',
    description: 'Use DX Interiors to present options, get sign-off faster, and keep projects moving.',
    category: 'Business',
    image: meeting,
    imageAlt: 'Meeting space used for a client presentation',
    lessons: [
      lesson('9-1', 'client-sign-off', 'Get client sign-off faster', '06:20', meeting, 'Client presentation'),
      lesson('9-2', 'option-sets', 'Build option sets', '05:14', styled, 'Styled living room options'),
    ],
  },
]

export const tutorialPageDefaults: TutorialPageContentData = {
  hero: {
    title: 'Tutorials',
    description:
      'Step-by-step courses to sharpen your skills and speed up your workflow on every DX Interiors project.',
  },
  videosHeading: 'Courses',
  beginnerHeading: "Beginner's guide",
  allHeading: 'All lessons',
  otherHeading: 'Other courses',
  otherDescription: 'Start your design in minutes.',
  searchPlaceholder: 'Search courses and lessons…',
  courses: tutorialCourses,
  closing: pageClosingCtaDefaults,
  seo: emptySeoData({
    title: 'Tutorials | DX Interiors',
    description:
      'Step-by-step DX Interiors video courses — from your first project to materials, lighting, and client-ready boards.',
    focusKeyword: 'DX Interiors tutorials',
    keywords:
      'DX Interiors tutorials, interior design software video, DX Interiors how to, interior visualisation training',
    ogTitle: 'Tutorials | DX Interiors',
    ogDescription:
      'Step-by-step courses to learn DX Interiors — capture, materials, lighting, and presentation.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Tutorials | DX Interiors',
    twitterDescription:
      'Step-by-step courses to learn DX Interiors — capture, materials, lighting, and presentation.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}
