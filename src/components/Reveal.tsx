"use client";

import {
  useEffect,
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
  href?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  // Uzol držíme v stave, nie v ref — keď sa zmení `as` (napr. odkaz na
  // dotyku vystrieda článok), React vymení DOM uzol a pozorovateľ musí
  // preskočiť na nový. S ref-om by ostal visieť na starom a prvok by sa
  // už nikdy neodhalil.
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );

  useEffect(() => {
    const el = node;
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
  }, [node]);

  return (
    <Tag
      ref={setNode}
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
