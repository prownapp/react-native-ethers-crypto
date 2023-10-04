#ifndef ETHERSCRYPTO_H
#define ETHERSCRYPTO_H

#include <string>

namespace etherscrypto {
  std::string keccak256(std::string hex_string);
  std::string ripemd160(std::string hex_string);
  std::string sha256(std::string hex_string);
  std::string sha512(std::string hex_string);
  std::string pbkdf2(std::string password_hex_string, std::string salt_hex_string, int32_t iterations, int32_t keylen, std::string algo);
  std::string computeHmac(std::string algo, std::string key_hex_string, std::string data_hex_string);
  std::string scrypt(std::string password_hex_string, std::string salt_hex_string, int32_t N, int32_t r, int32_t p, int32_t dkLen);
  std::string randomBytes(int32_t length);
}

#endif /* ETHERSCRYPTO_H */
