"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { SPEED, LEADS, CONVERSION, IMPACT_COPY, IMPACT_IS_PLACEHOLDER } from "@/data/impact";
import styles from "./ImpactCharts.module.css";

const W = 520;
const H = 220;

function leadsPath(series: number[], close: boolean) {
  const max = Math.max(...series) * 1.1;
  const step = W / (series.length - 1);
  const pts = series.map((v, i) => [i * step, H - (v / max) * H] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return close ? `${line} L${W},${H} L0,${H} Z` : line;
}

function Glitch({ children }: { children: React.ReactNode }) {
  // Tri vrstvy toho istého SVG — dve farebné posunuté kópie robia RGB split.
  return (
    <div className={styles.glitch}>
      <div className={styles.layerMain}>{children}</div>
      <div className={`${styles.layer} ${styles.layerA}`} aria-hidden>
        {children}
      </div>
      <div className={`${styles.layer} ${styles.layerB}`} aria-hidden>
        {children}
      </div>
    </div>
  );
}

export default function ImpactCharts() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const speedMax = SPEED.before;
  const launchX = (W / (LEADS.series.length - 1)) * LEADS.launchIndex;
  const leadsGain = Math.round(
    (LEADS.series[LEADS.series.length - 1] / LEADS.series[LEADS.launchIndex - 1] - 1) * 100
  );
  const ring = 2 * Math.PI * 70;

  return (
    <section ref={ref} className={`${styles.section} ${on ? styles.on : ""}`}>
      <div className={styles.scan} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.head}>
          <div>
            <div className={styles.label}>{IMPACT_COPY.label[lang]}</div>
            <h2 className={styles.title} data-text={IMPACT_COPY.title[lang]}>
              {IMPACT_COPY.title[lang]}
            </h2>
          </div>
          <p className={styles.sub}>{IMPACT_COPY.sub[lang]}</p>
        </div>

        {IMPACT_IS_PLACEHOLDER && <div className={styles.placeholder}>⚠ {IMPACT_COPY.placeholder[lang]}</div>}

        <div className={styles.grid}>
          {/* 01 — rýchlosť */}
          <div className={styles.tile}>
            <div className={styles.tileHead}>
              <span>01 / {SPEED.title[lang]}</span>
              <span className={styles.delta}>
                −{Math.round((1 - SPEED.after / SPEED.before) * 100)}%
              </span>
            </div>
            <div className={styles.bars}>
              {[
                { label: SPEED.beforeLabel[lang], v: SPEED.before, cls: styles.barBefore },
                { label: SPEED.afterLabel[lang], v: SPEED.after, cls: styles.barAfter },
              ].map((b) => (
                <div key={b.label} className={styles.barRow}>
                  <div className={styles.barLabel}>
                    <span>{b.label}</span>
                    <span>
                      {b.v.toLocaleString(lang === "sk" ? "sk-SK" : "en-US")} {SPEED.unit}
                    </span>
                  </div>
                  <div className={styles.barTrack}>
                    <div className={`${styles.bar} ${b.cls}`} style={{ width: `${(b.v / speedMax) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 02 — dopyty */}
          <div className={`${styles.tile} ${styles.tileWide}`}>
            <div className={styles.tileHead}>
              <span>02 / {LEADS.title[lang]}</span>
              <span className={styles.delta}>+{leadsGain}%</span>
            </div>
            <Glitch>
              <svg viewBox={`0 0 ${W} ${H + 24}`} className={styles.chart} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="leadsFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ff5a01" stopOpacity=".45" />
                    <stop offset="100%" stopColor="#ff5a01" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((f) => (
                  <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} className={styles.gridLine} />
                ))}
                <line x1={launchX} x2={launchX} y1="0" y2={H} className={styles.launch} />
                <text x={launchX + 6} y="14" className={styles.launchText}>
                  {LEADS.launchLabel[lang].toUpperCase()}
                </text>
                <path d={leadsPath(LEADS.series, true)} fill="url(#leadsFill)" className={styles.area} />
                <path d={leadsPath(LEADS.series, false)} className={styles.line} pathLength={1} />
              </svg>
            </Glitch>
          </div>

          {/* 03 — konverzia */}
          <div className={styles.tile}>
            <div className={styles.tileHead}>
              <span>03 / {CONVERSION.title[lang]}</span>
              <span className={styles.delta}>×{(CONVERSION.after / CONVERSION.before).toFixed(1)}</span>
            </div>
            <div className={styles.ringWrap}>
              <Glitch>
                <svg viewBox="0 0 180 180" className={styles.ring}>
                  <circle cx="90" cy="90" r="70" className={styles.ringTrack} />
                  <circle
                    cx="90"
                    cy="90"
                    r="70"
                    className={styles.ringBar}
                    strokeDasharray={ring}
                    style={{ ["--ring-off" as string]: `${ring * (1 - CONVERSION.after / 5)}px` }}
                  />
                </svg>
              </Glitch>
              <div className={styles.ringNum}>
                <div>
                  {CONVERSION.after.toLocaleString(lang === "sk" ? "sk-SK" : "en-US")}
                  <span>{CONVERSION.unit}</span>
                </div>
                <small>
                  {lang === "sk" ? "predtým" : "before"}{" "}
                  {CONVERSION.before.toLocaleString(lang === "sk" ? "sk-SK" : "en-US")}
                  {CONVERSION.unit}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
