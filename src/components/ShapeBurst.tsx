"use client";

import { useEffect } from "react";
import { initShapeBurst } from "@/lib/shapeBurst";

/** Nič nevykresľuje — efekt si spravuje vlastný overlay mimo Reactu. */
export default function ShapeBurst() {
  useEffect(() => {
    const controller = initShapeBurst();
    return () => controller?.destroy();
  }, []);

  return null;
}
