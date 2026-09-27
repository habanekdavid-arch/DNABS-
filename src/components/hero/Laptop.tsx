import styles from "./Laptop.module.css";

/* Slovenské rozloženie klávesnice. Prázdny reťazec = kláves bez popisku. */
const ROWS: { keys: string[]; mods?: number[]; grow?: Record<number, number> }[] = [
  { keys: ["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "⏻"] },
  { keys: [";", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "⌫"], grow: { 13: 1.8 } },
  { keys: ["tab", "Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "ú", "ä", "\\"], grow: { 0: 1.5 } },
  { keys: ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", "ô", "§", "⏎"], grow: { 0: 1.8, 12: 1.8 } },
  { keys: ["shift", "Y", "X", "C", "V", "B", "N", "M", ",", ".", "-", "shift"], grow: { 0: 2.3, 11: 2.3 } },
  { keys: ["fn", "ctrl", "⌥", "⌘", "", "⌘", "⌥", "◀", "▲▼", "▶"], grow: { 4: 5.2 } },
];
const MOD_LABELS = new Set(["esc", "tab", "caps", "shift", "fn", "ctrl", "⌥", "⌘", "⌫", "⏎", "⏻"]);

/**
 * Notebook poskladaný iba z HTML a CSS 3D transformácií.
 * Návrhová plocha je 880×560 px; zmenšuje sa zvonka cez `scale`.
 */
export default function Laptop({ screenshot, alt }: { screenshot: string; alt: string }) {
  return (
    <div className={styles.wrap} aria-hidden={false}>
      <div className={styles.shadow} />
      <div className={styles.scene}>
        <div className={styles.lid}>
          <div className={styles.lidFront}>
            <div className={styles.screen}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={screenshot} alt={alt} loading="lazy" />
            </div>
          </div>
          <div className={styles.lidBack} />
        </div>

        <div className={styles.base}>
          <div className={styles.notch} />
          <div className={styles.speakers}>
            <div className={styles.grille} />
            <div className={styles.keyboard}>
              {ROWS.map((row, r) => (
                <div key={r} className={`${styles.row} ${r === 0 ? styles.rowFn : ""}`}>
                  {row.keys.map((label, i) => (
                    <span
                      key={i}
                      className={`${styles.key} ${MOD_LABELS.has(label) ? styles.mod : ""}`}
                      style={row.grow?.[i] ? { flexGrow: row.grow[i] } : undefined}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.grille} />
          </div>
          <div className={styles.touchpad} />
        </div>
      </div>
    </div>
  );
}
