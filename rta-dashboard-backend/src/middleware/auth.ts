import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { secret } from '../utils/jwt';

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            res.status(401).json({ error: 'Access token is missing' });
            return;
        }

        const decoded = jwt.verify(token, secret);

        if (typeof decoded !== 'object' || !('email' in decoded)) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }

        const user = await User.findOne({ where: { email: (decoded as any).email } });
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

export { authenticate };