import data from "../data/patients";
import { PatientNoSsn } from "../types";

const patients: PatientNoSsn[] = data;

export const getPatients = (): PatientNoSsn[] => {
    return patients;
};

export const addPatient = (): void => {
    //TODO: handle parsing, validation and type predicates
    // functions to handle are to be created in a separate module and service
    console.log('addPatient called...');
};