import { NextResponse } from "next/server";

interface LeadPayload {
  fullName: string;
  phone: string;
  email?: string;
  origin: "obstetra" | "outro_canal";
  obstetricianName?: string;
  interestedLevel?: string;
  notes?: string;
}

function isValidLead(body: unknown): body is LeadPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.fullName === "string" &&
    b.fullName.trim().length > 1 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 7 &&
    (b.origin === "obstetra" || b.origin === "outro_canal")
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidLead(body)) {
    return NextResponse.json(
      { error: "Dados inválidos. Confira nome, telefone e origem." },
      { status: 400 },
    );
  }

  // TODO(milestone-2): gravar em `leads` via lib/supabase/admin.ts assim que
  // o projeto Supabase e as migrations existirem. Por enquanto só logamos.
  console.log("[lead] novo contato recebido:", body);

  return NextResponse.json({ ok: true });
}
