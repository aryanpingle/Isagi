export function toCSSMeasurement(value?: number | string) {
  if (value === undefined || value === null) {
    return "0px";
  }
  if (typeof value === "number") return `${value}px`;
  else return value;
}

export function composeClasses(classes: any[]) {
  return classes
    .filter((c) => c)
    .map((c) => String(c))
    .join(" ");
}
