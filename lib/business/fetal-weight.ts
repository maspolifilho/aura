export interface FetalBiometry {
  /** Diâmetro biparietal, em mm. */
  bpdMm: number;
  /** Circunferência cefálica, em mm. */
  hcMm: number;
  /** Circunferência abdominal, em mm. */
  acMm: number;
  /** Comprimento do fêmur, em mm. */
  flMm: number;
}

/**
 * Peso fetal estimado (PFE) pela fórmula de Hadlock de 4 parâmetros
 * (Hadlock et al., 1985 — "Estimation of fetal weight with the use of head,
 * body, and femur measurements"), a mais usada mundialmente para PFE.
 *
 * log10(peso em g) = 1.3596 − 0.00386·AC·FL + 0.0064·HC + 0.00061·BPD·AC
 *                    + 0.0424·AC + 0.174·FL   (medidas em cm)
 *
 * Ferramenta de apoio à decisão — não substitui o julgamento clínico, e não
 * inclui classificação por percentil (precisa da curva de referência
 * Hadlock 1991 completa, não implementada aqui).
 */
export function estimateFetalWeightHadlock(biometry: FetalBiometry): number {
  const bpd = biometry.bpdMm / 10;
  const hc = biometry.hcMm / 10;
  const ac = biometry.acMm / 10;
  const fl = biometry.flMm / 10;

  const log10Weight =
    1.3596 -
    0.00386 * ac * fl +
    0.0064 * hc +
    0.00061 * bpd * ac +
    0.0424 * ac +
    0.174 * fl;

  return Math.round(10 ** log10Weight);
}
