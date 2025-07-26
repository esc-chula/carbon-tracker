import React, { useEffect, useRef, useState } from "react";

interface CountingAnimationProps {
  to: number;
  duration?: number; // milliseconds
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export default function CountingAnimation({
  to,
  duration = 1000,
  suffix = "",
  prefix = "",
  decimals = 0,
}: CountingAnimationProps): React.JSX.Element {
  const [count, setCount] = useState<number>(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const start = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = start + (to - start) * progress;
      setCount(value);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(to); // Ensure exact final value
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [to, duration]);

  return (
    <span>
      {prefix}
      {Number(count).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
