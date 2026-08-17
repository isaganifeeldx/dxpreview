import { emptySeoData } from '@/lib/seo/types'
import type { AboutPageContentData } from './types'

const render1 = '/images/landing/render-1.jpg'
const render2 = '/images/landing/render-2.jpg'
const render3 = '/images/landing/render-3.jpg'
const render4 = '/images/landing/render-4.jpg'
const appview = '/images/landing/appview.jpg'

export const aboutPageDefaults: AboutPageContentData = {
  hero: {
    title: 'Design doesn’t stop. Neither do we.',
    description:
      'DX Interiors is building the studio operating system for photorealistic interiors — so designers, developers, and homeowners move from brief to board without the wait.',
    cta: { label: 'Join our team', href: '/contact' },
    images: [
      { src: render1, alt: 'Modern living room concept' },
      { src: appview, alt: 'DX Interiors product workspace' },
      { src: render2, alt: 'Residential street visualisation' },
      { src: render3, alt: 'Contemporary home interior' },
      { src: render4, alt: 'Apartment building concept' },
    ],
  },
  mission: {
    eyebrow: 'Mission',
    title: 'Created with, and for, designers at every level',
    paragraphs: [
      'We believe great interiors should not depend on render queues or specialist bottlenecks. DX Interiors gives every studio the same photorealistic pipeline — from material swaps to flythroughs.',
      'Whether you are exploring a single room or rolling out across a national portfolio, we build tools that keep creative judgement at the centre of the work.',
    ],
    image: { src: appview, alt: 'DX Interiors workspace for designers' },
  },
  culture: {
    eyebrow: 'Our culture',
    title: 'Design isn’t just what we make, it’s who we are.',
    description:
      'We are a product team that lives in the same briefs as our customers — studios, developers, and hospitality groups shipping work every week.',
    images: [
      { src: render2, alt: 'Team reviewing interior concepts' },
      { src: appview, alt: 'Collaborating in the DX workspace' },
      { src: render3, alt: 'Presenting a photorealistic board' },
      { src: render1, alt: 'Living room concept in review' },
      { src: render4, alt: 'Apartment visualisation workshop' },
    ],
  },
  locations: {
    eyebrow: 'Locations',
    title: 'Where ideas take shape',
    description: 'We work closely with teams across Australia and partner studios worldwide.',
    cta: { label: 'Join our team', href: '/contact' },
    items: [
      {
        id: 'melbourne',
        name: 'Melbourne, VIC',
        role: 'HQ studio',
        image: { src: render1, alt: 'Melbourne studio skyline' },
      },
      {
        id: 'sydney',
        name: 'Sydney, NSW',
        role: 'Partner hub',
        image: { src: render2, alt: 'Sydney harbour context' },
      },
      {
        id: 'brisbane',
        name: 'Brisbane, QLD',
        role: 'Growth market',
        image: { src: render3, alt: 'Brisbane riverfront' },
      },
      {
        id: 'perth',
        name: 'Perth, WA',
        role: 'Regional studio',
        image: { src: render4, alt: 'Perth coastal skyline' },
      },
    ],
  },
  voices: {
    eyebrow: 'Our voices',
    title: 'Creativity in every seat.',
    description:
      'Hear from the people building DX Interiors — product, design, and customer success working as one studio.',
    cta: { label: 'See career paths', href: '/contact' },
    items: [
      {
        id: 'ava',
        quote:
          'Shipping a client board used to take a week of back-and-forth. Now we iterate in the same meeting we capture the room. That speed changes how clients trust the process.',
        name: 'Ava Chen',
        role: 'Product design',
        avatarInitials: 'AC',
      },
      {
        id: 'marcus',
        quote:
          'Shared libraries and admin controls finally match how multi-project studios actually work day to day. Building for real studio workflows is the whole job.',
        name: 'Marcus Reid',
        role: 'Engineering',
        avatarInitials: 'MR',
      },
      {
        id: 'sofia',
        quote:
          'Customer success is not a ticket queue here — we sit with studios until the workflow sticks. Watching a team ship their first photoreal board never gets old.',
        name: 'Sofia Lang',
        role: 'Customer success',
        avatarInitials: 'SL',
      },
      {
        id: 'jordan',
        quote:
          'I have been looking for a product this close to the craft for years. Helping designers move from capture to board without losing judgement is genuinely addictive work.',
        name: 'Jordan Blake',
        role: 'Solutions',
        avatarInitials: 'JB',
      },
      {
        id: 'priya',
        quote:
          'The people are sharp, kind, and low-ego. That mix matters most when the brief is messy and the deadline is not — everyone still shows up for the work.',
        name: 'Priya Nair',
        role: 'Design systems',
        avatarInitials: 'PN',
      },
      {
        id: 'liam',
        quote:
          'There is a shared belief that we are unlocking a better way for studios to present space. We take that seriously without taking ourselves too seriously.',
        name: 'Liam Orth',
        role: 'Product',
        avatarInitials: 'LO',
      },
    ],
  },
  perks: {
    eyebrow: 'Employee life',
    title: 'Perks and benefits',
    description:
      'We invest in the people building the next generation of interior design tools.',
    cta: { label: 'See career paths', href: '/contact' },
    items: [
      {
        id: 'health',
        icon: 'health',
        title: 'Health cover',
        description: 'Private health support and wellbeing days so you can show up at your best.',
      },
      {
        id: 'equity',
        icon: 'equity',
        title: 'Equity',
        description: 'Own a stake in the product you help build as DX Interiors scales.',
      },
      {
        id: 'growth',
        icon: 'growth',
        title: 'Growth budget',
        description: 'Learning stipend for courses, conferences, and design research trips.',
      },
      {
        id: 'remote',
        icon: 'remote',
        title: 'Flexible work',
        description: 'Hybrid by default with focused studio days when collaboration matters most.',
      },
      {
        id: 'leave',
        icon: 'leave',
        title: 'Generous leave',
        description: 'Annual leave plus recharge weeks so creativity stays sharp long-term.',
      },
      {
        id: 'tools',
        icon: 'tools',
        title: 'Best-in-class tools',
        description: 'Hardware, software, and DX Interiors seats for your own experiments.',
      },
      {
        id: 'team',
        icon: 'team',
        title: 'Studio culture',
        description: 'Small, senior team with direct impact across product and customer work.',
      },
    ],
  },
  seo: emptySeoData({
    title: 'About | DX Interiors',
    description:
      'Learn about DX Interiors — our mission, culture, locations, and the team building AI tools for interior designers and studios.',
    focusKeyword: 'DX Interiors about',
    keywords: 'DX Interiors team, interior design AI company, DX Interiors careers, about DX Interiors',
    ogTitle: 'About | DX Interiors',
    ogDescription:
      'Design doesn’t stop. Neither do we. Meet the team building photorealistic interior tools for studios worldwide.',
    ogImageUrl: '/images/landing/render-1.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'About | DX Interiors',
    twitterDescription:
      'Design doesn’t stop. Neither do we. Meet the team building photorealistic interior tools for studios worldwide.',
    twitterImageUrl: '/images/landing/render-1.jpg',
  }),
}
