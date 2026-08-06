type MediaLike = {
  url?: string | null
} | null

export function getMediaUrl(media: number | MediaLike | undefined | null): string | null {
  if (!media || typeof media === 'number') return null
  return media.url ?? null
}
