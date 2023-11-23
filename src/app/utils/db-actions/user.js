import { Pool } from "pg";

export async function getId(device_id) {
  const client = new Pool();
  const id = (
    await client.query(
      "SELECT user_id FROM public.user_device WHERE device_id = $1;",
      [device_id]
    )
  ).rows[0].user_id;
  await client.end();
  return id;
}

export async function getUser(user_id) {
  const client = new Pool();
  const user = (
    await client.query(
      "SELECT id, email, firstname, lastname FROM public.user WHERE id = $1;",
      [user_id]
    )
  ).rows[0];
  await client.end();
  return user;
}
