import { Aes256 } from '@discoursegroup/commons-js';
import { RRPayload, Transformer } from '@discoursegroup/relayrabbit-commons-js';

/**
 * This transformer is used to encrypt an array buffer using AES 256.
 * It is used to encrypt the payload within the pipe call chain.
 */
export class ArrayBufferToEncryptAes256Transformer implements Transformer {
  private aesInstance: Aes256;

  /**
   * Constructor takes the key to be used for encryption.
   * The key is used to initialize the AES 256 instance. It is not stored or retained by the code in any way.
   * The key is not shared with the remote service or any other party.
   * @param {string} key - to be exactly 256 bits long.
   */
  constructor(key: string) {
    this.aesInstance = new Aes256(key);
  }

  async initialize(): Promise<void> {
    await this.aesInstance.initialize();
  }

  getIdentifier(): string {
    return 'rr_ab_aes_256';
  }

  getVersion(): number {
    return 1;
  }

  async encode(payload: RRPayload): Promise<RRPayload> {
    const message = payload.payload as ArrayBuffer;
    return new RRPayload(await this.aesInstance.encode(message));
  }

  async decode(payload: RRPayload): Promise<RRPayload> {
    const message = payload.payload as ArrayBuffer;
    return new RRPayload(await this.aesInstance.decode(message));
  }
}
