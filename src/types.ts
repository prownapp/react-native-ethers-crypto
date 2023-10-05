export type HexString = string;
export type BytesLike = HexString | Uint8Array;

export type EthersCryptoFnLike<T> = T & { register: (fn: T) => void; _: T };
export type EthersLike = {
  keccak256: EthersCryptoFnLike<(data: BytesLike) => HexString>;
  ripemd160: EthersCryptoFnLike<(data: BytesLike) => HexString>;
  sha256: EthersCryptoFnLike<(data: BytesLike) => HexString>;
  sha512: EthersCryptoFnLike<(data: BytesLike) => HexString>;
  computeHmac: EthersCryptoFnLike<
    (algo: 'sha256' | 'sha512', key: BytesLike, data: BytesLike) => HexString
  >;
  pbkdf2: EthersCryptoFnLike<
    (
      password: BytesLike,
      salt: BytesLike,
      iterations: number,
      keylen: number,
      algo: 'sha256' | 'sha512'
    ) => HexString
  >;
  scrypt: EthersCryptoFnLike<
    (
      password: BytesLike,
      salt: BytesLike,
      N: number,
      r: number,
      p: number,
      dkLen: number
    ) => Promise<HexString>
  >;
  randomBytes: EthersCryptoFnLike<(length: number) => Uint8Array>;
};
