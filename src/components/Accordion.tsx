"use client";

import { useState } from "react";
import styles from "./Accordion.module.css";

export type AccordionItem = { q: string; a: string };

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            className={styles.item}
            onMouseEnter={() => setOpenIndex(i)}
          >
            <button
              type="button"
              className={styles.question}
              aria-expanded={isOpen}
              onFocus={() => setOpenIndex(i)}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} aria-hidden>
                +
              </span>
            </button>
            <div className={`${styles.answerWrap} ${isOpen ? styles.answerOpen : ""}`}>
              <div className={styles.answerInner}>
                <p className={styles.answer}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
