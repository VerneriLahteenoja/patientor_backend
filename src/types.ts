export type Diagnoses = {
    code: string;
    name: string;
    latin?: string;
};

export enum Gender {
    male = 'male',
    female = 'female'
};

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string; //TODO: Change this to enum Gender
    occupation: string;
};

export type PatientNoSsn = Omit<Patient, "ssn">;