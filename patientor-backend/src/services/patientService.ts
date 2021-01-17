import patients from '../../data/patients';
import { NonSensitivePatientEntry, PublicPatient, Patient, NewPatientEntry, NewDiagnosisEntry, Entry } from '../types';
import { v4 } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): PublicPatient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: v4(),
    ...entry
  };
  
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addDiagnosisEntry = (patientId: string, entry: NewDiagnosisEntry): Entry => {
  const newEntry = {
    ...entry,
    id: v4()
  };

  const patient = patients.find(p => p.id === patientId);
  if(patient) {
    patient.entries.push(newEntry);
    return newEntry;
  }
  throw new Error(`Patient not found with id ${patientId}`);
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient,
  addDiagnosisEntry
};

