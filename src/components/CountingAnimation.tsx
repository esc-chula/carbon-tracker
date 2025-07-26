import { useEffect, useState } from "react";

interface CountingAnimationProps {
  to: number;
  duration?: number; // ms
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
}: CountingAnimationProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = start + (to - start) * progress;
      setCount(value);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, duration]);

  return (
    <span>
      {prefix}
      {count &&
        count.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
      {suffix}
    </span>
  );
}
