import express from 'express';
import { authenticate } from '../middleware/auth';
import { Metric } from '../models';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {
        const userRole = req.user?.role;
        const userDepartment = req.user?.department; 

        if (!userDepartment && userRole !== 'ADMIN') {
            return res.status(400).json({ error: 'error' });
        }

        const metrics = await Metric.findAll({
            where: userRole === 'ADMIN' ? {} : { department: userDepartment }, 
        });

        res.json(metrics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching metrics' });
    }
});

router.post('/add', authenticate, async (req, res) => {
    try {
        const userRole = req.user?.role;

        if (userRole !== 'ADMIN') {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const { name, department, description } = req.body;

        if (!name || !department || !description) {
            return res.status(400).json({ error: 'fields required' });
        }

        const newMetric = await Metric.create({
            name,
            department,
            description,
        });

        res.status(201).json(newMetric);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the metric' });
    }
});

export default router;