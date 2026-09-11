import { NextResponse, type NextRequest } from "next/server";

/**
 * Trava de prévia para as áreas internas.
 *
 * `/painel` e `/portal` ainda não têm autenticação de verdade — o login do
 * portal só faz `router.push` e nenhum layout checa sessão (ver os
 * TODO(milestone-2)). Sem isto, qualquer pessoa que digite a URL abre o
 * painel financeiro e a lista de pacientes.
 *
 * Isto NÃO substitui o milestone-2. É uma porta trancada enquanto a
 * autenticação real não existe, para o app poder ficar num endereço público
 * sem expor as áreas internas.
 */

const AREAS_PROTEGIDAS = ["/painel", "/portal"];

function ehProtegida(pathname: string): boolean {
  return AREAS_PROTEGIDAS.some(
    (base) => pathname === base || pathname.startsWith(`${base}/`),
  );
}

/** Comparação em tempo constante, para não vazar a senha pelo tempo de resposta. */
function iguais(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diferenca = 0;
  for (let i = 0; i < a.length; i++) {
    diferenca |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diferenca === 0;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!ehProtegida(pathname)) return NextResponse.next();

  const senha = process.env.PREVIEW_PASSWORD;

  // Sem senha configurada a área fica fechada, nunca aberta por engano.
  // Esquecer a variável de ambiente não pode virar vazamento.
  if (!senha) {
    return new NextResponse(
      "Área interna indisponível: PREVIEW_PASSWORD não configurada.",
      { status: 503, headers: { "X-Robots-Tag": "noindex, nofollow" } },
    );
  }

  const autorizacao = request.headers.get("authorization");
  if (autorizacao?.startsWith("Basic ")) {
    try {
      const decodificado = atob(autorizacao.slice(6));
      const fornecida = decodificado.slice(decodificado.indexOf(":") + 1);
      if (iguais(fornecida, senha)) {
        const resposta = NextResponse.next();
        resposta.headers.set("X-Robots-Tag", "noindex, nofollow");
        return resposta;
      }
    } catch {
      // cabeçalho malformado cai no 401 abaixo
    }
  }

  return new NextResponse("Acesso restrito à equipe da Clínica Aura.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Clinica Aura - area interna", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export const config = {
  matcher: ["/painel/:path*", "/portal/:path*"],
};
