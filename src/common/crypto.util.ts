import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const algorithm = 'aes-256-ctr';
const secretKey =
  process.env.CRYPTO_SECRET_KEY || 'plp-edtech-secret-key-32-chars!!';

export class CryptoUtil {
  private static async deriveKey(
    password: string,
    salt: Buffer,
  ): Promise<Buffer> {
    const scryptAsync = promisify(scrypt);
    return (await scryptAsync(password, salt, 32)) as Buffer;
  }

  static async encrypt(text: string): Promise<string> {
    if (!text) return text;

    const salt = randomBytes(16);
    const key = await this.deriveKey(secretKey, salt);
    const iv = randomBytes(16);

    const cipher = createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ]);

    return (
      salt.toString('hex') +
      ':' +
      iv.toString('hex') +
      ':' +
      encrypted.toString('hex')
    );
  }

  static async decrypt(encryptedText: string): Promise<string> {
    if (!encryptedText || !encryptedText.includes(':')) return encryptedText;

    try {
      const [saltHex, ivHex, encryptedHex] = encryptedText.split(':');

      const salt = Buffer.from(saltHex, 'hex');
      const iv = Buffer.from(ivHex, 'hex');
      const encrypted = Buffer.from(encryptedHex, 'hex');

      const key = await this.deriveKey(secretKey, salt);

      const decipher = createDecipheriv(algorithm, key, iv);
      const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
      ]);

      return decrypted.toString('utf8');
    } catch (error) {
      console.error('Decryption error:', error);
      return encryptedText;
    }
  }
}
