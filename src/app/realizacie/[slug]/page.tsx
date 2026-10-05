import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJEKTY } from "@/data/hlavicka";
import styles from "./page.module.css";

export function generateStaticParams() {
  return PROJEKTY.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const projekt = PROJEKTY.find((p) => p.slug === slug);
  if (!projekt) return {};
  return {
    title: `${projekt.nazov} — realizácia | DNABS`,
    description: projekt.tagline,
    alternates: { canonical: `/realizacie/${projekt.slug}` },
  };
}

export default async function ProjektPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projekt = PROJEKTY.find((p) => p.slug === slug);
  if (!projekt) notFound();

  return (
    <main className={styles.page} style={{ "--farba": projekt.farba } as React.CSSProperties}>
      <Link href="/#realizacia" className={styles.back}>← Späť na realizácie</Link>

      <div className={styles.head}>
        <div>
          {projekt.logo && (
            /* Logá sa dodávajú v negatívnej (svetlej) verzii pre farebný panel,
               preto ich aj tu kladieme na doštičku vo firemnej farbe. */
            <div className={styles.logoPlate}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={projekt.logo} alt={`Logo ${projekt.nazov}`} className={styles.logo} />
            </div>
          )}
          <h1 className={styles.title}>{projekt.nazov}</h1>
          <div className={styles.meta}>{projekt.popis}</div>
        </div>
        {projekt.tagline && <p className={styles.tagline}>{projekt.tagline}</p>}
      </div>

      <div className={styles.band} style={{ background: projekt.farba }} />

      <div className={styles.body}>
        <div className={styles.text}>
          {projekt.text.length > 0
            ? projekt.text.map((odstavec, i) => <p key={i}>{odstavec}</p>)
            : <p className={styles.chyba}>Popis projektu sa pripravuje.</p>}
          {/* Odkaz dáva zmysel, až keď je vyplnená adresa. */}
          {projekt.href && (
            <a href={projekt.href} target="_blank" rel="noopener noreferrer" className={styles.cta}>
              Otvoriť živý web ↗
            </a>
          )}
        </div>
        {projekt.sluzby.length > 0 && (
          <div>
            <p className={styles.sluzbyTitle}>Čo sme spravili</p>
            <ul className={styles.sluzby}>
              {projekt.sluzby.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.galeria}>
        {projekt.ukazky.length === 0 ? (
          <p className={styles.prazdna}>
            Ukážky sa pripravujú. Pridajte ich do poľa <code>ukazky</code> v súbore
            {" "}<code>src/data/hlavicka.ts</code>.
          </p>
        ) : (
          projekt.ukazky.map((u, i) => (
            <figure key={i} className={styles.polica}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u.src} alt={u.alt} loading="lazy" />
              {u.popis && <figcaption className={styles.policaPopis}>{u.popis}</figcaption>}
            </figure>
          ))
        )}
      </div>
    </main>
  );
}
