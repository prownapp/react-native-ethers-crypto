import { NativeModules, Platform } from 'react-native';
import type { Spec } from './NativeEthersCrypto';
import type { BytesLike, EthersLike } from './types';
import { bytesToHexString, hexStringToByteArray } from './utils';

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

export function registerEthersHooks(ethers: EthersLike) {
  ethers.keccak256.register(keccak256);
  ethers.ripemd160.register(ripemd160);
  ethers.sha256.register(sha256);
  ethers.sha512.register(sha512);
  ethers.computeHmac.register(computeHmac);
  ethers.pbkdf2.register(pbkdf2);
  ethers.scrypt.register(scrypt);
  ethers.randomBytes.register(randomBytes);
}

export function unregisterEthersHooks(ethers: EthersLike) {
  ethers.keccak256.register(ethers.keccak256._);
  ethers.ripemd160.register(ethers.ripemd160._);
  ethers.sha256.register(ethers.sha256._);
  ethers.sha512.register(ethers.sha512._);
  ethers.computeHmac.register(ethers.computeHmac._);
  ethers.pbkdf2.register(ethers.pbkdf2._);
  ethers.scrypt.register(ethers.scrypt._);
  ethers.randomBytes.register(ethers.randomBytes._);
}
