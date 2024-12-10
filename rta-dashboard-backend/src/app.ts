import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';
import metricRoutes from './routes/metrics';
import dataEntryRoutes from './routes/dataEntries';
import usersRoutes from './routes/users';

dotenv.config();
const app = express();

// Configure CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// Define routes
app.use('/auth', authRoutes);
app.use('/metrics', metricRoutes);
app.use('/metrics/:id/data-entries', dataEntryRoutes);
app.use('/users', usersRoutes);

export default app;