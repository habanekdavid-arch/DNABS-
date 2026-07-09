import styles from "./ServicesMarquee.module.css";

const NBSP = "  ";

const ITEMS: { label: string; sepClass: string }[] = [
  { label: "WEBY", sepClass: styles.accent },
  { label: "APLIKÁCIE", sepClass: styles.purple },
  { label: "DIGITÁLNY MARKETING", sepClass: styles.green },
  { label: "UX · UI", sepClass: styles.accent },
  { label: "AUTOMATIZÁCIA", sepClass: styles.purple },
  { label: "SEO", sepClass: styles.green },
];

function MarqueeSet() {
  return (
    <span>
      {ITEMS.map((item, i) => (
        <span key={i}>
          {item.label}
          {NBSP}
          <span className={item.sepClass}>/</span>
          {NBSP}
        </span>
      ))}
    </span>
  );
}

export default function ServicesMarquee() {
  return (
    <div className={styles.strip}>
      <div className={styles.track}>
        <MarqueeSet />
        <MarqueeSet />
      </div>
    </div>
  );
}
