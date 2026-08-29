"use client";

import { useState, useTransition } from "react";
import { setLeadStatus } from "./actions";
import { LEAD_STATUSES, getStatus } from "@/lib/leadStatus";
import styles from "./StatusSelect.module.css";

export default function StatusSelect({ id, status }: { id: number; status: string }) {
  const [value, setValue] = useState(status);
  const [isPending, startTransition] = useTransition();
  const current = getStatus(value);

  return (
    <select
      className={styles.select}
      style={{ background: current.color, color: current.text }}
      value={value}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value;
        setValue(next);
        startTransition(() => {
          setLeadStatus(id, next);
        });
      }}
    >
      {LEAD_STATUSES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
