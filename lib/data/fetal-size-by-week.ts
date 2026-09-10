/**
 * Referência de tamanho/peso médio do bebê por semana gestacional, para
 * conteúdo informativo do portal ("semana a semana"). Valores médios de
 * referência amplamente divulgados (não é medida clínica individual — o
 * peso/comprimento reais de cada gestação vêm da biometria do exame).
 */
export interface FetalSizeReference {
  week: number;
  lengthCm: number;
  weightG: number | null;
  comparison: string;
}

export const fetalSizeByWeek: FetalSizeReference[] = [
  { week: 8, lengthCm: 1.6, weightG: null, comparison: "uma framboesa" },
  { week: 9, lengthCm: 2.3, weightG: null, comparison: "uma azeitona" },
  { week: 10, lengthCm: 3.1, weightG: 4, comparison: "um kumquat" },
  { week: 11, lengthCm: 4.1, weightG: 7, comparison: "um figo" },
  { week: 12, lengthCm: 5.4, weightG: 14, comparison: "uma lima" },
  { week: 13, lengthCm: 7.4, weightG: 23, comparison: "uma vagem de ervilha" },
  { week: 14, lengthCm: 8.7, weightG: 43, comparison: "um pêssego" },
  { week: 15, lengthCm: 10.1, weightG: 70, comparison: "uma maçã" },
  { week: 16, lengthCm: 11.6, weightG: 100, comparison: "um abacate" },
  { week: 17, lengthCm: 13, weightG: 140, comparison: "um nabo" },
  { week: 18, lengthCm: 14.2, weightG: 190, comparison: "um pimentão" },
  { week: 19, lengthCm: 15.3, weightG: 240, comparison: "um tomate grande" },
  { week: 20, lengthCm: 16.4, weightG: 300, comparison: "uma banana" },
  { week: 21, lengthCm: 26.7, weightG: 360, comparison: "uma cenoura" },
  { week: 22, lengthCm: 27.8, weightG: 430, comparison: "uma abóbora espaguete" },
  { week: 23, lengthCm: 28.9, weightG: 500, comparison: "uma manga grande" },
  { week: 24, lengthCm: 30, weightG: 600, comparison: "uma espiga de milho" },
  { week: 25, lengthCm: 34.6, weightG: 660, comparison: "uma couve-flor" },
  { week: 26, lengthCm: 35.6, weightG: 760, comparison: "uma alface" },
  { week: 27, lengthCm: 36.6, weightG: 875, comparison: "uma couve-flor grande" },
  { week: 28, lengthCm: 37.6, weightG: 1000, comparison: "uma berinjela" },
  { week: 29, lengthCm: 38.6, weightG: 1150, comparison: "uma abóbora butternut" },
  { week: 30, lengthCm: 39.9, weightG: 1320, comparison: "um repolho" },
  { week: 31, lengthCm: 41.1, weightG: 1500, comparison: "um coco" },
  { week: 32, lengthCm: 42.4, weightG: 1700, comparison: "uma jicama" },
  { week: 33, lengthCm: 43.7, weightG: 1900, comparison: "um abacaxi" },
  { week: 34, lengthCm: 45, weightG: 2100, comparison: "um melão cantaloupe" },
  { week: 35, lengthCm: 46.2, weightG: 2400, comparison: "um melão honeydew" },
  { week: 36, lengthCm: 47.4, weightG: 2600, comparison: "um pé de alface romana" },
  { week: 37, lengthCm: 48.6, weightG: 2900, comparison: "um mamão papaia" },
  { week: 38, lengthCm: 49.8, weightG: 3000, comparison: "um alho-poró grande" },
  { week: 39, lengthCm: 50.7, weightG: 3300, comparison: "uma minimelancia" },
  { week: 40, lengthCm: 51.2, weightG: 3400, comparison: "uma abóbora pequena" },
];

export function getFetalSizeForWeek(
  week: number,
): FetalSizeReference | null {
  const clamped = Math.max(8, Math.min(40, week));
  return (
    fetalSizeByWeek.find((entry) => entry.week === clamped) ??
    fetalSizeByWeek.find((entry) => entry.week === Math.round(clamped)) ??
    null
  );
}
