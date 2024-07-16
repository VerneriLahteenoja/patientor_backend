import express from "express";

import { getPatients } from "../services/patientsService";

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching patients');
    return res.status(200).json(getPatients());
});

router.post('/', (_req, _res): void => {
    //TODO: Call addPerson from patientService
    // add functionality when other modules and functions are created
    console.log('post request received to /api/patients');
});

export default router;