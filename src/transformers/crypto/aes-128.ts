import { Buffer } from 'buffer';
import { IOUtils } from '@discoursegroup/commons-js';

export class Aes128 {
  private cipherKey: CryptoKey;
  private readonly cryptoKeyPromise: Promise<CryptoKey>;

  constructor(key: string) {
    if (key.length !== 16) {
      throw new Error('Key must be 16 bytes long');
    }

    this.cryptoKeyPromise = window.crypto.subtle.importKey(
      'raw',
      IOUtils.stringToArrayBuffer(key),
      { name: 'AES-GCM', length: 128 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async initialize(): Promise<void> {
    this.cipherKey = await this.cryptoKeyPromise;
  }

  async encode(message: ArrayBuffer): Promise<ArrayBuffer> {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedBuffer = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        tagLength: 128,
        iv: iv,
      },
      this.cipherKey,
      message
    );
    const bufferLength = Buffer.alloc(1);
    bufferLength.writeUInt8(iv.length, 0);
    return IOUtils.toArrayBuffer(
      Buffer.concat([bufferLength, iv, new Uint8Array(encryptedBuffer)])
    );
  }

  async decode(message: ArrayBuffer): Promise<ArrayBuffer> {
    const buffer = new DataView(message);
    let offset = 0;
    const ivSize = buffer.getInt8(offset++);
    const iv = Buffer.from(message.slice(offset, offset + ivSize));
    offset += ivSize;
    return await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        tagLength: 128,
        iv: iv,
      },
      this.cipherKey,
      message.slice(offset)
    );
  }
}
