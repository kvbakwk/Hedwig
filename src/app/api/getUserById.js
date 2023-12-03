"use server";

import { getUser } from "@app/utils/db-actions/user";

export default async function getUserByIdAPI(user_id) {
  return await getUser(user_id);
}
