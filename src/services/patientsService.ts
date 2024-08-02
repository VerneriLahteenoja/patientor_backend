import { v1 as uuid } from 'uuid';

import data from "../data/patientData";
import { NewPatient, Patient, PatientNoSsn } from "../types";

const patients: PatientNoSsn[] = data;

export const getPatients = (): PatientNoSsn[] => {
  return patients;
};

export const getPatientById = (id: string) => {
  const patientToFind = data.find(patient => patient.id === id);
  console.log(patientToFind);
  return patientToFind;
};

export const addPatient = (newPatient: NewPatient): Patient => {
  // Mock version
  // Does not save new patient anywhere
  const id: string = uuid();
  const addedPatient: Patient = { ...newPatient, id: id };
  return addedPatient;
};