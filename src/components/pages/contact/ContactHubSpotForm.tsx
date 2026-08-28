'use client'

import { useState } from 'react'
import { submitContactToHubSpot } from '@/components/pages/contact/HubSpotContact'

const primaryButtonClass =
  'inline-flex items-center justify-center rounded-full border border-[#2A3040] bg-transparent px-8 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[#2A3040] transition-colors hover:bg-[#2A3040] hover:text-white disabled:cursor-not-allowed disabled:opacity-60'

const fieldClassName =
  'w-full rounded-[10px] border border-[#000000]/20 bg-white px-4 py-3 text-[13px] text-[#696969] placeholder:text-[#696969] focus:border-[#BFB6AD] focus:outline-none sm:text-[14px] md:text-[15px]'

const selectClassName =
  'contact-form-select w-full cursor-pointer appearance-none rounded-[10px] border border-[#000000]/20 bg-white px-4 py-3 pr-10 text-[13px] text-[#696969] focus:border-[#BFB6AD] focus:outline-none sm:text-[14px] md:text-[15px]'

const inquiryOptions = [
  'Product support',
  'Sales - Pro or Business plan',
  'Enterprise enquiry',
  'Supplier partnership',
  'Media or partnership',
  'Something else',
] as const

export default function ContactHubSpotForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmissionMessage('')

    const missingFields: string[] = []
    if (!formData.firstName.trim()) missingFields.push('First Name')
    if (!formData.lastName.trim()) missingFields.push('Last Name')
    if (!formData.email.trim()) missingFields.push('Email Address')
    if (!formData.company.trim()) missingFields.push('Company Name')
    if (!formData.phone.trim()) missingFields.push('Contact Number')
    if (!formData.inquiryType.trim()) missingFields.push('What is this about?')
    if (!formData.message.trim()) missingFields.push('Message')

    if (missingFields.length > 0) {
      setSubmitStatus('error')
      setSubmissionMessage(`Please complete the following required fields: ${missingFields.join(', ')}`)
      setIsSubmitting(false)
      return
    }

    try {
      const result = await submitContactToHubSpot(formData)

      if (result.success) {
        setSubmitStatus('success')
        setSubmissionMessage("Thank you for your message! We'll get back to you soon.")
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          inquiryType: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
        setSubmissionMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitStatus('error')
      setSubmissionMessage('Something went wrong. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        required
        className={fieldClassName}
        placeholder="First Name*"
        autoComplete="given-name"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        required
        className={fieldClassName}
        placeholder="Last Name*"
        autoComplete="family-name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        className={fieldClassName}
        placeholder="Email Address*"
        autoComplete="email"
      />
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleInputChange}
        required
        className={fieldClassName}
        placeholder="Company Name*"
        autoComplete="organization"
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        required
        className={fieldClassName}
        placeholder="Contact Number*"
        autoComplete="tel"
      />

      <span className="relative block">
        <select
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleInputChange}
          required
          className={selectClassName}
        >
          <option value="">What is this about?*</option>
          {inquiryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#696969]"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        required
        rows={3}
        className={`${fieldClassName} resize-none`}
        placeholder="Message"
      />

      <div className="flex justify-center pt-2">
        <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
          {isSubmitting ? 'Sending…' : 'Submit'}
        </button>
      </div>

      {submitStatus === 'success' ? (
        <div className="rounded-lg border border-green-300 bg-green-50 p-4 text-[13px] text-green-800 sm:text-[14px]">
          {submissionMessage}
        </div>
      ) : null}
      {submitStatus === 'error' ? (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-[13px] text-red-800 sm:text-[14px]">
          {submissionMessage}
        </div>
      ) : null}
    </form>
  )
}
