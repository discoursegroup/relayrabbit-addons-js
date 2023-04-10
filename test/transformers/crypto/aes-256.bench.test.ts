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

import { Aes256 } from '../../../src/transformers/crypto/aes-256';
import { IOUtils } from '@discoursegroup/commons-js';

const plainText = IOUtils.stringToArrayBuffer('test string');
const cipherText = new Uint8Array([12, 181, 90, 28, 142, 23, 143, 225, 202, 254, 126, 12, 97, 215, 145, 182, 50, 206, 49, 33, 35, 132, 214, 24, 112, 39, 108, 76, 143, 88, 170, 132, 156, 94, 56, 251, 123, 222, 181, 149]).buffer;
const testKey = "770A8A65DA156D24EE2A093277530142";

const instance1 = new Aes256(testKey);
const instance2 = new Aes256(testKey);

BenchRunner.benchmarkAsync(
  'AES256 encrypt performance',
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
  'AES256 decrypt performance',
  async () => {
    await instance2.decode(cipherText);
  },
  async () => {
    await instance2.initialize();
  },
  undefined,
  10_000
);
