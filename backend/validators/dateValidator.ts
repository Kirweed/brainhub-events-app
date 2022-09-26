export const dateValidator = (date: unknown) => {
  if (!(date instanceof Date)) return;

  const timestamp = date.getTime();
  if (typeof timestamp !== "number" || Number.isNaN(timestamp)) return false;

  return true;
};
