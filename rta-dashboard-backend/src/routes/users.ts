import express, { Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { User } from '../models';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
    try {
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        const users = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post(
    '/add',
    authenticate,
    body('email').exists().withMessage('Email is required'),
    body('password').exists().withMessage('Password must be provided'),
    body('role').isIn(['ADMIN', 'USER']).withMessage('Role must be ADMIN or USER'),
    body('department').isIn(['PTA', 'HR']).withMessage('Department must be PTA or HR'),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = req.user;
        if (!user || user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        const { email, password, role, department } = req.body;

        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                email,
                password: hashedPassword,
                role,
                department,
            });

            res.status(201).json({
                message: 'User created successfully',
                user: newUser.get({ plain: true }),
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

router.post('/update/:id', authenticate, async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Unauthorized access' });
    }

    const userId = parseInt(req.params.id, 10);
    const { email, role, department, password } = req.body;

    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const userToUpdate = await User.findOne({ where: { id: userId } });
        if (!userToUpdate) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            userToUpdate.password = hashedPassword;
        }

        userToUpdate.email = email || userToUpdate.email;
        userToUpdate.role = role || userToUpdate.role;
        userToUpdate.department = department || userToUpdate.department;

        await userToUpdate.save();

        res.status(200).json({
            message: 'User updated successfully',
            user: userToUpdate.get({ plain: true }),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/delete/:id', authenticate, async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Unauthorized access' });
    }

    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const userToDelete = await User.findByPk(userId)
        if (!userToDelete) {
            return res.status(404).json({ error: 'User not found' });
        }

        await userToDelete.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;