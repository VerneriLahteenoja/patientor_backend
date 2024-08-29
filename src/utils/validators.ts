import { Entry, Gender } from "../types";

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

export const isEntry = (entry: unknown): entry is Entry => {
  return Object.values(Entry).map(e => e.toString()).includes(entry);
}