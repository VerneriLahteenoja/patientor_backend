import data from "../data/patients";
import { PatientNoSsn } from "../types";

const patients: PatientNoSsn[] = data;

export const getPatients = (): PatientNoSsn[] => {
    return patients;
};