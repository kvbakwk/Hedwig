"use server";

import {
  changePassword,
  validateUserPassword,
} from "@app/utils/db-actions/user";
import { validatePassword, validatePasswords } from "@app/utils/validator";

interface changePasswordAPIResponse {
  change: boolean;
  oldPasswordErr: boolean;
  newPasswordErr: boolean;
  newPasswordValidErr: boolean;
  samePasswordErr: boolean;
}

export default async function changePasswordAPI(
  user_id: number,
  oldPassword: string,
  newPassword: string,
  newPasswordValid: string
): Promise<changePasswordAPIResponse> {
  const isValid: boolean =
    (await validateUserPassword(user_id, oldPassword)) &&
    validatePassword(newPassword) &&
    validatePasswords(newPassword, newPasswordValid) &&
    !validatePasswords(oldPassword, newPassword);

  if (isValid) await changePassword(user_id, newPassword);

  return {
    change: isValid,
    oldPasswordErr: !(await validateUserPassword(user_id, oldPassword)),
    newPasswordErr: !validatePassword(newPassword),
    newPasswordValidErr: !validatePasswords(newPassword, newPasswordValid),
    samePasswordErr: validatePasswords(oldPassword, newPassword),
  };
}
