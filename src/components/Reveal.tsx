"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
  type CSSProperties,
  type HTMLAttributes,
} from "react";

export default function Reveal({
  as: Tag = "div",
  className,
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? style?.transform ?? "none" : "translateY(26px)",
        transition:
          "opacity .85s cubic-bezier(.22,.7,.2,1), transform .85s cubic-bezier(.22,.7,.2,1), background .3s ease, color .3s ease",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
