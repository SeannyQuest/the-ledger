"use client";

import { useRef, useState, useEffect } from "react";

interface Dimensions {
  width: number;
  height: number;
}

export function useResizeObserver(): [React.RefObject<HTMLDivElement | null>, Dimensions] {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width: Math.floor(width), height: Math.floor(height) });
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, dimensions];
}
