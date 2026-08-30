"use client";

import { useTransition } from "react";
import { deleteLead } from "./actions";
import styles from "./DeleteLeadButton.module.css";

export default function DeleteLeadButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Naozaj chceš túto objednávku natrvalo vymazať?")) return;
    startTransition(() => {
      deleteLead(id);
    });
  };

  return (
    <button
      type="button"
      className={styles.deleteBtn}
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending ? "Mažem…" : "Vymazať"}
    </button>
  );
}
