import { Gender, NewPatient, Diagnosis, BaseEntryNoId, NewEntryNoId, SickLeave, Discharge } from "../types";
import { isString, isNumber, isDate, isGender, isHealthCheckRating, isObject } from './validators';

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
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  // Could move some of this into a sickLeave validator
  // Check if object, has required fields, and if those fields are strings and dates
  if (!sickLeave || !isObject(sickLeave) || 
    !('startDate' in sickLeave) || 
    !('endDate' in sickLeave) ||
    typeof sickLeave.startDate !== 'string' ||
    typeof sickLeave.endDate !== 'string' ||
    !isDate(sickLeave.startDate) ||
    !isDate(sickLeave.endDate)) {
    
    throw new Error('Incorrect or missing sick leave');
  }
  return sickLeave as SickLeave;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isObject(discharge) ||
    (!('date' in discharge)) ||
    (!('criteria' in discharge)) ||
    typeof discharge.date !== 'string' ||
    typeof discharge.criteria !== 'string' ||
    !isDate(discharge.date)) {
    throw new Error('Incorrect or missing discharge');
    }
  return discharge as Discharge;
};

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
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
          };
        }
        throw new Error('Incorrect or missing emplyerName and/or sickLeave');
      case 'Hospital':
        if ('discharge' in object) {
          return {
            ...baseNewEntry,
            type: 'Hospital',
            discharge: parseDischarge(object.discharge)
          };
        }
        throw new Error('Incorrect or missing discharge');
      default:
        throw new Error(`Incorrect or missing entry type ${object.type}`);
    }
  }
  throw new Error('Incorrect data: some fields are missing');
};