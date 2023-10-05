import type { BytesLike } from './types';
import { Buffer } from '@craftzdog/react-native-buffer';

export function bytesToHexString(data: BytesLike): string {
  return typeof data === 'string' ? data : Buffer.from(data).toString('hex');
}

export function hexStringToByteArray(hexString: string) {
  return Uint8Array.from(
    (hexString.startsWith('0x') ? hexString.substring(2) : hexString)
      .match(/.{1,2}/g)
      ?.map((byte) => parseInt(byte, 16)) || []
  );
}
