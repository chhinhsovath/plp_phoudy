"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoUtil = void 0;
const crypto_1 = require("crypto");
const util_1 = require("util");
const algorithm = 'aes-256-ctr';
const secretKey = process.env.CRYPTO_SECRET_KEY || 'plp-edtech-secret-key-32-chars!!';
class CryptoUtil {
    static async deriveKey(password, salt) {
        const scryptAsync = (0, util_1.promisify)(crypto_1.scrypt);
        return (await scryptAsync(password, salt, 32));
    }
    static async encrypt(text) {
        if (!text)
            return text;
        const salt = (0, crypto_1.randomBytes)(16);
        const key = await this.deriveKey(secretKey, salt);
        const iv = (0, crypto_1.randomBytes)(16);
        const cipher = (0, crypto_1.createCipheriv)(algorithm, key, iv);
        const encrypted = Buffer.concat([
            cipher.update(text, 'utf8'),
            cipher.final(),
        ]);
        return (salt.toString('hex') +
            ':' +
            iv.toString('hex') +
            ':' +
            encrypted.toString('hex'));
    }
    static async decrypt(encryptedText) {
        if (!encryptedText || !encryptedText.includes(':'))
            return encryptedText;
        try {
            const [saltHex, ivHex, encryptedHex] = encryptedText.split(':');
            const salt = Buffer.from(saltHex, 'hex');
            const iv = Buffer.from(ivHex, 'hex');
            const encrypted = Buffer.from(encryptedHex, 'hex');
            const key = await this.deriveKey(secretKey, salt);
            const decipher = (0, crypto_1.createDecipheriv)(algorithm, key, iv);
            const decrypted = Buffer.concat([
                decipher.update(encrypted),
                decipher.final(),
            ]);
            return decrypted.toString('utf8');
        }
        catch (error) {
            console.error('Decryption error:', error);
            return encryptedText;
        }
    }
}
exports.CryptoUtil = CryptoUtil;
//# sourceMappingURL=crypto.util.js.map