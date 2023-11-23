"use server";

import { cookies } from "next/headers";
import { getId, getUser } from "@app/utils/db-actions/user";

export default async function get() {
  return await getUser(await getId(cookies().get("device_id").value));
}
