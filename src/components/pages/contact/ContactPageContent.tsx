'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import {
  submitContactToHubSpot,
  type ContactFormData,
} from '@/components/pages/contact/HubSpotContact';
import PageClosingCta from '@/components/pages/shared/PageClosingCta';
import type { ContactPageContentData } from '@/lib/contact/types';

const primaryButtonClass =
  'inline-flex items-center justify-center rounded-full border border-[#2A3040] bg-transparent px-8 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[#2A3040] transition-colors hover:bg-[#2A3040] hover:text-white disabled:cursor-not-allowed disabled:opacity-60';

const fieldClassName =
  'w-full rounded-[10px] border border-[#000000]/20 bg-white px-4 py-3 text-[16px] text-[#696969] placeholder:text-[#696969] focus:border-[#BFB6AD] focus:outline-none sm:text-[14px]';

const selectClassName =
  'contact-form-select w-full cursor-pointer rounded-[10px] border border-[#000000]/20 bg-white px-4 py-3 text-[16px] text-[#696969] focus:border-[#BFB6AD] focus:outline-none sm:text-[14px]';

const phoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

function renderConsentNote(note: string) {
  const parts = note.split(/(Privacy Policy|Terms of Service)/g);
  return parts.map((part, index) => {
    if (part === 'Privacy Policy') {
      return (
        <Link
          key={`${part}-${index}`}
          href="/privacy-policy"
          className="underline decoration-[#696969]/50 underline-offset-2 transition-colors hover:text-[#2A3040]"
        >
          Privacy Policy
        </Link>
      );
    }
    if (part === 'Terms of Service') {
      return (
        <Link
          key={`${part}-${index}`}
          href="/terms-of-service"
          className="underline decoration-[#696969]/50 underline-offset-2 transition-colors hover:text-[#2A3040]"
        >
          Terms of Service
        </Link>
      );
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

interface ContactPageContentProps {
  content: ContactPageContentData;
}

export default function ContactPageContent({ content }: ContactPageContentProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmissionMessage('');

    const missingFields: string[] = [];
    if (!formData.firstName.trim()) missingFields.push('First Name');
    if (!formData.lastName.trim()) missingFields.push('Last Name');
    if (!formData.email.trim()) missingFields.push('Email Address');
    if (!formData.company.trim()) missingFields.push('Company Name');
    if (!formData.phone.trim()) missingFields.push('Contact Number');
    if (!formData.projectType.trim()) missingFields.push('What is this about?');
    if (!formData.message.trim()) missingFields.push('Message');

    if (missingFields.length > 0) {
      setSubmitStatus('error');
      setSubmissionMessage(
        `Please complete the following required fields: ${missingFields.join(', ')}`,
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const contactFormData: ContactFormData = { ...formData };
      const result = await submitContactToHubSpot(contactFormData);

      if (result.success) {
        setSubmitStatus('success');
        setSubmissionMessage("Thank you for your message! We'll get back to you soon.");
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          projectType: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setSubmissionMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmissionMessage('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="pb-10 pt-10 md:pb-12 md:pt-14" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <h1
            id="contact-heading"
            className="title-heading-normal text-center text-[26px] text-[#2A3040] sm:text-[32px]"
          >
            {content.banner.title}
          </h1>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-10 lg:pb-16" id="contact-information">
        <div className="mx-auto max-w-[1350px]">
          <div className="contact-form glass-panel !rounded-[16px] !p-6 sm:!p-10 md:!p-12">

            <p className="mb-10 text-center text-[13px] leading-relaxed text-[#2A3040] sm:text-[14px] md:text-[15px]">
              {content.introduction}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className={fieldClassName}
                  placeholder="First Name*"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className={fieldClassName}
                  placeholder="Last Name*"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={fieldClassName}
                  placeholder="Email Address*"
                />
              </div>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className={fieldClassName}
                placeholder="Company Name*"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className={fieldClassName}
                placeholder="Contact Number*"
              />

              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                required
                className={selectClassName}
              >
                <option value="">What is this about?*</option>
                <option value="Product support">Product support</option>
                <option value="Sales - Pro or Business plan">Sales - Pro or Business plan</option>
                <option value="Enterprise enquiry">Enterprise enquiry</option>
                <option value="Supplier partnership">Supplier partnership</option>
                <option value="Media or partnership">Media or partnership</option>
                <option value="Something else">Something else</option>
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={3}
                className={`${fieldClassName} resize-none`}
                placeholder="Message"
              />

              <div className="flex flex-col items-center gap-3 pt-2">
                <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
                  {isSubmitting ? 'Sending Message...' : 'Submit'}
                </button>
                <p className="text-center text-[11px] leading-relaxed text-[#696969] mt-4 sm:text-[12px]">
                  {renderConsentNote(content.form.consentNote)}
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="mt-2 rounded-lg border border-green-300 bg-green-50 p-4 text-green-800">
                  {submissionMessage}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-2 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
                  {submissionMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-10 lg:pb-16" id="where-to-find-us">
        <div className="glass-panel mx-auto flex max-w-[1350px] flex-col items-start justify-between gap-8 !rounded-[16px] !p-6 sm:!p-10 md:!p-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="max-w-[640px]">
            <h2 className="title-heading-normal mb-4 text-[18px] text-slate-900 sm:text-[24px]">
              {content.quickEnquiries.heading}
            </h2>
            <p className="text-[13px] leading-relaxed text-[#2A3040] sm:text-[14px] md:text-[15px]">
              {content.quickEnquiries.content}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-[280px]">
            <p className="flex items-center gap-3 text-[13px] text-[#2A3040] sm:text-[14px] md:text-[15px]">
              <Image src="/images/phone.svg" alt="" width={20} height={20} />
              <a href={phoneHref(content.quickEnquiries.phone)} className="hover:underline">
                {content.quickEnquiries.phone}
              </a>
            </p>
            <p className="flex items-center gap-3 text-[13px] text-[#2A3040] sm:text-[14px] md:text-[15px]">
              <Image src="/images/email.svg" alt="" width={20} height={20} />
              <a
                href={`mailto:${content.quickEnquiries.email}`}
                className="break-all hover:underline"
              >
                {content.quickEnquiries.email}
              </a>
            </p>
            <p className="flex items-start gap-3 text-[13px] leading-relaxed text-[#2A3040] sm:text-[14px] md:text-[15px]">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0"
                viewBox="2 2 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM14.1096 8.41878L15.592 9.90258C16.598 10.9095 17.1009 11.413 16.9836 11.9557C16.8662 12.4985 16.2003 12.7487 14.8684 13.2491L13.9463 13.5955C13.5896 13.7295 13.4113 13.7965 13.2736 13.9157C13.2134 13.9679 13.1594 14.027 13.1129 14.0918C13.0068 14.2397 12.9562 14.4236 12.855 14.7913C12.6249 15.6276 12.5099 16.0457 12.2359 16.202C12.1205 16.2679 11.9898 16.3025 11.8569 16.3023C11.5416 16.3018 11.2352 15.9951 10.6225 15.3818L10.1497 14.9086L8.531 16.5299C8.23835 16.823 7.76348 16.8234 7.47034 16.5308C7.17721 16.2381 7.17683 15.7632 7.46948 15.4701L9.08892 13.848C9.08871 13.8482 9.08914 13.8478 9.08892 13.848L8.64262 13.4C8.03373 12.7905 7.72929 12.4858 7.72731 12.1723C7.72645 12.0368 7.76164 11.9035 7.82926 11.786C7.98568 11.5145 8.40079 11.4 9.23097 11.1711C9.5993 11.0696 9.78346 11.0188 9.9315 10.9123C9.99792 10.8644 10.0583 10.8088 10.1114 10.7465C10.2298 10.6076 10.2956 10.4281 10.4271 10.069L10.7611 9.15753C11.2545 7.81078 11.5013 7.1374 12.0455 7.01734C12.5896 6.89728 13.0963 7.40445 14.1096 8.41878Z"
                  fill="#bfb6ad"
                />
              </svg>
              <span>{content.quickEnquiries.address}</span>
            </p>
          </div>
        </div>
      </section>

      <PageClosingCta {...content.closing} />
    </div>
  );
}
