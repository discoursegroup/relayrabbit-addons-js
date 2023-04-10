import * as crypto from 'crypto';

export class CryptoUtils {
  public static md5Digest(data: string): string {
    return crypto.createHash('md5').update(data).digest('hex');
  }
}
