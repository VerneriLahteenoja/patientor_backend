import express from 'express';
import cors from 'cors';

import pingRouter from './src/routes/pingRouter'

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/ping', pingRouter);


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});