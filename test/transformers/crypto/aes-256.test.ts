/**
 * @jest-environment jsdom
 */
import {TextEncoder, TextDecoder} from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
    value: {
        getRandomValues: function (buffer: ArrayBuffer) {
            return crypto.randomFillSync(buffer);
        },
        subtle: crypto.webcrypto.subtle,
    }
});

import { Aes256 } from '../../../src/transformers/crypto/aes-256';
import { IOUtils } from '@discoursegroup/commons-js';

const plainText = IOUtils.stringToArrayBuffer('test string');
const cipherText = new Uint8Array([12, 181, 90, 28, 142, 23, 143, 225, 202, 254, 126, 12, 97, 215, 145, 182, 50, 206, 49, 33, 35, 132, 214, 24, 112, 39, 108, 76, 143, 88, 170, 132, 156, 94, 56, 251, 123, 222, 181, 149]).buffer;
const testKey = "770A8A65DA156D24EE2A093277530142";

describe('AES 256 shared instance', () => {
    test('plaintext to ciphertext', async () => {
        const instance1 = new Aes256(testKey);
        await instance1.initialize();
        const out = await instance1.encode(plainText);
        expect(out).toEqual(cipherText);
    });
    test('ciphertext to plaintext', async () => {
        const instance1 = new Aes256(testKey);
        await instance1.initialize();
        const out = await instance1.decode(cipherText);
        expect(out).toEqual(plainText);
    });
});

describe('AES 256 different instance', () => {
    test('plaintext to ciphertext', async () => {
        const instance1 = new Aes256(testKey);
        await instance1.initialize();
        const instance2 = new Aes256(testKey);
        await instance2.initialize();
        const out = await instance1.encode(plainText);
        expect(out).toEqual(cipherText);
    });
    test('ciphertext to plaintext', async () => {
        const instance1 = new Aes256(testKey);
        await instance1.initialize();
        const instance2 = new Aes256(testKey);
        await instance2.initialize();
        const out = await instance2.decode(cipherText);
        expect(out).toEqual(plainText);
    });
});