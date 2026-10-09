"use client";

import { useEffect, useRef, useState } from "react";

/** Video de fondo: versión vertical en celular, horizontal en pantallas anchas. */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.src = window.matchMedia("(min-width: 768px)").matches
      ? "/media/hero-desktop.mp4"
      : "/media/hero-mobile.mp4";
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      onPlaying={() => setVisible(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
        visible ? "opacity-80" : "opacity-0"
      }`}
    />
  );
}
