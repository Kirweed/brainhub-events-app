import { isEmailValid } from "utils/isEmailValid";
import { isTextInputValid } from "utils/isTextInputValid";

export const checkInputValid = (
  type?: string,
  value?: string | number | readonly string[]
) => {
  const stringifyValue = String(value);
  if (!type || !value) return false;
  if (type === "text") {
    return isTextInputValid(stringifyValue);
  } else if (type === "email") {
    return isEmailValid(stringifyValue);
  } else {
    return false;
  }
};
