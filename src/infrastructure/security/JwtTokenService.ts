import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtService } from '../../domain/services/JwtService';


export class JwtTokenService implements JwtService {
constructor(
    private readonly secretKey: string,
    private readonly expiresIn: SignOptions["expiresIn"]
  ) {}
    generateToken(payload: object, expiresIn?: SignOptions["expiresIn"]): string {
        const token = jwt.sign(payload, this.secretKey, { expiresIn: expiresIn || this.expiresIn });
        return token;
    }

    verifyToken(token: string): object | null {
        try {
            const decoded = jwt.verify(token, this.secretKey);
            return decoded as object;
        } catch (error) {
            return null;
        }
    }
}