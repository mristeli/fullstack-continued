/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, HealthCheckRating, NewDiagnosisEntry, VisitType } from './types';

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString('name', object.name),
    dateOfBirth: parseDate('dateOfBirth', object.dateOfBirth),
    ssn: parseString('ssn', object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString('occupation', object.occupation),
    entries: []
  };
  return newEntry;
};

export const toNewDiagnosisEntry = (object: any): NewDiagnosisEntry => {
  const newEntry = {
    description: parseString('desciption', object.description),
    date: parseDate('date', object.date), 
    specialist: parseString('specialist', object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes), 
  };
  
  const type = parseVisitType(object.type);
  switch (type) {
    case "HealthCheck":
      return {
        ...newEntry,
        type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case "Hospital":
      return {
        ...newEntry,
        type,
        discharge: parseDischarge(object.discharge)
      };
    case "OccupationalHealthcare":
      return {
        ...newEntry,
        type,
        employerName: parseString('employerName', object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
  }
};

const parseSickLeave = (value: any): { startDate: string, endDate: string } | undefined => {
  if(!value) return undefined;
  if(!value.startDate || !value.endDate) {
    throw new Error('Incorrect or missing sick leave: ' + value);
  }
  return {
    startDate: parseDate('sickLeave.startDate', value.startDate), 
    endDate: parseDate('sickLeave.endDate', value.endDate)
  };
};

const parseDischarge = (value: any): { date: string, criteria: string } => {
  if (!value || !value.date || !value.criteria) {
    throw new Error('Incorrect or missing discharge: ' + value);
  }
  return {
    date: parseDate('discharge.date', value.date),
    criteria: parseString('discharge.criteria', value.criteria) 
  };
};

const isHealthCheckRating = (value: any): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(value);
};

const parseHealthCheckRating = (value: any): HealthCheckRating => {
  if ((value !== 0 && !value) || !isHealthCheckRating(value)) {
    throw new Error('Incorrect or missing HealthCheckRating: ' + value);
  }
  return value;
};

const parseDiagnosisCodes = (value: any): Array<string> | undefined => {
  if (!value) return undefined;
  if (!Array.isArray(value) || !value.every(isString)) {
    throw new Error('Incorrect or missing diagnosis codes list: ' + value);
  }
  return value;
};

const isVisitType = (value: any): value is VisitType => {
  return ["HealthCheck", "Hospital", "OccupationalHealthcare"].includes(value);
};

const parseVisitType = (value: any): VisitType => {
  if (!value || !isVisitType(value)) {
    throw new Error('Incorrect or missing type: ' + value);
  }
  return value;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (attribute: string, value: any): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${attribute}: ` + value);
  }
  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (field: string, date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date ${field}: ` + date);
  }     
  return date;
};  

const isGender = (value: any): value is Gender => {
  return Object.values(Gender).includes(value);
};

const parseGender = (value: any): Gender => {
  if (!value || !isGender(value)) {
    throw new Error('Incorrect or missing gender: ' + value);
  }
  return value;
};

export const assertNever = (typeDescription: string, value: never): never => {
  throw new Error(
    `Unhandled ${typeDescription}: ${value}`
  );
};
