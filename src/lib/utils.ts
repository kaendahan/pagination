/* eslint-disable @typescript-eslint/no-unused-vars */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const classNames = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const sizeIcon = {
  sm: 14,
  md: 16,
  lg: 24,
};

const isInteger = (v: number) => {
  const value = Number(v);
  return (
    typeof value === "number" &&
    !Number.isNaN(value) &&
    isFinite(value) &&
    Math.floor(value) === value
  );
};

const calculatePage = (
  p: number | undefined,
  pageSize: number,
  total: number
) => {
  const _pageSize = typeof p === "undefined" ? pageSize : p;
  return Math.floor((total - 1) / _pageSize) + 1;
};

const noop = (...args : any) => {};

export { isInteger, calculatePage, classNames, sizeIcon, noop };
