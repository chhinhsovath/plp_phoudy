export declare class CryptoUtil {
    private static deriveKey;
    static encrypt(text: string): Promise<string>;
    static decrypt(encryptedText: string): Promise<string>;
}
