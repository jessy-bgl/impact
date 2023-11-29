export type StringifyProperties<T> = {
  [K in keyof T]: string;
};

export const convertStringToType = (
  value: string,
  targetType: unknown,
): any => {
  if (targetType === "string") {
    return value;
  } else if (targetType === "number") {
    return Number(value);
  } else if (targetType === "boolean") {
    return value === "true";
  } else if (targetType === "object") {
    return JSON.parse(value);
  }

  throw new Error("Unsupported targetType");
};
