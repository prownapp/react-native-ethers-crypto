import { NativeModules, Platform } from 'react-native';
import type { Spec } from './NativeEthersCrypto';
import { Buffer } from '@craftzdog/react-native-buffer';

const LINKING_ERROR =
  `The package 'react-native-ethers-crypto' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const EthersCryptoModule = isTurboModuleEnabled
  ? require('./NativeEthersCrypto').default
  : NativeModules.EthersCrypto;

const EthersCrypto: Omit<Spec, 'getConstants'> = EthersCryptoModule
  ? EthersCryptoModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export type HexString = string;
export type BytesLike = HexString | Uint8Array;

function bytesToHexString(data: BytesLike): string {
  return typeof data === 'string' ? data : Buffer.from(data).toString('hex');
}

function hexStringToByteArray(hexString: string) {
  return Uint8Array.from(
    (hexString.startsWith('0x') ? hexString.substring(2) : hexString)
      .match(/.{1,2}/g)
      ?.map((byte) => parseInt(byte, 16)) || []
  );
}

export function keccak256(data: BytesLike): string {
  return EthersCrypto.keccak256(bytesToHexString(data));
}

export function ripemd160(data: BytesLike): string {
  return EthersCrypto.ripemd160(bytesToHexString(data));
}

export function sha256(data: BytesLike): string {
  return EthersCrypto.sha256(bytesToHexString(data));
}

export function sha512(data: BytesLike): string {
  return EthersCrypto.sha512(bytesToHexString(data));
}

export function computeHmac(
  algo: 'sha256' | 'sha512',
  keyHexString: BytesLike,
  dataHexString: BytesLike
): string {
  return EthersCrypto.computeHmac(
    algo,
    bytesToHexString(keyHexString),
    bytesToHexString(dataHexString)
  );
}

export function pbkdf2(
  password: BytesLike,
  salt: BytesLike,
  iterations: number,
  keylen: number,
  algo: 'sha256' | 'sha512'
): string {
  return EthersCrypto.pbkdf2(
    bytesToHexString(password),
    bytesToHexString(salt),
    iterations,
    keylen,
    algo
  );
}

export function scrypt(
  password: BytesLike,
  salt: BytesLike,
  N: number,
  r: number,
  p: number,
  dkLen: number
): Promise<string> {
  return EthersCrypto.scrypt(
    bytesToHexString(password),
    bytesToHexString(salt),
    N,
    r,
    p,
    dkLen
  );
}

export function randomBytes(length: number): Uint8Array {
  return hexStringToByteArray(EthersCrypto.randomBytes(length));
}
