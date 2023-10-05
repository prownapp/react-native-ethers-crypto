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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
