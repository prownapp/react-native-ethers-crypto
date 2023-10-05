# react-native-ethers-crypto

This library supplies the bare minimum of cryptographic functions needed to speed up operations of Ethers v6 on React Native.

## Installation

Install this package and its peer dependencies.

```sh
yarn add react-native-ethers-crypto
yarn add @craftzdog/react-native-buffer react-native-quick-base64
```

## Usage

```ts
import { ethers } from 'ethers';
import { registerEthersHooks } from 'react-native-ethers-crypto';

registerEthersHooks(ethers);

// Now even 80x faster! ⚡
ethers.Wallet.createRandom();
```

## Depending on another Android library containing libcrypto.so

`react-native-ethers-crypto` uses OpenSSL's `libcrypto.so`, which is also used by `flipper`. That means you can encounter an error like this while building the application:

```
Execution failed for task ':app:mergeDebugNativeLibs'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.MergeNativeLibsTask$MergeNativeLibsTaskWorkAction
   > 2 files found with path 'lib/arm64-v8a/libcrypto.so' from inputs:
      [...]
```

You can fix this error by adding the following block into your app's build.gradle.

```
android {
    packagingOptions {
        pickFirst 'lib/**/libcrypto.so'
    }
}
```

We know it's not perfect, but there's no better fix at this time.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
