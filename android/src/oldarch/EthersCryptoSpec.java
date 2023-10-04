package com.etherscrypto;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;

abstract class EthersCryptoSpec extends ReactContextBaseJavaModule {
  EthersCryptoSpec(ReactApplicationContext context) {
    super(context);
  }

  public abstract String keccak256(String hexString);
  public abstract String ripemd160(String hexString);
  public abstract String sha256(String hexString);
  public abstract String sha512(String hexString);
  public abstract String computeHmac(String algo, String keyHexString, String dataHexString);
  public abstract String pbkdf2(String passwordHexString, String saltHexString, int iterations, int keyLen, String algo);
  public abstract void scrypt(String passwordHexString, String saltHexString, int N, int r, int p, int dkLen, Promise promise);
  public abstract String randomBytes(int length);
}
