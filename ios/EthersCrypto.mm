#import "EthersCrypto.h"

@implementation EthersCrypto
RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(keccak256:(NSString *)data)
{
    return [NSString stringWithUTF8String:etherscrypto::keccak256([data UTF8String]).c_str()];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(ripemd160:(NSString *)data)
{
    return [NSString stringWithUTF8String:etherscrypto::ripemd160([data UTF8String]).c_str()];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(sha256:(NSString *)data)
{
    return [NSString stringWithUTF8String:etherscrypto::sha256([data UTF8String]).c_str()];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(sha512:(NSString *)data)
{
    return [NSString stringWithUTF8String:etherscrypto::sha512([data UTF8String]).c_str()];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(pbkdf2:(NSString *)password_hex_string
                                       salt_hex:(NSString *)salt_hex_string
                                       iterations:(int)iterations
                                       keylen:(int)keylen
                                       algo:(NSString *)algo)
{
    return [NSString stringWithUTF8String:etherscrypto::pbkdf2([password_hex_string UTF8String], [salt_hex_string UTF8String], iterations, keylen, [algo UTF8String]).c_str()];
}

RCT_EXPORT_METHOD(scrypt:(NSString *)password_hex_string
                  salt_hex:(NSString *)salt_hex_string
                  N:(int)N
                  r:(int)r
                  p:(int)p
                  dkLen:(int)dkLen
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSString *result = [NSString stringWithUTF8String:etherscrypto::scrypt([password_hex_string UTF8String], [salt_hex_string UTF8String], N, r, p, dkLen).c_str()];

    resolve(result);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(randomBytes:(int)length)
{
    return [NSString stringWithUTF8String:etherscrypto::randomBytes(length).c_str()];
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeEthersCryptoSpecJSI>(params);
}
#endif

@end
