import { IOUtils } from '@discoursegroup/commons-js';
import { RRPayload, Transformer } from '@discoursegroup/relayrabbit-commons-js';

/**
 * This transformer is used to convert a JSON object to an array buffer.
 */
export class JsonToArraybufferTransformer implements Transformer {
  constructor() {
    // no op
  }

  async initialize(): Promise<void> {
    return Promise.resolve(undefined);
  }

  getIdentifier(): string {
    return 'rr_ab_json';
  }

  getVersion(): number {
    return 1;
  }

  async encode(message: RRPayload): Promise<RRPayload> {
    return new RRPayload(
      IOUtils.jsonToArrayBuffer(message.payload as Record<string, unknown>)
    );
  }

  async decode(message: RRPayload): Promise<RRPayload> {
    return new RRPayload(
      IOUtils.arrayBufferToJson(message.payload as ArrayBuffer)
    );
  }
}
