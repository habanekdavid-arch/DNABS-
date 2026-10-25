-- Zdroj návštevy pri leade: odkiaľ človek prišiel.
--
-- Bez týchto stĺpcov sa nedá zistiť, či lead prišiel z Google Ads, a teda
-- ani overiť, či meranie konverzií funguje. Spusti to v Neon konzole
-- (SQL Editor) nad produkčnou databázou. IF NOT EXISTS znamená, že sa to
-- dá pustiť opakovane bez škody.
--
-- gclid je identifikátor kliku na reklamu. Je v adrese len na prvej
-- stránke návštevy, preto ho prehliadač odkladá a posiela až s formulárom.

ALTER TABLE leads ADD COLUMN IF NOT EXISTS gclid         text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_source    text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_medium    text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_campaign  text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_term      text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS landing_page  text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS referrer      text;

-- Na zozname v administrácii sa filtruje „len z reklamy“.
CREATE INDEX IF NOT EXISTS leads_gclid_idx ON leads (gclid) WHERE gclid IS NOT NULL;
