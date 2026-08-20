'use client'

import { useState } from 'react'

const ShareIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M12 10.667c-.622 0-1.178.28-1.553.72L5.94 8.787a2.2 2.2 0 000-.907l4.507-2.6A2.2 2.2 0 0112 5.333c1.22 0 2.213-.993 2.213-2.213S13.22.907 12 .907 9.787 1.9 9.787 3.12c0 .173.02.34.057.5L5.337 6.22a2.18 2.18 0 00-1.553-.64C2.564 5.58 1.573 6.57 1.573 7.793s.99 2.213 2.21 2.213c.587 0 1.12-.227 1.52-.6l4.507 2.6c-.037.16-.057.327-.057.5 0 1.22.993 2.213 2.213 2.213s2.213-.993 2.213-2.213-.993-2.213-2.213-2.213z"
      fill="currentColor"
    />
  </svg>
)

export default function InspirationShareButton() {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href

    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url })
        return
      }

      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // User cancelled native share or clipboard failed silently.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex min-h-10 items-center gap-1.5 text-[13px] font-medium text-[#6A758C] transition-colors hover:text-[#2A3040]"
    >
      <ShareIcon />
      {copied ? 'Link copied' : 'Share'}
    </button>
  )
}
