import type { Metadata } from "next";
import ConversionEvent from "@/components/ConversionEvent";
import DakujemeObsah from "./DakujemeObsah";

export const metadata: Metadata = {
  title: "Ďakujeme",
  description: "Tvoj dopyt sme prijali, ozveme sa ti a dohodneme bezplatnú 30-minútovú konzultáciu.",
  robots: { index: false, follow: true },
};

export default function DakujemePage() {
  return (
    <>
      <ConversionEvent />
      <DakujemeObsah />
    </>
  );
}
