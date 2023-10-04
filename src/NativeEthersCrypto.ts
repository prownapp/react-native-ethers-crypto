import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  keccak256(hexString: string): string;
  ripemd160(hexString: string): string;
  sha256(hexString: string): string;
  sha512(hexString: string): string;
  computeHmac(
    algo: 'sha256' | 'sha512',
    keyHexString: string,
    dataHexString: string
  ): string;
  pbkdf2(
    passwordHexString: string,
    saltHexString: string,
    iterations: number,
    keylen: number,
    algo: 'sha256' | 'sha512'
  ): string;
  scrypt(
    passwordHexString: string,
    saltHexString: string,
    N: number,
    r: number,
    p: number,
    dkLen: number
  ): Promise<string>;
  randomBytes(length: number): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('EthersCrypto');
