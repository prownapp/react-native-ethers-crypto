#include <jni.h>
#include "react-native-ethers-crypto.h"

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeKeccak256(JNIEnv *env, jclass type, jstring hex_string) {
    auto hex_string_utf = env->GetStringUTFChars(hex_string, NULL);
    auto ret = etherscrypto::keccak256(std::string(hex_string_utf));
    env->ReleaseStringUTFChars(hex_string, hex_string_utf);
    return env->NewStringUTF(ret.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeRipemd160(JNIEnv *env, jclass type, jstring hex_string) {
    auto hex_string_utf = env->GetStringUTFChars(hex_string, NULL);
    auto ret = etherscrypto::ripemd160(std::string(hex_string_utf));
    env->ReleaseStringUTFChars(hex_string, hex_string_utf);
    return env->NewStringUTF(ret.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeSha256(JNIEnv *env, jclass type, jstring hex_string) {
    auto hex_string_utf = env->GetStringUTFChars(hex_string, NULL);
    auto ret = etherscrypto::sha256(std::string(hex_string_utf));
    env->ReleaseStringUTFChars(hex_string, hex_string_utf);
    return env->NewStringUTF(ret.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeSha512(JNIEnv *env, jclass type, jstring hex_string) {
    auto hex_string_utf = env->GetStringUTFChars(hex_string, NULL);
    auto ret = etherscrypto::sha512(std::string(hex_string_utf));
    env->ReleaseStringUTFChars(hex_string, hex_string_utf);
    return env->NewStringUTF(ret.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeComputeHmac(JNIEnv *env, jclass type, jstring algo, jstring key_hex_string, jstring data_hex_string) {
    auto algo_utf = env->GetStringUTFChars(algo, NULL);
    auto key_hex_string_utf = env->GetStringUTFChars(key_hex_string, NULL);
    auto data_hex_string_utf = env->GetStringUTFChars(data_hex_string, NULL);
    auto ret = etherscrypto::computeHmac(std::string(algo_utf), std::string(key_hex_string_utf), std::string(data_hex_string_utf));
    env->ReleaseStringUTFChars(algo, algo_utf);
    env->ReleaseStringUTFChars(key_hex_string, key_hex_string_utf);
    env->ReleaseStringUTFChars(data_hex_string, data_hex_string_utf);
    return env->NewStringUTF(ret.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativePbkdf2(JNIEnv *env, jclass type, jstring password_hex_string, jstring salt_hex_string, jint iterations, jint keylen, jstring algo) {
    auto password_hex_string_utf = env->GetStringUTFChars(password_hex_string, NULL);
    auto salt_hex_string_utf = env->GetStringUTFChars(salt_hex_string, NULL);
    auto algo_utf = env->GetStringUTFChars(algo, NULL);
    auto ret = etherscrypto::pbkdf2(password_hex_string_utf, salt_hex_string_utf, iterations, keylen, algo_utf);
    env->ReleaseStringUTFChars(password_hex_string, password_hex_string_utf);
    env->ReleaseStringUTFChars(salt_hex_string, salt_hex_string_utf);
    env->ReleaseStringUTFChars(algo, algo_utf);
    return env->NewStringUTF(ret.c_str());
}


extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeScrypt(JNIEnv *env, jclass type, jstring password_hex_string, jstring salt_hex_string, jint N, jint r, jint p, jint dkLen) {
    auto password_hex_string_utf = env->GetStringUTFChars(password_hex_string, NULL);
    auto salt_hex_string_utf = env->GetStringUTFChars(salt_hex_string, NULL);
    auto ret = etherscrypto::scrypt(password_hex_string_utf, salt_hex_string_utf, N, r, p, dkLen);
    env->ReleaseStringUTFChars(password_hex_string, password_hex_string_utf);
    env->ReleaseStringUTFChars(salt_hex_string, salt_hex_string_utf);
    return env->NewStringUTF(ret.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_etherscrypto_EthersCryptoModule_nativeRandomBytes(JNIEnv *env, jclass type, jint length) {
    return env->NewStringUTF(etherscrypto::randomBytes(length).c_str());
}