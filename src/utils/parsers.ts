import { Gender, NewPatient, Diagnosis, BaseEntryNoId, NewEntryNoId } from "../types";
import { isString, isNumber, isDate, isGender, isHealthCheckRating } from './validators';

// Patient parsers
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};
const parseSsn = (ssn: unknown): string => {
  // Could create a ssn specific validator if needed
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

// Entry parsers
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseEntryDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseEntrySpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (!healthCheckRating || !isNumber(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return healthCheckRating;
}

export const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};


export const toNewEntry = (object: unknown): NewEntryNoId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {

    const baseNewEntry: BaseEntryNoId = {
      description: parseEntryDescription(object.description),
      date: parseDate(object.date),
      specialist: parseEntrySpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object)
    };

    switch (object.type) {
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          return  {
            ...baseNewEntry,
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
        }
        throw new Error('Missing healthCheckRating for HealthCheckEntry');
      case 'OccupationalHealthcare':
        if ('employerName' in object && 'sickLeave' in object) {
          return {
            ...baseNewEntry,
            type: 'OccupationalHealthcare',
            employerName: parseEmployerName(object.employerName), //TODO: Implement this parser
            sickLeave: parseSickLeave(object.sickLeave) //TODO: Implement this parser
          };
        }
        throw new Error('Incorrect data: Missing fields emplyerName and/or sickLeave');
      case 'Hospital':
        return {
          ...baseNewEntry,
          type: 'Hospital',
          discharge: parseDischarge(object.discharge) //TODO: Implement this parser
        };
      default:
        throw new Error(`Incorrect or missing entry type ${object.type}`);
    }
  }
  throw new Error('Incorrect data: some fields are missing');
};