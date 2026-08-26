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
          <div key={item.q} className={styles.item}>
            <button
              type="button"
              className={styles.question}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className={styles.icon} aria-hidden>
                {isOpen ? "—" : "+"}
              </span>
            </button>
            {isOpen && <div className={styles.answer}>{item.a}</div>}
          </div>
        );
      })}
    </div>
  );
}
