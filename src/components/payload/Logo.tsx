import React from 'react';

/**
 * Payload admin login logo (graphics.Logo).
 * Keep it simple: just render an <img> so Payload can SSR it.
 */
export default function Logo() {
  return (
    <img
      src="/images/landing/logo.svg"
      alt="DXI AI"
      style={{ width: 220, height: 'auto', display: 'block' }}
    />
  );
}

