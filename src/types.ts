export type Diagnoses = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type PatientNoSsn = Omit<Patient, "ssn">;
export type NewPatient = Omit<Patient, "id">;