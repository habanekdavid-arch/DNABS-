const GLYPHS = "█▓▒░<>/\\_-=+*#01";

/**
 * Text sa rozsype na náhodné znaky a zľava doprava sa vracia na pôvodný.
 * Vracia funkciu na zrušenie. Kým beží, druhé spustenie sa ignoruje —
 * o to sa stará volajúci cez príznak na prvku.
 */
export function scramble(el: HTMLElement, duration = 400): () => void {
  const original = el.dataset.label ?? el.textContent ?? "";
  const start = performance.now();
  let frame = 0;

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    // Koľko znakov zľava je už usadených.
    const settled = Math.floor(progress * original.length);
    let out = "";
    for (let i = 0; i < original.length; i++) {
      const ch = original[i];
      if (i < settled || ch === " ") out += ch;
      else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    el.textContent = out;
    if (progress < 1) frame = requestAnimationFrame(tick);
    else el.textContent = original;
  };
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    el.textContent = original;
  };
}
