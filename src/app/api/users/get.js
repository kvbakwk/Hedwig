'use server'

import { Pool } from "pg";

import { cookies } from "next/headers";

export default async function get() {
  const client = new Pool();
  const id = await client.query(
    "SELECT user_id FROM users_devices WHERE device_id = $1;", [cookies().get('device_id').value]
  );
  const user = await client.query(
    "SELECT id, email, firstname, lastname FROM users WHERE id = $1;", [id.rows[0].user_id]
  );
  await client.end();
  return user.rows[0];
}