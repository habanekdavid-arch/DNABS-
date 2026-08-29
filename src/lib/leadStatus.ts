export const LEAD_STATUSES = [
  { value: "new", label: "Nový", color: "#ff5a01", text: "#0a0a0a" },
  { value: "in_progress", label: "Rozpracované", color: "#6637ed", text: "#fff" },
  { value: "preview_ready", label: "Náhľad hotový", color: "#00e9ff", text: "#0a0a0a" },
  { value: "website_built", label: "Web vytvorený", color: "#54fa80", text: "#0a0a0a" },
  { value: "paid", label: "Zaplatené", color: "#0a0a0a", text: "#fff" },
] as const;

export type LeadStatusValue = (typeof LEAD_STATUSES)[number]["value"];

export function getStatus(value: string) {
  return LEAD_STATUSES.find((s) => s.value === value) ?? LEAD_STATUSES[0];
}
