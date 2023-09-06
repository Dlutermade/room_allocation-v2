export const capitalize = <T extends string = string>(
  str: T
): Capitalize<T> => {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
};
