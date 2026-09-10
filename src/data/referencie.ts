type Bilingual = { sk: string; en: string };

export type Referencia = {
  /** Text referencie — presne tak, ako ho klient napísal alebo povedal. */
  quote: Bilingual;
  /** Meno klienta. */
  name: string;
  /** Firma alebo rola, napr. "Salón Bella, Bratislava". */
  role: string;
};

/**
 * Sem patria LEN skutočné referencie od reálnych klientov — s ich súhlasom.
 * Kým je pole prázdne, sekcia sa na webe vôbec nezobrazí.
 *
 * Vzor:
 * {
 *   quote: {
 *     sk: "Návrh prišiel na druhý deň a trafili presne to, čo som chcela.",
 *     en: "The design arrived the next day and hit exactly what I wanted.",
 *   },
 *   name: "Jana Kováčová",
 *   role: "Salón Bella, Bratislava",
 * },
 */
export const referencie: Referencia[] = [];
