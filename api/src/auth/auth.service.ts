import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';

const SECRET = process.env.TOKEN_SECRET || 'my_super_secret';

@Injectable()
export class AuthService {
  generateToken(login: string): string {
    const payload = JSON.stringify({ login, ts: Date.now() });
    const signature = createHmac('sha256', SECRET)
      .update(payload)
      .digest('hex');
    return Buffer.from(payload).toString('base64') + '.' + signature;
  }

  validateToken(token: string): { login: string } | null {
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;
    const payload = Buffer.from(payloadB64, 'base64').toString();
    const expectedSignature = createHmac('sha256', SECRET)
      .update(payload)
      .digest('hex');
    if (signature !== expectedSignature) return null;
    return JSON.parse(payload);
  }
}
