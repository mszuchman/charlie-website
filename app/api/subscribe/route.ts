import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@vercel/postgres";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  // Store in Vercel Postgres
  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  const { rowCount } = await sql`
    INSERT INTO subscribers (email)
    VALUES (${email})
    ON CONFLICT (email) DO NOTHING
  `;

  if (rowCount === 0) {
    return NextResponse.json({ error: "Ya estás apuntado" }, { status: 409 });
  }

  // Send welcome email via Resend
  await resend.emails.send({
    from: "LoDeCharlie MAD <hola@charliecafe.com>",
    to: email,
    subject: "¡Ya estás en la lista! ☕",
    html: `
      <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; background: #fdf6ee; color: #2c1a0e;">
        <img src="https://charliecafe.com/logo.png" alt="LoDeCharlie MAD" style="width: 240px; margin-bottom: 32px;" />
        <h1 style="font-size: 24px; margin: 0 0 16px;">¡Gracias por apuntarte!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #7a4a28; font-style: italic;">
          Serás de los primeros en saber cuándo abrimos las puertas de LoDeCharlie en Madrid.
        </p>
        <p style="font-size: 14px; color: #a07850; margin-top: 32px;">
          Hasta pronto,<br /><strong>El equipo de LoDeCharlie MAD</strong>
        </p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
