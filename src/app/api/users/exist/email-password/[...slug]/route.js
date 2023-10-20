import conn from "@app/utils/conn";

export async function POST(request, { params }) {
  const data = params.slug;
  console.log(data);
  const client = conn();
  const res = await client.query(
    "SELECT id FROM public.users WHERE email = $1 AND password = $2;",
    [data[0], data[1]]
  );

  return new Response(res.rowCount > 0, { status: 200 });
}
