export const nameValidator = (name: unknown) => {
  if (typeof name !== "string") return false;
  if (name.length < 3 || name.length > 30) return false;
  return true;
};
