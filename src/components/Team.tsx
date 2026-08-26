"use client";

import { useLanguage } from "@/lib/i18n";
import Reveal from "./Reveal";
import styles from "./Team.module.css";

export default function Team() {
  const { t } = useLanguage();

  return (
    <section id="tim" className={styles.section}>
      <Reveal className={styles.inner}>
        <div className={styles.kicker}>{t("team_kicker")}</div>
        {/* TODO: nahraď za <Image> s reálnou fotkou */}
        <div className={styles.avatar} aria-hidden>
          <svg
            className={styles.avatarIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          </svg>
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{t("team_name")}</div>
          <div className={styles.role}>{t("team_role")}</div>
          <div className={styles.company}>{t("team_company")}</div>
          <div className={styles.promise}>{t("team_promise")}</div>
          <div className={styles.photoNote}>{t("team_photo_note")}</div>
        </div>
      </Reveal>
    </section>
  );
}
