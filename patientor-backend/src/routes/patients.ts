import express from 'express';
import patientService from './../services/patientService';
import { toNewPatientEntry, toNewDiagnosisEntry } from './../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(patientService.findById(id));
});

router.post('/:id/entries', (req, res) => {
  const { id } = req.params;
  const addedEntry = patientService.addDiagnosisEntry(id, toNewDiagnosisEntry(req.body));
  res.json(addedEntry);
});


router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatientEntry = toNewPatientEntry(req.body);
  const addedEntry = patientService.addPatient(newPatientEntry);
  res.json(addedEntry);
});

export default router;

