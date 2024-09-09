import { Gender, HealthCheckRating } from "../types";

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number;
};

export const isObject = (object: unknown): object is object => {
  return typeof object === 'object' || object instanceof Object;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

export const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(Number(rating));
};
