const PROJECT_TYPE_LABELS: Record<string, string> = {
  web: "Web",
  eshop: "E-shop",
  app: "Aplikácia",
  marketing: "Marketing",
};

export function projectTypeLabel(value: string | null) {
  if (!value) return "—";
  return PROJECT_TYPE_LABELS[value] ?? value;
}
