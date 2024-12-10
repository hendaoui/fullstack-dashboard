import jwt from 'jsonwebtoken';

export const secret = 'rta_dashboard';

interface TokenPayload {
    email: string;
    role: 'ADMIN' | 'USER';
    department: 'PTA' | 'HR';
}

export const generateToken = (payload: TokenPayload) => jwt.sign(payload, secret, { expiresIn: '24h' });
export const verifyToken = (token: string) => jwt.verify(token, secret);