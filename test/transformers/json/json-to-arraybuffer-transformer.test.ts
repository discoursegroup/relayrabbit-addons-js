import { JsonToArraybufferTransformer } from '../../../src'
import { RRPayload } from '@discoursegroup/relayrabbit-commons-js';

const interceptor = new JsonToArraybufferTransformer()

const message = {
  'id': '1',
  'method': 'test',
  'params': {
    'a': 'b',
    'c': 'd'
  }
}

const plainBuffer = new RRPayload(message)
const encodedBuffer = new RRPayload(new Int8Array([123,34,105,100,34,58,34,49,34,44,34,109,101,116,104,111,100,34,58,34,116,101,115,116,34,44,34,112,97,114,97,109,115,34,58,123,34,97,34,58,34,98,34,44,34,99,34,58,34,100,34,125,125]).buffer)

describe('Encode/Decode JSON to ArrayBuffer', () => {
  it('json to arraybuffer works', () => {
    expect.assertions(1);
    interceptor.encode(plainBuffer).then(encoded => {
      expect(encoded.payload).toEqual(encodedBuffer.payload)
    })
  })

  it('arraybuffer to json works', () => {
    expect.assertions(1);
    interceptor.decode(encodedBuffer).then(decoded => {
      expect(decoded.payload).toEqual(plainBuffer.payload)
    })
  })
})
