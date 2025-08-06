import { webcrypto } from 'crypto';

// Polyfill for crypto.randomUUID
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as Crypto;
}
