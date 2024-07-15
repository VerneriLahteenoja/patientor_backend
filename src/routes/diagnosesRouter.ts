import express from "express";

import { getDiagnoses } from "../services/diagnosesService";

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching diagnoses...');
    return res.status(200).json(getDiagnoses());
});

export default router;