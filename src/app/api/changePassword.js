"use server";

import {
  changePassword,
  validateUserPassword,
} from "@app/utils/db-actions/user";
import { validatePassword, validatePasswords } from "@app/utils/validator";

export default async function changePasswordAPI(
  user_id,
  oldPassword,
  newPassword,
  newPasswordValid
) {
  const isValid =
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
