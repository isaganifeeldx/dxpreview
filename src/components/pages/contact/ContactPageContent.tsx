'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  submitContactToHubSpot,
  type ContactFormData,
} from '@/components/pages/contact/HubSpotContact';
import type { ContactPageContentData } from '@/lib/contact/types';

const primaryButtonClass =
  'inline-flex items-center justify-center rounded-full border border-[#2A3040] bg-transparent px-8 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[#2A3040] transition-colors hover:bg-[#2A3040] hover:text-white disabled:cursor-not-allowed disabled:opacity-60';

const fieldClassName =
  'w-full rounded-[10px] border border-[#000000]/20 bg-white px-4 py-3 text-[#696969] placeholder:text-[#696969] focus:border-[#BFB6AD] focus:outline-none';

const selectClassName =
  'contact-form-select w-full cursor-pointer rounded-[10px] border border-[#000000]/20 bg-white px-4 py-3 text-[#696969] focus:border-[#BFB6AD] focus:outline-none';

const phoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

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
    if (!formData.projectType.trim()) missingFields.push('Service of Interest');
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

      <section className="px-4 sm:px-6 lg:px-10" id="contact-information">
        <div className="mx-auto max-w-[1350px]">
          <div className="contact-form glass-panel !rounded-[16px] !p-6 sm:!p-10 md:!p-12">

            <p className="text-center text-[13px] leading-8 text-[#2A3040] sm:text-[16px] sm:leading-9 mb-10">
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
                <option value="">Service of Interest*</option>
                <option value="3d-rendering">3D Rendering &amp; Visualization</option>
                <option value="bim-modelling">BIM Modelling &amp; Construction</option>
                <option value="digital-planning">Digital Planning Tools</option>
                <option value="supplier-integration">Supplier Integration</option>
                <option value="consultation">Consultation &amp; Strategy</option>
                <option value="other">Other</option>
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

              <div className="flex justify-center pt-2">
                <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
                  {isSubmitting ? 'Sending Message...' : 'Submit'}
                </button>
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

      <section
        className="scroll-m-[-20px] px-4 pb-[100px] pt-[50px] sm:px-6 lg:px-10 xl:pb-[200px]"
        id="where-to-find-us"
      >
        <div className="glass-panel mx-auto flex max-w-[1350px] flex-col items-center justify-between gap-8 !rounded-[16px] !p-6 sm:!p-8 lg:flex-row lg:gap-16 lg:!p-10">
          <div className="max-w-[640px]">
            <h2 className="title-heading-normal mb-4 text-[18px] text-slate-900 sm:text-[24px]">
              {content.quickEnquiries.heading}
            </h2>
            <p className="text-[15px] leading-7 text-[#2A3040] sm:text-[16px]">
              {content.quickEnquiries.content}
            </p>
          </div>
          <div className="flex w-full flex-row gap-6 lg:w-auto lg:flex-col lg:gap-3">
            <p className="flex items-center gap-3 text-[15px] text-[#2A3040]">
              <Image src="/images/phone.svg" alt="" width={20} height={20} />
              <a href={phoneHref(content.quickEnquiries.phone)} className="hover:underline">
                {content.quickEnquiries.phone}
              </a>
            </p>
            <p className="flex items-center gap-3 text-[16px] text-[#2A3040]">
              <Image src="/images/email.svg" alt="" width={20} height={20} />
              <a
                href={`mailto:${content.quickEnquiries.email}`}
                className="break-all hover:underline"
              >
                {content.quickEnquiries.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
