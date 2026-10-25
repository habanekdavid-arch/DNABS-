import type { VstupnaStranka } from "@/data/vstupneStranky";

const WEB = "https://dnabs.online";

/**
 * Odkazy na jazykové verzie tej istej stránky.
 *
 * Bez nich Google berie slovenskú a českú verziu ako dve stránky s takmer
 * rovnakým obsahom a jednu z nich potlačí — práve preto, že slovenčina
 * a čeština sú si tak blízke. S hreflang vie, že je to tá istá stránka
 * pre dve publiká, a každej ukáže tú jej.
 *
 * x-default je slovenčina: je to domáci trh a pôvodná verzia obsahu.
 */
export function hreflang(stranka: VstupnaStranka): Record<string, string> {
  return {
    "sk-SK": `${WEB}/${stranka.slug}`,
    "cs-CZ": `${WEB}/cs/${stranka.slugCs}`,
    "x-default": `${WEB}/${stranka.slug}`,
  };
}
