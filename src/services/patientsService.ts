import { v1 as uuid } from 'uuid';

import data from "../data/patientData";
import { Entry, NewEntry, NewPatient, Patient, PatientNoSsn } from "../types";

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

export const addEntry = (id: string, entry: NewEntry) => {
  const patient = getPatientById(id);
  if (!patient) {
    throw new Error('No patient with given id exists');
  }
  const entryId: string = uuid();
  const newEntry: Entry = { ...entry, id: entryId };
  patient.entries = patient.entries ? patient.entries.concat(newEntry) : [newEntry];
  return patient;
};