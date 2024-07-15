import express from 'express';
import cors from 'cors';

import pingRouter from './src/routes/pingRouter';
import diagnosesRouter from './src/routes/diagnosesRouter';


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/ping', pingRouter);

app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});