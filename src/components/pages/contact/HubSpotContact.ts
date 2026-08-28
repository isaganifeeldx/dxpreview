export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
  inquiryType: string
  message: string
}

const HUBSPOT_PORTAL_ID = '143756519'
const HUBSPOT_FORM_ID = '0ae62a05-9b56-42d1-80d3-178ee7b3797d'
const HUBSPOT_SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`

export const submitContactToHubSpot = async (formData: ContactFormData) => {
  const requestBody = {
    fields: [
      { name: 'firstname', value: formData.firstName },
      { name: 'lastname', value: formData.lastName },
      { name: 'email', value: formData.email },
      { name: 'company', value: formData.company },
      { name: 'phone', value: formData.phone },
      { name: 'enquiry_type', value: formData.inquiryType },
      { name: 'message', value: formData.message },
    ],
    context: {
      hutk: document.cookie.match(/hubspotutk=(.*?);/)?.[1] || undefined,
      pageUri: window.location.href,
      pageName: 'Contact Page',
    },
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
