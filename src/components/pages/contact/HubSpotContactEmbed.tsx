'use client'

import Script from 'next/script'
import type { CSSProperties } from 'react'

const HUBSPOT_PORTAL_ID = '143756519'
const HUBSPOT_FORM_ID = '0ae62a05-9b56-42d1-80d3-178ee7b3797d'
const HUBSPOT_REGION = 'eu1'
const HUBSPOT_EMBED_SCRIPT = `https://js-${HUBSPOT_REGION}.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`

const hubspotThemeVars: CSSProperties = {
  ['--hsf-global__font-family' as string]: "'Inter', system-ui, sans-serif",
  ['--hsf-global__font-size' as string]: '14px',
  ['--hsf-global__color' as string]: '#696969',
  ['--hsf-background__background-color' as string]: 'transparent',
  ['--hsf-background__padding' as string]: '0',
  ['--hsf-row__vertical-spacing' as string]: '16px',
  ['--hsf-row__horizontal-spacing' as string]: '0',
  ['--hsf-field-label__font-size' as string]: '0.01px',
  ['--hsf-field-label__color' as string]: 'transparent',
  ['--hsf-field-input__background-color' as string]: '#ffffff',
  ['--hsf-field-input__color' as string]: '#696969',
  ['--hsf-field-input__placeholder-color' as string]: '#696969',
  ['--hsf-field-input__border-color' as string]: 'rgba(0, 0, 0, 0.2)',
  ['--hsf-field-input__border-radius' as string]: '10px',
  ['--hsf-field-input__padding' as string]: '12px 16px',
  ['--hsf-field-textarea__background-color' as string]: '#ffffff',
  ['--hsf-field-textarea__border-color' as string]: 'rgba(0, 0, 0, 0.2)',
  ['--hsf-field-textarea__border-radius' as string]: '10px',
  ['--hsf-field-textarea__padding' as string]: '12px 16px',
  ['--hsf-button__color' as string]: '#2a3040',
  ['--hsf-button__background-color' as string]: 'transparent',
  ['--hsf-button__border-radius' as string]: '9999px',
  ['--hsf-button__padding' as string]: '10px 32px',
  ['--hsf-button__box-shadow' as string]: 'inset 0 0 0 1px #2a3040',
  ['--hsf-richtext__font-size' as string]: '0.01px',
  ['--hsf-richtext__color' as string]: 'transparent',
}

export default function HubSpotContactEmbed() {
  return (
    <>
      <Script src={HUBSPOT_EMBED_SCRIPT} strategy="afterInteractive" />
      <div
        className="hs-form-frame contact-hubspot-form"
        style={hubspotThemeVars}
        data-region={HUBSPOT_REGION}
        data-form-id={HUBSPOT_FORM_ID}
        data-portal-id={HUBSPOT_PORTAL_ID}
      />
    </>
  )
}
