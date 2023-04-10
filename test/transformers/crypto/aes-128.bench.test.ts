import { TextEncoder, TextDecoder } from 'util';
import { BenchRunner } from '@discoursegroup/commons-test-js';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const crypto = require('crypto');

Object.defineProperty(window, 'crypto', {
  value: {
    getRandomValues: function(buffer: ArrayBuffer) {
      return crypto.randomFillSync(buffer);
    },
    subtle: crypto.webcrypto.subtle
  }
});

import { Aes128 } from '../../../src/transformers/crypto/aes-128';
import { IOUtils } from '@discoursegroup/commons-js';

const plainText = IOUtils.stringToArrayBuffer('test string');
const cipherText = new Uint8Array([12, 202, 158, 146, 68, 16, 91, 122, 29, 190, 209, 66, 40, 0, 198, 45, 79, 179, 65, 106, 172, 15, 255, 249, 35, 98, 109, 78, 116, 18, 158, 91, 75, 186, 10, 202, 121, 72, 83, 48]).buffer;
const testKey = '770A8A65DA156D24';

const instance1 = new Aes128(testKey);
const instance2 = new Aes128(testKey);

BenchRunner.benchmarkAsync(
  'AES128 encrypt performance',
  async () => {
    await instance1.encode(plainText);
  },
  async () => {
    await instance1.initialize();
  },
  undefined,
  10_000
);

BenchRunner.benchmarkAsync(
  'AES128 decrypt performance',
  async () => {
    await instance2.decode(cipherText);
  },
  async () => {
    await instance2.initialize();
  },
  undefined,
  10_000
);
