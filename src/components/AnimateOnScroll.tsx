"use client";

import { useEffect, useRef } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: "reveal" | "reveal-left" | "reveal-right" | "reveal-scale";
  delay?: number;
  threshold?: number;
}

export default function AnimateOnScroll({
  children,
  className = "",
  animation = "reveal",
  delay = 0,
  threshold = 0.15,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${animation} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms`, animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
