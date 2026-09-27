"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PROJEKTY, AUTO_PREPNUTIE_MS, type KartaKolaze, type Projekt } from "@/data/hlavicka";
import Laptop from "./Laptop";
import styles from "./Collage.module.css";

const DESIGN_W = 1040;
const DESIGN_H = 680;

/** Naklonenie karty podľa pozície kurzora nad ňou. */
function tiltCard(card: HTMLElement, e: React.MouseEvent) {
  const rect = card.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  const base = card.dataset.base ?? "";
  card.style.transform =
    `${base} translateZ(60px) scale(1.04) rotateX(${(0.5 - py) * 22}deg) rotateY(${(px - 0.5) * 22}deg)`;
  card.style.setProperty("--mx", `${px * 100}%`);
  card.style.setProperty("--my", `${py * 100}%`);
}

export default function Collage() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState<{ projekt: Projekt; from: DOMRect } | null>(null);

  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + PROJEKTY.length) % PROJEKTY.length);
  }, []);

  /* Scéna sa zmenší podľa kontajnera a natáča sa za myšou. */
  useEffect(() => {
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    if (!viewport || !stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let scale = 1;
    const resize = () => {
      const { width, height } = viewport.getBoundingClientRect();
      scale = Math.min(width / DESIGN_W, height / DESIGN_H);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(viewport);

    // Bez naklápania stačí jeden prepočet — scéna sa nehýbe.
    if (reduced || coarse) {
      const apply = () => { stage.style.transform = `scale(${scale})`; };
      apply();
      const ro = new ResizeObserver(apply);
      ro.observe(viewport);
      return () => { observer.disconnect(); ro.disconnect(); };
    }

    let targetX = 0, targetY = 0, x = 0, y = 0, frame = 0;
    const onMove = (e: MouseEvent) => {
      const rect = viewport.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
    };
    const tick = () => {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      stage.style.transform = `scale(${scale}) rotateX(${-y * 8}deg) rotateY(${x * 12}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    viewport.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  /* Automatické prepínanie — stojí, kým je myš nad kolážou alebo beží zoom. */
  useEffect(() => {
    if (!AUTO_PREPNUTIE_MS || paused || zoom) return;
    const timer = window.setTimeout(() => go(1), AUTO_PREPNUTIE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, zoom, go]);

  return (
    <div
      className={styles.wrap}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={viewportRef} className={styles.viewport}>
        <div ref={stageRef} className={styles.stage}>
          {PROJEKTY.map((projekt, i) => (
            <ProjectLayer
              key={projekt.nazov}
              projekt={projekt}
              active={i === index}
              onZoom={(from) => setZoom({ projekt, from })}
            />
          ))}
        </div>
      </div>

      <p className={styles.tagline}>{PROJEKTY[index].tagline}</p>

      <div className={styles.controls}>
        <button type="button" className={`${styles.navBtn} ${styles.prev}`} onClick={() => go(-1)} aria-label="Predchádzajúca realizácia">←</button>
        <span className={styles.counter} aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(PROJEKTY.length).padStart(2, "0")}
        </span>
        <button type="button" className={`${styles.navBtn} ${styles.next}`} onClick={() => go(1)} aria-label="Ďalšia realizácia">→</button>
      </div>

      {zoom && <ZoomOverlay projekt={zoom.projekt} from={zoom.from} onDone={() => setZoom(null)} />}
    </div>
  );
}

/* ── Jedna vrstva koláže ─────────────────────────────────────────────── */

function ProjectLayer({ projekt, active, onZoom }:
  { projekt: Projekt; active: boolean; onZoom: (from: DOMRect) => void }) {
  return (
    <div className={`${styles.project} ${active ? styles.projectActive : ""}`} aria-hidden={!active}>
      <div
        className={styles.panel}
        style={{ background: projekt.farba, boxShadow: `0 50px 90px -40px ${projekt.farba}` }}
      >
        {projekt.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={projekt.logo} alt={`Logo ${projekt.nazov}`} className={styles.panelLogo} />
        ) : (
          <span className={styles.panelName}>{projekt.nazov}</span>
        )}
        <span className={styles.panelMeta}>{projekt.popis}</span>
      </div>

      {projekt.karty.map((karta, i) => (
        <Card key={i} karta={karta} order={i} active={active} projekt={projekt} onZoom={onZoom} />
      ))}
    </div>
  );
}

function Card({ karta, order, active, projekt, onZoom }:
  { karta: KartaKolaze; order: number; active: boolean; projekt: Projekt; onZoom: (from: DOMRect) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const base = `translate3d(${karta.x}px, ${karta.y}px, ${karta.z ?? 80}px) rotateZ(${karta.rot ?? 0}deg)`;

  // Nábeh: karty prichádzajú postupne zdola.
  const style: React.CSSProperties = {
    transform: active ? base : `${base} translateY(40px)`,
    transitionDelay: active ? `${order * 70}ms` : "0ms",
    ...(karta.typ === "obrazok" || karta.typ === "video" ? { width: karta.w, height: karta.h } : {}),
  };

  const onEnter = () => { if (ref.current) ref.current.dataset.base = base; };
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    tiltCard(ref.current, e);
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = base; };

  if (karta.typ === "notebook") {
    return (
      <div ref={ref} className={`${styles.card} ${styles.laptopSlot}`} style={style}
           onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave}>
        <button type="button" className={styles.laptopCard}
                onClick={(e) => {
                  const screen = e.currentTarget.querySelector('[class*="screen"]');
                  onZoom((screen ?? e.currentTarget).getBoundingClientRect());
                }}
                aria-label={`Otvoriť web ${projekt.nazov}`}>
          <span className={styles.openBtn} aria-hidden>
            <span className={styles.openDot} />
            Otvoriť web ↗
          </span>
          <span className={styles.laptopScale} style={{ display: "block" }}>
            <Laptop screenshot={karta.screenshot} alt={karta.alt} />
          </span>
        </button>
      </div>
    );
  }

  if (karta.typ === "stitok") {
    return (
      <div ref={ref} className={styles.card} style={style}
           onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave}>
        <span className={styles.tag}>{karta.text}</span>
      </div>
    );
  }

  return (
    <div ref={ref} className={styles.card} style={style}
         onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className={styles.media}>
        {karta.typ === "video" ? (
          <>
            <video src={karta.src} poster={karta.poster} muted loop playsInline aria-label={karta.alt} />
            <span className={styles.play} aria-hidden>▶</span>
          </>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={karta.src} alt={karta.alt} loading="lazy" />
        )}
        <span className={styles.sheen} aria-hidden />
      </div>
    </div>
  );
}

/* ── Zoom pri kliknutí na notebook ───────────────────────────────────── */

/**
 * Let dovnútra notebooku. Rám sa spustí presne tam, kde je displej na
 * stránke, roztiahne sa cez celé okno a potom sa prejde na stránku
 * s prezentáciou projektu.
 */
function ZoomOverlay({ projekt, from, onDone }:
  { projekt: Projekt; from: DOMRect; onDone: () => void }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const notebook = projekt.karty.find((k) => k.typ === "notebook");
  const cielova = `/realizacie/${projekt.slug}`;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { router.push(cielova); return; }

    const raf = requestAnimationFrame(() => setOpen(true));
    // Prejdeme až keď je obrazovka roztiahnutá — prechod tak plynie ďalej.
    const goTimer = window.setTimeout(() => router.push(cielova), 900);
    const doneTimer = window.setTimeout(onDone, 1500);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(goTimer);
      window.clearTimeout(doneTimer);
    };
  }, [router, cielova, onDone]);

  // Štart presne na displeji notebooku, cieľ cez celé okno.
  const frameStyle: React.CSSProperties = open
    ? { left: 0, top: 0, width: "100vw", height: "100vh", borderRadius: 0, padding: 0 }
    : { left: from.left, top: from.top, width: from.width, height: from.height };

  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={`${styles.backdrop} ${open ? styles.backdropOn : ""}`} />
      <div className={styles.zoomFrame} style={frameStyle}>
        {notebook?.typ === "notebook" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={notebook.screenshot} alt={notebook.alt} />
        )}
      </div>
      <div className={`${styles.opening} ${open ? styles.openingOn : ""}`}>
        Otváram {projekt.nazov}
        <div className={styles.progress}>
          <div className={`${styles.progressBar} ${open ? styles.progressOn : ""}`} />
        </div>
      </div>
    </div>
  );
}
