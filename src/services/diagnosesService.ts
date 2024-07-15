import data from "../data/diagnoses";
import { Diagnoses } from "../types";

const diagnoses: Diagnoses[] = data;

export const getDiagnoses = (): Diagnoses[] => {
    return diagnoses;
};