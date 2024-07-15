import express from "express";

import { getPatients } from "../services/patientsService";

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching patients');
    return res.status(200).json(getPatients());
});

export default router;