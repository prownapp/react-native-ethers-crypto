package com.etherscrypto;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class EthersCryptoModule extends EthersCryptoSpec {
  public static final String NAME = "EthersCrypto";

  EthersCryptoModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static {
    System.loadLibrary("cpp");
  }

  public static native String nativeKeccak256(String hexString);
  public static native String nativeRipemd160(String hexString);
  public static native String nativeSha256(String hexString);
  public static native String nativeSha512(String hexString);
  public static native String nativeComputeHmac(String algo, String keyHexString, String dataHexString);
  public static native String nativePbkdf2(String passwordHexString, String saltHexString, int iterations, int keyLen, String algo);
  public static native String nativeScrypt(String passwordHexString, String saltHexString, int N, int r, int p, int dkLen);
  public static native String nativeRandomBytes(int length);

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String keccak256(String hexString) {
    return nativeKeccak256(hexString);
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String ripemd160(String hexString) {
    return nativeRipemd160(hexString);
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String sha256(String hexString) {
    return nativeSha256(hexString);
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String sha512(String hexString) {
    return nativeSha512(hexString);
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String computeHmac(String algo, String keyHexString, String dataHexString) {
    return nativeComputeHmac(algo, keyHexString, dataHexString);
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String pbkdf2(String passwordHexString, String saltHexString, int iterations, int keyLen, String algo) {
   return nativePbkdf2(passwordHexString, saltHexString, iterations, keyLen, algo);
  }

  @ReactMethod
  public void scrypt(String passwordHexString, String saltHexString, int N, int r, int p, int dkLen, Promise promise) {
    promise.resolve(nativeScrypt(passwordHexString, saltHexString, N, r, p, dkLen));
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String randomBytes(int length) {
    return nativeRandomBytes(length);
  }

}
