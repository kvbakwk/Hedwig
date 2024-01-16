"use server";

import { cookies } from "next/headers";
import {
  getUser,
  getUserIdByDeviceId as getId,
} from "@app/utils/db-actions/user";

export default async function getUserAPI() {
  return await getUser(await getId(cookies().get("device_id").value));
}
