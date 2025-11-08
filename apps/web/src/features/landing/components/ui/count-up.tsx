"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /**
   * Target value to count to. Can be a number or string with suffix (e.g., "500+", "9+")
   */
  value: number | string;
  /**
   * Duration of the animation in milliseconds
   * @default 2000
   */
  duration?: number;
  /**
   * Delay before starting the animation in milliseconds
   * @default 0
   */
  delay?: number;
  /**
   * Whether to trigger animation on mount (for testing)
   * @default false
   */
  startOnMount?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * CountUp component that animates a number from 0 to the target value.
 * Uses Intersection Observer to trigger animation when element enters viewport.
 */
export const CountUp = ({
  value,
  duration = 2000,
  delay = 0,
  startOnMount = false,
  className = "",
}: CountUpProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(startOnMount);
  const [isComplete, setIsComplete] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Parse the value to extract number and suffix
  const parseValue = (val: number | string): { number: number; suffix: string } => {
    if (typeof val === "number") {
      return { number: val, suffix: "" };
    }
    const match = val.match(/^(\d+)(.*)$/);
    if (match) {
      return { number: parseInt(match[1], 10), suffix: match[2] };
    }
    return { number: 0, suffix: val };
  };

  const { number: targetNumber, suffix } = parseValue(value);

  useEffect(() => {
    if (hasStarted || isComplete) return;

    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: "50px", // Start animation slightly before element enters viewport
      }
    );

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      observer.observe(currentElement);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.unobserve(currentElement);
    };
  }, [hasStarted, isComplete]);

  useEffect(() => {
    if (!hasStarted || isComplete) return;

    const startTime = Date.now() + delay;
    let animationFrameId: number;

    const animate = () => {
      const now = Date.now();
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentCount = Math.floor(easeOut * targetNumber);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
        setIsComplete(true);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasStarted, targetNumber, duration, delay, isComplete]);

  return (
    <span ref={elementRef} className={className}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

