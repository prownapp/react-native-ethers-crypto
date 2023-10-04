#ifdef __cplusplus
#import "react-native-ethers-crypto.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNEthersCryptoSpec.h"

@interface EthersCrypto : NSObject <NativeEthersCryptoSpec>
#else
#import <React/RCTBridgeModule.h>

@interface EthersCrypto : NSObject <RCTBridgeModule>
#endif

@end
