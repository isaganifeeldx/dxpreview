const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtu.be',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
])

function videoIdFromPath(pathname: string, prefix: string): string | null {
  if (!pathname.startsWith(prefix)) return null
  const id = pathname.slice(prefix.length).split('/')[0]?.trim()
  return id || null
}

/** Convert a YouTube watch/short/share URL into an embeddable iframe src. */
export function youtubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url.trim())
    if (!YOUTUBE_HOSTS.has(parsed.hostname)) return null

    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    const fromEmbed = videoIdFromPath(parsed.pathname, '/embed/')
    if (fromEmbed) return `https://www.youtube.com/embed/${fromEmbed}`

    const fromShorts = videoIdFromPath(parsed.pathname, '/shorts/')
    if (fromShorts) return `https://www.youtube.com/embed/${fromShorts}`

    const fromWatch = parsed.searchParams.get('v')?.trim()
    return fromWatch ? `https://www.youtube.com/embed/${fromWatch}` : null
  } catch {
    return null
  }
}
