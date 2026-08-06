import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const videoId = new URL(request.url).searchParams.get('videoId')?.trim();

  if (!videoId) {
    return NextResponse.json({ error: 'Missing videoId' }, { status: 400 });
  }

  try {
    const oembedUrl = `https://livid.com/oembed?url=${encodeURIComponent(`https://livid.com/watch/${videoId}`)}&format=json`;
    const response = await fetch(oembedUrl, {
      next: { revalidate: 60 * 60 * 24 },
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch thumbnail' }, { status: 502 });
    }

    const data = (await response.json()) as { thumbnail_url?: string };
    if (!data.thumbnail_url) {
      return NextResponse.json({ error: 'No thumbnail found' }, { status: 404 });
    }

    return NextResponse.json({ thumbnailUrl: data.thumbnail_url });
  } catch {
    return NextResponse.json({ error: 'Thumbnail request failed' }, { status: 500 });
  }
}
