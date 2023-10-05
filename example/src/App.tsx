import * as React from 'react';
import { ethers } from 'ethers';
import * as rnec from 'react-native-ethers-crypto';

import { ScrollView, StyleSheet, Text, View } from 'react-native';

ethers.randomBytes.register(rnec.randomBytes);

function registerEthersHooks() {
  rnec.registerEthersHooks(ethers);
}

function unregisterEthersHooks() {
  rnec.unregisterEthersHooks(ethers);
  // Keep ethers.randomBytes registered
  ethers.randomBytes.register(rnec.randomBytes);
}

function EqualsAssertion({
  name,
  ethersFn,
  rnecFn,
}: {
  name: string;
  ethersFn: () => any;
  rnecFn: () => any;
}) {
  const [ethersRes, setEthersRes] = React.useState<any>();
  const [ethersTime, setEthersTime] = React.useState<number | null>(null);
  const [rnecRes, setRnecRes] = React.useState<any>();
  const [rnecTime, setRnecTime] = React.useState<number | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      const ethersStart = performance.now();
      setEthersRes(await ethersFn());
      setEthersTime(performance.now() - ethersStart);
      const rnecStart = performance.now();
      setRnecRes(await rnecFn());
      setRnecTime(performance.now() - rnecStart);
    }

    fetchData();
  }, [ethersFn, rnecFn, setEthersRes, setRnecRes]);

  const viewStyle = React.useMemo(
    () => ({
      backgroundColor: ethersRes === rnecRes ? '#bbffbb' : '#ffbbbb',
    }),
    [ethersRes, rnecRes]
  );

  return (
    <View style={viewStyle}>
      <Text style={styles.title}>{name}</Text>
      <Text>
        JS ({ethersTime?.toFixed(2)}ms): {ethersRes}
      </Text>
      <Text>
        RNEC ({rnecTime?.toFixed(2)}ms): {rnecRes}
      </Text>
    </View>
  );
}

const testCases = [
  {
    name: 'keccak256',
    ethersFn: () => ethers.keccak256(ethers.toUtf8Bytes('hello world')),
    rnecFn: () => rnec.keccak256(ethers.toUtf8Bytes('hello world')),
  },
  {
    name: 'ripemd160',
    ethersFn: () => ethers.ripemd160(ethers.toUtf8Bytes('hello world')),
    rnecFn: () => rnec.ripemd160(ethers.toUtf8Bytes('hello world')),
  },
  {
    name: 'sha256',
    ethersFn: () => ethers.sha256(ethers.toUtf8Bytes('hello world')),
    rnecFn: () => rnec.sha256(ethers.toUtf8Bytes('hello world')),
  },
  {
    name: 'sha512',
    ethersFn: () => ethers.sha512(ethers.toUtf8Bytes('hello world')),
    rnecFn: () => rnec.sha512(ethers.toUtf8Bytes('hello world')),
  },
  {
    name: 'computeHmac(sha256)',
    ethersFn: () =>
      ethers.computeHmac(
        'sha256',
        ethers.id('some secret'),
        ethers.toUtf8Bytes('hello world')
      ),
    rnecFn: () =>
      rnec.computeHmac(
        'sha256',
        ethers.id('some secret'),
        ethers.toUtf8Bytes('hello world')
      ),
  },
  {
    name: 'computeHmac(sha512)',
    ethersFn: () =>
      ethers.computeHmac(
        'sha512',
        ethers.id('some secret'),
        ethers.toUtf8Bytes('hello world')
      ),
    rnecFn: () =>
      rnec.computeHmac(
        'sha512',
        ethers.id('some secret'),
        ethers.toUtf8Bytes('hello world')
      ),
  },
  {
    name: 'pbkdf2(sha256)',
    ethersFn: () =>
      ethers.pbkdf2(
        ethers.toUtf8Bytes('hello world', 'NFKC'),
        ethers.id('some-salt'),
        1024,
        16,
        'sha256'
      ),
    rnecFn: () =>
      rnec.pbkdf2(
        ethers.toUtf8Bytes('hello world', 'NFKC'),
        ethers.id('some-salt'),
        1024,
        16,
        'sha256'
      ),
  },
  {
    name: 'pbkdf2(sha512)',
    ethersFn: () =>
      ethers.pbkdf2(
        ethers.toUtf8Bytes('hello world', 'NFKC'),
        ethers.id('some-salt'),
        1024,
        16,
        'sha512'
      ),
    rnecFn: () =>
      rnec.pbkdf2(
        ethers.toUtf8Bytes('hello world', 'NFKC'),
        ethers.id('some-salt'),
        1024,
        16,
        'sha512'
      ),
  },
  {
    name: 'scrypt',
    ethersFn: () =>
      ethers.scrypt(
        ethers.toUtf8Bytes('hello world', 'NFKC'),
        ethers.id('some-salt'),
        1024,
        8,
        1,
        16
      ),
    rnecFn: () =>
      rnec.scrypt(
        ethers.toUtf8Bytes('hello world', 'NFKC'),
        ethers.id('some-salt'),
        1024,
        8,
        1,
        16
      ),
  },
  {
    name: 'ethers.Wallet.random',
    ethersFn: () => {
      unregisterEthersHooks();
      ethers.Wallet.createRandom();
      return 'done';
    },
    rnecFn: () => {
      registerEthersHooks();
      console.log(ethers.Wallet.createRandom());
      return 'done';
    },
  },
  {
    name: 'ethers.Wallet.fromPhrase',
    ethersFn: () => {
      unregisterEthersHooks();
      ethers.Wallet.fromPhrase(
        'client inmate sustain hedgehog essay saddle feature below fix depart vehicle size'
      );
      return 'done';
    },
    rnecFn: () => {
      registerEthersHooks();
      console.log(
        ethers.Wallet.fromPhrase(
          'client inmate sustain hedgehog essay saddle feature below fix depart vehicle size'
        )
      );
      return 'done';
    },
  },
];

export default function App() {
  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        {testCases.map((testCase, i) => (
          <EqualsAssertion key={i} {...testCase} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
