#include <jni.h>
#include "react-native-ethers-crypto.h"

std::string fromJString(JNIEnv *env, jstring jstr) {
    const char *cstr = env->GetStringUTFChars(jstr, NULL);
    std::string ret = std::string(cstr);
    env->ReleaseStringUTFChars(jstr, cstr);
    return ret;
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeKeccak256(JNIEnv *env, jclass type, jstring hex_string) {
    auto hex_string_utf = fromJString(env, hex_string);
    auto ret = etherscrypto::keccak256(hex_string_utf);
    return env->NewStringUTF(ret.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeRipemd160(JNIEnv *env, jclass type, jstring hex_string) {
    auto hex_string_utf = fromJString(env, hex_string);
    auto ret = etherscrypto::ripemd160(hex_string_utf);
    return env->NewStringUTF(ret.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeSha256(JNIEnv *env, jclass type, jstring hex_string) {
    auto hex_string_utf = fromJString(env, hex_string);
    auto ret = etherscrypto::sha256(hex_string_utf);
    return env->NewStringUTF(ret.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeSha512(JNIEnv *env, jclass type, jstring hex_string) {
    auto hex_string_utf = fromJString(env, hex_string);
    auto ret = etherscrypto::sha512(hex_string_utf);
    return env->NewStringUTF(ret.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeComputeHmac(JNIEnv *env, jclass type, jstring algo, jstring key_hex_string, jstring data_hex_string) {
    auto algo_utf = fromJString(env, algo);
    auto key_hex_string_utf = fromJString(env, key_hex_string);
    auto data_hex_string_utf = fromJString(env, data_hex_string);
    auto ret = etherscrypto::computeHmac(algo_utf, key_hex_string_utf,data_hex_string_utf);
    return env->NewStringUTF(ret.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativePbkdf2(JNIEnv *env, jclass type, jstring password_hex_string, jstring salt_hex_string, jint iterations, jint keylen, jstring algo) {
    auto password_hex_string_utf = fromJString(env, password_hex_string);
    auto salt_hex_string_utf = fromJString(env, salt_hex_string);
    auto algo_utf = fromJString(env, algo);
    auto ret = etherscrypto::pbkdf2(password_hex_string_utf, salt_hex_string_utf, iterations, keylen, algo_utf);
    return env->NewStringUTF(ret.c_str());
}


extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeScrypt(JNIEnv *env, jclass type, jstring password_hex_string, jstring salt_hex_string, jint N, jint r, jint p, jint dkLen) {
    auto password_hex_string_utf = fromJString(env, password_hex_string);
    auto salt_hex_string_utf = fromJString(env, salt_hex_string);
    auto ret = etherscrypto::scrypt(password_hex_string_utf, salt_hex_string_utf, N, r, p, dkLen);
    return env->NewStringUTF(ret.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeRandomBytes(JNIEnv *env, jclass type, jint length) {
    return env->NewStringUTF(etherscrypto::randomBytes(length).c_str());
}