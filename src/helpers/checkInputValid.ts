import { validateEmail } from "utils/validateEmail";

export const checkInputValid = (
  type?: string,
  value?: string | number | readonly string[]
) => {
  const stringifyValue = String(value);
  if (!type || !value) return false;
  if (type === "text") {
    return stringifyValue.length >= 3 && stringifyValue.length < 30;
  } else if (type === "email") {
    return validateEmail(stringifyValue);
  } else {
    return false;
  }
};
