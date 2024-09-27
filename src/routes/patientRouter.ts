import express from "express";

import { addPatient, getPatients, getPatientById, addEntry } from "../services/patientsService";
import { toNewPatientEntry, toNewEntry } from "../utils/parsers";

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('Fetching patients');
  return res.status(200).json(getPatients());
});

router.get('/:id', (req, res) => {
  const foundPatient = getPatientById(req.params.id);
  if (!foundPatient) {
    return res.json(400).json({ error: 'No patient with given id exists' });
  }
  return res.status(200).json(foundPatient);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = addPatient(newPatientEntry);
    return res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let errorMsg = 'Error: ';
    if (error instanceof Error) {
      errorMsg += error.message;
    }
    return res.status(400).send(errorMsg);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = getPatientById(req.params.id);
  if (!patient) {
    return res.json(400).json({ error: 'No patient with given id exists' });
  }
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = addEntry(req.params.id, newEntry);
    return res.status(201).json(addedEntry);
  } catch (error: unknown) {
    let errorMsg = 'Error ';
    if (error instanceof Error) {
      errorMsg += error.message;
    }
    return res.status(400).send(errorMsg);
  }
});


export default router;