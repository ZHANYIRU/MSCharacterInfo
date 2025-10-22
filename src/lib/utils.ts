import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPowerValue(value: string | number): string {
  const num = typeof value === "string" ? parseInt(value) : value;
  if (isNaN(num)) return "0";

  const yi = Math.floor(num / 100000000);
  const wan = Math.floor((num % 100000000) / 10000);
  const remainder = num % 10000;

  let result = "";
  if (yi > 0) result += `${yi}億`;
  if (wan > 0) result += `${wan}萬`;
  if (remainder > 0) result += `${remainder}`;

  return result || "0";
}
