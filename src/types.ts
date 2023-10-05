export type HexString = string;
export type BytesLike = HexString | Uint8Array;

export type EthersCryptoFnLike<T> = T & { register: (fn: T) => void; _: T };
export type EthersLike = {
  keccak256: EthersCryptoFnLike<(data: Uint8Array) => BytesLike>;
  ripemd160: EthersCryptoFnLike<(data: Uint8Array) => BytesLike>;
  sha256: EthersCryptoFnLike<(data: Uint8Array) => BytesLike>;
  sha512: EthersCryptoFnLike<(data: Uint8Array) => BytesLike>;
  computeHmac: EthersCryptoFnLike<
    (algo: 'sha256' | 'sha512', key: Uint8Array, data: Uint8Array) => BytesLike
  >;
  pbkdf2: EthersCryptoFnLike<
    (
      password: Uint8Array,
      salt: Uint8Array,
      iterations: number,
      keylen: number,
      algo: 'sha256' | 'sha512'
    ) => BytesLike
  >;
  scrypt: EthersCryptoFnLike<
    (
      password: Uint8Array,
      salt: Uint8Array,
      N: number,
      r: number,
      p: number,
      dkLen: number
    ) => Promise<BytesLike>
  >;
  randomBytes: EthersCryptoFnLike<(length: number) => Uint8Array>;
};
