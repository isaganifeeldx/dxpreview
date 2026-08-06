'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';

const PLAYER_JS_CONTEXT = 'player.js';
const PLAYER_JS_VERSION = '2.0';
const CONTROLS_IDLE_MS = 10_000;

interface LividEmbedProps {
  /** Livid embed ID, e.g. `EXL6UuPhxuGI` from `https://livid.com/embed/EXL6UuPhxuGI` */
  videoId: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  /** Show player controls. Default false (hidden). */
  controls?: boolean;
  /** Show video title/label. Default false (hidden). */
  showTitle?: boolean;
  /** Show Livid logo. Default false (hidden). */
  showLividLogo?: boolean;
  /**
   * When true, scales the iframe to cover the container (no letterboxing).
   * Defaults to true when `fill` or `fullBleed` is enabled.
   */
  fill?: boolean;
  /**
   * Stretch to the parent’s full width and height (no 16:9 box).
   * Parent must be `position: relative` with an explicit height.
   */
  fullBleed?: boolean;
  /**
   * Scale the iframe to cover the container (no letterboxing).
   * Defaults to true when `fill` or `fullBleed` is enabled.
   */
  cover?: boolean;
  /**
   * Background mode: hides controls, loops, and mutes.
   * Autoplay only applies when `autoplay` is also true.
   */
  background?: boolean;
  /** Show a custom centered play/pause button. Default: !autoplay */
  showPlayButton?: boolean;
  /** Optional poster image. If omitted, fetched from Livid oEmbed. */
  poster?: string;
}

type PlayerCommand = 'play' | 'pause';

function parsePlayerData(data: unknown): Record<string, unknown> | null {
  if (typeof data === 'object' && data !== null) {
    return data as Record<string, unknown>;
  }
  if (typeof data !== 'string') return null;
  try {
    return JSON.parse(data) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function postToPlayer(
  iframe: HTMLIFrameElement | null,
  payload: Record<string, unknown>,
) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({
      context: PLAYER_JS_CONTEXT,
      version: PLAYER_JS_VERSION,
      ...payload,
    }),
    '*',
  );
}

