import { Pool } from "pg";

export async function getUser(user_id) {
  const client = new Pool();
  const user = (
    await client.query(
      "SELECT id, email, firstname, lastname FROM public.user WHERE id = $1;",
      [user_id]
    )
  ).rows[0];
  await client.end();
  return user ? user : false;
}

export async function getUserIdByDeviceId(device_id) {
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

export async function validateUserPassword(user_id, password) {
  const client = new Pool();
  const res = (
    await client.query(
      "SELECT id FROM public.user WHERE id = $1 AND password = $2;",
      [user_id, password]
    )
  ).rowCount;
  await client.end();
  return res === 1;
}

export async function changePassword(user_id, password) {
  const client = new Pool();
  await client.query("UPDATE public.user SET password = $1 WHERE id = $2;", [
    password,
    user_id,
  ]);
  await client.end();
}
