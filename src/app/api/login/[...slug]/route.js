import { NextResponse } from "next/server";

import conn from "@app/utils/conn";

export async function POST(request, { params }) {
  const data = params.slug;
  const client = conn();
  const res = await client.query(
    "SELECT id FROM public.users WHERE email = $1 AND password = $2;",
    [data[0], data[1]]
  );

  if (res.rowCount > 0) {
    return new NextResponse(true, { status: 200 });
  }

  return new NextResponse(false, { status: 401 });
}
