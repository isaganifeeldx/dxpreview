import Image from 'next/image'
import Link from 'next/link'
import ContactHubSpotForm from '@/components/pages/contact/ContactHubSpotForm'
import PageClosingCta from '@/components/pages/shared/PageClosingCta'
import type { ContactPageContentData } from '@/lib/contact/types'

const phoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

function renderConsentNote(note: string) {
  const parts = note.split(/(Privacy Policy|Terms of Service)/g)
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
      )
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
      )
    }
    return <span key={`${part}-${index}`}>{part}</span>
  })
}

interface ContactPageContentProps {
  content: ContactPageContentData
}

export default function ContactPageContent({ content }: ContactPageContentProps) {
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

            <ContactHubSpotForm />

            <p className="mt-6 text-center text-[11px] leading-relaxed text-[#696969] sm:mt-8 sm:text-[12px]">
              {renderConsentNote(content.form.consentNote)}
            </p>
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
  )
}
