#include "react-native-ethers-crypto.h"
#include "keccak/keccak256.h"
#include <openssl/sha.h>
#include <openssl/ripemd.h>
#include <openssl/evp.h>
#include <openssl/hmac.h>
#include <stdexcept>
#include <openssl/rand.h>

using std::string;

string bytes_to_hex_string(const unsigned char* data, size_t data_length) {
	string hex_string("0x");
	hex_string.reserve(data_length * 2 + 2);
	for(auto i = 0; i < data_length; i++)
	{
		char hex[3];
		sprintf(hex, "%02x", data[i]);
		hex_string.append(hex);
	}
	return hex_string;
}

string hex_string_to_bytes(string &hex_string) {
	if(hex_string.size() % 2 != 0)
	{
		throw std::runtime_error("hex_string_to_bytes: hex_string size must be even");
	}

	const auto has_prefix = hex_string.substr(0, 2) == "0x";

	string data;
	data.reserve(hex_string.size() / 2 - has_prefix);

	for(auto i = has_prefix ? 2 : 0; i < hex_string.size(); i += 2)
	{
		char hex[3];
		hex[0] = hex_string[i];
		hex[1] = hex_string[i + 1];
		hex[2] = '\0';
		data.push_back(static_cast<unsigned char>(strtol(hex, nullptr, 16)));
	}

	return data;
}

namespace etherscrypto {
	string keccak256(string hex_string) {
		auto data = hex_string_to_bytes(hex_string);
		unsigned char md[Keccak256::HASH_LEN];

		Keccak256::getHash(reinterpret_cast<const unsigned char*>(data.c_str()), data.size(), md);

		return bytes_to_hex_string(md, SHA256_DIGEST_LENGTH);
	}

	string ripemd160(string hex_string) {
		auto data = hex_string_to_bytes(hex_string);

		RIPEMD160_CTX context;
		unsigned char md[RIPEMD160_DIGEST_LENGTH];
		if(!RIPEMD160_Init(&context))
		{
			throw std::runtime_error("RIPEMD160_Init failed");
		}

		if(!RIPEMD160_Update(&context, data.c_str(), data.size()))
		{
			throw std::runtime_error("RIPEMD160_Update failed");
		}

		if(!RIPEMD160_Final(md, &context))
		{
			throw std::runtime_error("RIPEMD160_Final failed");
		}

		return bytes_to_hex_string(md, RIPEMD160_DIGEST_LENGTH);
	}

	string sha256(string hex_string) {
		auto data = hex_string_to_bytes(hex_string);

		SHA256_CTX context;
		unsigned char md[SHA256_DIGEST_LENGTH];
		if(!SHA256_Init(&context))
		{
			throw std::runtime_error("SHA256_Init failed");
		}

		if(!SHA256_Update(&context, data.c_str(), data.size()))
		{
			throw std::runtime_error("SHA256_Update failed");
		}

		if(!SHA256_Final(md, &context))
		{
			throw std::runtime_error("SHA256_Final failed");
		}

		return bytes_to_hex_string(md, SHA256_DIGEST_LENGTH);
	}

	string sha512(string hex_string) {
		auto data = hex_string_to_bytes(hex_string);

		SHA512_CTX context;
		unsigned char md[SHA512_DIGEST_LENGTH];
		if(!SHA512_Init(&context))
		{
			throw std::runtime_error("SHA512_Init failed");
		}

		if(!SHA512_Update(&context, data.c_str(), data.size()))
		{
			throw std::runtime_error("SHA512_Update failed");
		}

		if(!SHA512_Final(md, &context))
		{
			throw std::runtime_error("SHA512_Final failed");
		}

		return bytes_to_hex_string(md, SHA512_DIGEST_LENGTH);
	}

	string computeHmac(string algo, string key_hex_string, string data_hex_string) {
		auto key = hex_string_to_bytes(key_hex_string);
		auto data = hex_string_to_bytes(data_hex_string);

		if(algo != "sha256" && algo != "sha512") {
			throw std::invalid_argument("pbkdf2: algo must be sha256 or sha512");
		}

		std::uint8_t digest[EVP_MAX_MD_SIZE];
		std::uint32_t dilen{};

		if(!HMAC(
			algo == "sha256" ? EVP_sha256() : EVP_sha512(),
			key.c_str(),
			key.size(),
			reinterpret_cast<const unsigned char *>(data.c_str()),
			data.size(),
			digest,
			&dilen
		)) {
			throw std::runtime_error("HMAC failed");
		}

		return bytes_to_hex_string(digest, dilen);
	}

	string pbkdf2(string password_hex_string, string salt_hex_string, int32_t iterations, int32_t keylen, string algo) {
		auto password = hex_string_to_bytes(password_hex_string);
		auto salt = hex_string_to_bytes(salt_hex_string);
		if(algo == "sha256") {
			unsigned char md[keylen];
			if(!PKCS5_PBKDF2_HMAC(password.c_str(), password.size(), reinterpret_cast<const unsigned char*>(salt.c_str()), salt.size(), iterations, EVP_sha256(), keylen, md)) {
				throw std::runtime_error("PKCS5_PBKDF2_HMAC failed");
			}
			return bytes_to_hex_string(md, keylen);
		} else if (algo == "sha512") {
			unsigned char md[keylen];
			if(!PKCS5_PBKDF2_HMAC(password.c_str(), password.size(), reinterpret_cast<const unsigned char*>(salt.c_str()), salt.size(), iterations, EVP_sha512(), keylen, md)) {
				throw std::runtime_error("PKCS5_PBKDF2_HMAC failed");
			}
			return bytes_to_hex_string(md, keylen);
		} else {
			throw std::invalid_argument("pbkdf2: algo must be sha256 or sha512");
		}
	}

	string scrypt(string password_hex_string, string salt_hex_string, int32_t N, int32_t r, int32_t p, int32_t dkLen) {
		auto password = hex_string_to_bytes(password_hex_string);
		auto salt = hex_string_to_bytes(salt_hex_string);
		unsigned char key[dkLen];
		if(!EVP_PBE_scrypt(password.c_str(), password.size(), reinterpret_cast<const unsigned char*>(salt.c_str()), salt.size(), N, r, p, /* default node value */ 32 * 1024 * 1024, key, dkLen)) {
			throw std::runtime_error("EVP_PBE_scrypt failed");
		}
		return bytes_to_hex_string(key, dkLen);
	}

	string randomBytes(int32_t length) {
		unsigned char bytes[length];
		if(!RAND_bytes(bytes, length)) {
			throw std::runtime_error("RAND_bytes failed");
		}
		return bytes_to_hex_string(bytes, length);
	}
}
