export interface BusinessFormData {
  name: string
  email: string
  company: string
  teamSize: string
  message: string
  communicationsConsent: boolean
  processConsent: boolean
}

const HUBSPOT_PORTAL_ID = '143756519'
const HUBSPOT_FORM_ID = '68e34dcc-39f7-4846-85d4-f60a0e063638'
const HUBSPOT_SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`

export const BUSINESS_COMMUNICATIONS_CONSENT_TEXT =
  'I agree to receive other communications from DX Interiors.'
export const BUSINESS_PROCESS_CONSENT_TEXT =
  'I agree to allow DX Interiors to store and process my personal data.'

// Matches the communication subscription on the HubSpot business form.
const HUBSPOT_COMMUNICATIONS_SUBSCRIPTION_TYPE_ID = 1

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/)
  const firstName = parts[0] ?? ''
  const lastName = parts.slice(1).join(' ')
  return { firstName, lastName }
}

export const submitBusinessToHubSpot = async (formData: BusinessFormData) => {
  const { firstName, lastName } = splitName(formData.name)
  const fields = [
    { name: 'firstname', value: firstName },
    { name: 'email', value: formData.email },
    { name: 'company', value: formData.company },
    { name: 'team_size', value: formData.teamSize },
    { name: 'message', value: formData.message },
  ]

  if (lastName) {
    fields.splice(1, 0, { name: 'lastname', value: lastName })
  }

  const requestBody: {
    fields: Array<{ name: string; value: string }>
    context: {
      hutk?: string
      pageUri: string
      pageName: string
    }
    legalConsentOptions?: {
      consent: {
        consentToProcess: boolean
        text: string
        communications?: Array<{
          value: boolean
          subscriptionTypeId: number
          text: string
        }>
      }
    }
  } = {
    fields,
    context: {
      hutk: document.cookie.match(/hubspotutk=(.*?);/)?.[1] || undefined,
      pageUri: window.location.href,
      pageName: 'Business Page',
    },
  }

  if (formData.processConsent) {
    requestBody.legalConsentOptions = {
      consent: {
        consentToProcess: true,
        text: BUSINESS_PROCESS_CONSENT_TEXT,
        ...(formData.communicationsConsent
          ? {
              communications: [
                {
                  value: true,
                  subscriptionTypeId: HUBSPOT_COMMUNICATIONS_SUBSCRIPTION_TYPE_ID,
                  text: BUSINESS_COMMUNICATIONS_CONSENT_TEXT,
                },
              ],
            }
          : {}),
      },
    }
  }

  try {
    const response = await fetch(HUBSPOT_SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (response.ok) {
      return { success: true as const }
    }

    const errorText = await response.text()
    try {
      const errorData = JSON.parse(errorText) as {
        errors?: Array<{ errorType?: string; message?: string }>
      }
      const missingFields = (errorData.errors ?? [])
        .filter((err) => err.errorType === 'REQUIRED_FIELD')
        .map((err) => {
          const fieldMatch = err.message?.match(/Required field '([^']+)' is missing/)
          return fieldMatch ? fieldMatch[1] : ''
        })
        .filter(Boolean)

      if (missingFields.length > 0) {
        return {
          success: false as const,
          error: `Please complete the following required fields: ${missingFields.join(', ')}`,
        }
      }
    } catch {
      // fall through
    }

    return {
      success: false as const,
      error: 'Form submission failed. Please check all required fields and try again.',
    }
  } catch {
    return { success: false as const, error: 'Network error. Please try again.' }
  }
}
