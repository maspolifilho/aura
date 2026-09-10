export type CervicalConsistency = "firme" | "media" | "amolecida";
export type CervicalPosition = "posterior" | "intermediaria" | "anterior";

export interface BishopScoreInput {
  /** Dilatação em cm. */
  dilationCm: number;
  /** Esvaecimento em %. */
  effacementPct: number;
  /** Altura da apresentação (De Lee), de -3 a +3. */
  station: number;
  consistency: CervicalConsistency;
  position: CervicalPosition;
}

function scoreDilation(cm: number): number {
  if (cm <= 0) return 0;
  if (cm <= 2) return 1;
  if (cm <= 4) return 2;
  return 3;
}

function scoreEffacement(pct: number): number {
  if (pct <= 30) return 0;
  if (pct <= 50) return 1;
  if (pct <= 70) return 2;
  return 3;
}

function scoreStation(station: number): number {
  if (station <= -3) return 0;
  if (station <= -2) return 1;
  if (station <= 0) return 2;
  return 3;
}

const consistencyScore: Record<CervicalConsistency, number> = {
  firme: 0,
  media: 1,
  amolecida: 2,
};

const positionScore: Record<CervicalPosition, number> = {
  posterior: 0,
  intermediaria: 1,
  anterior: 2,
};

/**
 * Escore de Bishop (Bishop, 1964) — avalia a maturidade do colo uterino
 * antes de indução do parto. 0-13 pontos; ferramenta de apoio à decisão,
 * não substitui o julgamento clínico.
 */
export function calculateBishopScore(input: BishopScoreInput): number {
  return (
    scoreDilation(input.dilationCm) +
    scoreEffacement(input.effacementPct) +
    scoreStation(input.station) +
    consistencyScore[input.consistency] +
    positionScore[input.position]
  );
}

export function interpretBishopScore(
  score: number,
): "favoravel" | "intermediario" | "desfavoravel" {
  if (score >= 8) return "favoravel";
  if (score >= 6) return "intermediario";
  return "desfavoravel";
}