export default function LividEmbed({
  videoId,
  title = 'Livid video',
  className = '',
  autoplay = true,
  loop = true,
  muted = true,
  controls = false,
  showTitle = false,
  showLividLogo = false,
  fill = false,
  fullBleed = false,
  cover,
  background = false,
  showPlayButton,
  poster,
}: LividEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pendingCommandRef = useRef<PlayerCommand | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listenerId = useId().replace(/:/g, '');
  const instanceId = useId().replace(/:/g, '');

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPauseControl, setShowPauseControl] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(poster ?? null);
  const [showPoster, setShowPoster] = useState(true);

  const shouldCover = cover ?? (fill || fullBleed);
  const shouldShowPlayButton = showPlayButton ?? !autoplay;
  const showControlButton = !isPlaying || showPauseControl;

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const scheduleHidePauseControl = useCallback(() => {
    clearIdleTimer();
    idleTimerRef.current = setTimeout(() => {
      setShowPauseControl(false);
      idleTimerRef.current = null;
    }, CONTROLS_IDLE_MS);
  }, [clearIdleTimer]);

  const revealPauseControl = useCallback(() => {
    if (!isPlaying) return;
    setShowPauseControl(true);
    scheduleHidePauseControl();
  }, [isPlaying, scheduleHidePauseControl]);

  useEffect(() => {
    if (poster) {
      setPosterUrl(poster);
      return;
    }

    let cancelled = false;

    const loadPoster = async () => {
      try {
        const response = await fetch(`/api/livid-thumbnail?videoId=${encodeURIComponent(videoId)}`);
        if (!response.ok) return;
        const data = (await response.json()) as { thumbnailUrl?: string };
        if (!cancelled && data.thumbnailUrl) {
          setPosterUrl(data.thumbnailUrl);
        }
      } catch {
        // Keep blank poster fallback if thumbnail fetch fails.
      }
    };

    void loadPoster();
    return () => {
      cancelled = true;
    };
  }, [poster, videoId]);

  useEffect(() => {
    if (!isPlaying) {
      clearIdleTimer();
      setShowPauseControl(false);
      // Keep poster over the iframe while paused so Livid’s native (often black)
      // play button never shows through — it always renders when autoplay is off.
      if (shouldShowPlayButton) {
        setShowPoster(true);
      }
      return;
    }

    setShowPoster(false);
    setShowPauseControl(false);
    clearIdleTimer();
  }, [isPlaying, clearIdleTimer, shouldShowPlayButton]);

  useEffect(() => {
    if (!autoplay || !isReady || !showPoster) return;

    // Fallback if the play event is delayed/missed
    const timer = window.setTimeout(() => setShowPoster(false), 1500);
    return () => window.clearTimeout(timer);
  }, [autoplay, isReady, showPoster]);

  useEffect(() => () => clearIdleTimer(), [clearIdleTimer]);

  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    loop: loop || background ? '1' : '0',
    muted: muted || background ? '1' : '0',
    controls: background || !controls ? '0' : '1',
    title: showTitle ? '1' : '0',
    livid_logo: showLividLogo ? '1' : '0',
    transparent: '1',
    preload: 'auto',
    playsinline: '1',
    // Background banners shouldn't respond to keyboard / tap UI chrome.
    ...(background ? { keyboard: '0' } : {}),
    ...(background && autoplay ? { background: '1' } : {}),
    player_id: instanceId,
  });

  const src = `https://livid.com/embed/${videoId}?${params.toString()}`;

  const sendCommand = useCallback((method: PlayerCommand) => {
    postToPlayer(iframeRef.current, { method });
  }, []);

  const subscribe = useCallback(
    (eventName: string) => {
      postToPlayer(iframeRef.current, {
        method: 'addEventListener',
        value: eventName,
        listener: `${listenerId}-${eventName}`,
      });
    },
    [listenerId],
  );

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!String(event.origin).includes('livid.com')) return;
      // Ignore events from other Livid embeds on the same page.
      if (event.source !== iframeRef.current?.contentWindow) return;

      const data = parsePlayerData(event.data);
      if (!data || data.context !== PLAYER_JS_CONTEXT) return;

      const eventName = data.event;
      if (eventName === 'ready') {
        // Prefer player_id when present; still require source match above.
        if (data.player_id != null && String(data.player_id) !== instanceId) return;

        setIsReady(true);
        subscribe('play');
        subscribe('pause');
        subscribe('ended');

        if (autoplay) {
          sendCommand('play');
        }

        const pending = pendingCommandRef.current;
        if (pending) {
          sendCommand(pending);
          pendingCommandRef.current = null;
        }
        return;
      }

      // Subscribed events include our listener id — reject other embeds' events.
      const listener = data.listener;
      if (typeof listener === 'string' && !listener.startsWith(`${listenerId}-`)) {
        return;
      }

      if (eventName === 'play') {
        setIsPlaying(true);
        setShowPoster(false);
      }
      if (eventName === 'pause' || eventName === 'ended') {
        setIsPlaying(false);
        // Keep background banners playing — mobile often pauses on scroll/tap
        // and then reveals native controls.
        if (background && autoplay && eventName === 'pause') {
          sendCommand('play');
        }
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [autoplay, background, instanceId, listenerId, sendCommand, subscribe]);

  const togglePlayback = () => {
    const next: PlayerCommand = isPlaying ? 'pause' : 'play';

    if (!isReady) {
      pendingCommandRef.current = next;
      // Do not hide the poster or flip isPlaying for play until Livid confirms —
      // otherwise the native black play button flashes through the iframe.
      if (next === 'pause') setIsPlaying(false);
      return;
    }

    sendCommand(next);
    // Optimistic pause only; play waits for the player.js `play` event.
    if (next === 'pause') setIsPlaying(false);
  };

  const iframeClassName = shouldCover
    ? 'absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 border-0'
    : 'absolute inset-0 h-full w-full border-0';

  // object-fit: cover for a 16:9 iframe inside an arbitrary container
  const iframeCoverStyle = shouldCover
    ? {
        width: 'max(100cqw, calc(100cqh * 16 / 9))',
        height: 'max(100cqh, calc(100cqw * 9 / 16))',
      }
    : undefined;

  const posterOverlay = showPoster ? (
    <div className="absolute inset-0 z-[5] overflow-hidden bg-[#1a1f2b]">
      {posterUrl ? (
        <Image
          src={posterUrl}
          alt=""
          fill
          priority={fullBleed || autoplay}
          sizes={fullBleed ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
          className={shouldCover ? 'object-cover' : 'object-cover'}
        />
      ) : null}
    </div>
  ) : null;

  const playOverlay = shouldShowPlayButton ? (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-center transition-colors ${
        isPlaying
          ? showPauseControl
            ? 'bg-black/10'
            : 'bg-transparent'
          : 'bg-black/15'
      }`}
      onMouseMove={revealPauseControl}
      onTouchStart={revealPauseControl}
      onMouseLeave={() => {
        if (!isPlaying) return;
        clearIdleTimer();
        setShowPauseControl(false);
      }}
    >
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        tabIndex={showControlButton ? 0 : -1}
        className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all hover:scale-105 sm:h-16 sm:w-16 md:h-20 md:w-20 ${
          showControlButton
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        {isPlaying ? (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6 fill-white drop-shadow-sm sm:h-7 sm:w-7 md:h-8 md:w-8"
          >
            <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="ml-0.5 h-6 w-6 fill-white drop-shadow-sm sm:ml-1 sm:h-7 sm:w-7 md:h-8 md:w-8"
          >
            <path d="M8 5.14v13.72L19 12 8 5.14z" />
          </svg>
        )}
      </button>
    </div>
  ) : (
    // Block taps/clicks so mobile can't open Livid's native controls on banners.
    <div className="absolute inset-0 z-10" aria-hidden />
  );

  const content = (
    <div className="absolute inset-0 [container-type:size]">
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        style={iframeCoverStyle}
        className={`${iframeClassName} ${showPoster ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        tabIndex={shouldShowPlayButton ? 0 : -1}
      />
      {posterOverlay}
      {playOverlay}
    </div>
  );

  return fullBleed ? (
    <div className={`livid-embed absolute inset-0 h-full w-full overflow-hidden ${className}`}>
      {content}
    </div>
  ) : (
    <div className={`livid-embed relative aspect-video w-full overflow-hidden ${className}`}>
      {content}
    </div>
  );
}
