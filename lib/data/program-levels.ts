/**
 * Conteúdo dos níveis do Programa de Acompanhamento da Gestante.
 * Estático por enquanto — quando o Supabase estiver configurado, isto passa
 * a vir das tabelas `program_levels` / `program_exams` (mesmo formato).
 */
export type ProgramLevelCode = "basic" | "ideal" | "advanced";

export interface ProgramLevel {
  code: ProgramLevelCode;
  name: string;
  priceCents: number;
  highlighted?: boolean;
  features: string[];
}

export const sharedBenefits = [
  "Ambiente premium e equipamento de alta tecnologia",
  "Gravação dos exames em alta resolução",
  "Obstétrico com doppler no 3º trimestre",
];

export const programLevels: ProgramLevel[] = [
  {
    code: "basic",
    name: "Basic",
    priceCents: 175_000,
    features: [
      "Morfológico do 1º, 2º e 3º trimestre",
      "Cervicometria (1º e 2º trimestre)",
      "Obstétrico com doppler no 3º trimestre",
      "Gravação dos exames em alta resolução",
    ],
  },
  {
    code: "ideal",
    name: "Ideal",
    priceCents: 189_990,
    highlighted: true,
    features: [
      "Tudo do Basic",
      "Exame 3D (30 a 34 semanas)",
      "Acesso ao app de acompanhamento com conteúdo diário",
      "Canal direto com o médico para dúvidas sobre os exames",
      "15% de desconto em exames extras fora do programa",
    ],
  },
  {
    code: "advanced",
    name: "Advanced",
    priceCents: 269_090,
    features: [
      "Tudo do Ideal",
      "Agendamento prioritário",
      "Uma tentativa adicional de exame 3D",
    ],
  },
];

export function formatPriceCents(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
