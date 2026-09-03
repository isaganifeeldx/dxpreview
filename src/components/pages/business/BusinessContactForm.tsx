'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  BUSINESS_COMMUNICATIONS_CONSENT_TEXT,
  BUSINESS_PROCESS_CONSENT_TEXT,
  submitBusinessToHubSpot,
} from '@/components/pages/business/HubSpotBusiness'
import type { BusinessFormCopy } from '@/lib/business/types'

const fieldClassName =
  'w-full rounded-[12px] border border-[#2A3040]/15 bg-white px-3 py-3 text-[16px] text-[#2A3040] placeholder:text-[#9AA3B5] focus:border-[#AEC8FF] focus:outline-none sm:px-4 sm:text-[14px]'

const checkboxClassName =
  'mt-0.5 h-4 w-4 shrink-0 rounded border border-[#2A3040]/25 text-[#2A3040] focus:ring-[#AEC8FF]'

type BusinessContactFormProps = {
  form: BusinessFormCopy
}

export default function BusinessContactForm({ form }: BusinessContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    message: '',
    communicationsConsent: false,
    processConsent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const target = e.target
    const { name, value, type } = target

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' && target instanceof HTMLInputElement ? target.checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmissionMessage('')

    const missing: string[] = []
    if (!formData.name.trim()) missing.push(form.nameLabel)
    if (!formData.email.trim()) missing.push(form.emailLabel)
    if (!formData.company.trim()) missing.push(form.companyLabel)
    if (!formData.teamSize.trim()) missing.push(form.teamSizeLabel)
    if (!formData.message.trim()) missing.push(form.messageLabel)
    if (!formData.processConsent) {
      missing.push('consent to store and process your personal data')
    }

    if (missing.length > 0) {
      setSubmitStatus('error')
      setSubmissionMessage(`Please complete: ${missing.join(', ')}`)
      setIsSubmitting(false)
      return
    }

    try {
      const result = await submitBusinessToHubSpot(formData)

      if (result.success) {
        setSubmitStatus('success')
        setSubmissionMessage(form.successMessage)
        setFormData({
          name: '',
          email: '',
          company: '',
          teamSize: '',
          message: '',
          communicationsConsent: false,
          processConsent: false,
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
    <div className="rounded-[16px] border border-white/80 bg-white p-5 shadow-[0_24px_60px_rgba(42,48,64,0.10)] sm:rounded-[20px] sm:p-8">
      <h2 className="title-heading-normal !text-[22px] text-[#2A3040] sm:!text-[26px]">{form.title}</h2>
      <p className="mt-2 text-[14px] leading-relaxed text-[#6A758C] sm:text-[15px]">{form.subtitle}</p>

      <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
        <label className="block text-[12px] font-medium text-[#2A3040]">
          {form.nameLabel}
          <input
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className={`${fieldClassName} mt-1.5`}
          />
        </label>
        <label className="block text-[12px] font-medium text-[#2A3040]">
          {form.emailLabel}
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={`${fieldClassName} mt-1.5`}
          />
        </label>
        <label className="block text-[12px] font-medium text-[#2A3040]">
          {form.companyLabel}
          <input
            name="company"
            type="text"
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            className={`${fieldClassName} mt-1.5`}
          />
        </label>
        <label className="block text-[12px] font-medium text-[#2A3040]">
          {form.teamSizeLabel}
          <span className="relative mt-1.5 block">
            <select
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              className={`${fieldClassName} appearance-none pr-10 cursor-pointer`}
            >
              <option value="">{form.teamSizePlaceholder}</option>
              {form.teamSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#6A758C]"
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
        </label>
        <label className="block text-[12px] font-medium text-[#2A3040] sm:col-span-2">
          {form.messageLabel}
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={`${fieldClassName} mt-1.5 resize-y`}
          />
        </label>

        <div className="space-y-4 sm:col-span-2">
          <p className="text-[11px] leading-relaxed text-[#6A758C]">
            By checking the boxes below, you agree to receive communications from DX Interiors.
            You can unsubscribe anytime.
          </p>

          <label className="flex items-start gap-3 text-[12px] leading-relaxed text-[#2A3040] sm:text-[13px]">
            <input
              type="checkbox"
              name="communicationsConsent"
              checked={formData.communicationsConsent}
              onChange={handleChange}
              className={checkboxClassName}
            />
            <span>{BUSINESS_COMMUNICATIONS_CONSENT_TEXT}</span>
          </label>

          <p className="text-[11px] leading-relaxed text-[#6A758C]">
            To process your request, we need your permission to store and process your personal
            data. Please check the box below to confirm your consent:
          </p>

          <label className="flex items-start gap-3 text-[12px] leading-relaxed text-[#2A3040] sm:text-[13px]">
            <input
              type="checkbox"
              name="processConsent"
              checked={formData.processConsent}
              onChange={handleChange}
              required
              className={checkboxClassName}
            />
            <span>
              {BUSINESS_PROCESS_CONSENT_TEXT}
              <span className="text-[#B42318]">*</span>
            </span>
          </label>

          <p className="text-[11px] leading-relaxed text-[#6A758C] sm:text-[12px]">
            We care about your privacy. Learn how we handle your data in our{' '}
            <Link
              href="/privacy-policy"
              className="underline decoration-[#6A758C]/50 underline-offset-2 transition-colors hover:text-[#2A3040]"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {submitStatus !== 'idle' ? (
          <p
            className={`sm:col-span-2 text-[13px] ${
              submitStatus === 'success' ? 'text-[#2A3040]' : 'text-[#B42318]'
            }`}
          >
            {submissionMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="sm:col-span-2 inline-flex w-full items-center justify-center rounded-full bg-[#2A3040] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#111a2e] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Sending…' : form.submitLabel}
        </button>
      </form>
    </div>
  )
}
