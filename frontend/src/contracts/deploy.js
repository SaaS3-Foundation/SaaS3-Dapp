/* eslint-disable no-await-in-loop */
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { typeDefinitions } from '@polkadot/types';
import { ContractPromise } from '@polkadot/api-contract';
import * as Phala from '@phala/sdk';
import { TxQueue, blockBarrier, hex } from './utils';
import { loadContractFile, deployContracts } from './common';
import { POLKADOT_ENDPOINT_DEFAULT, POLKADOT_PRUNTIME_URL_DEFAULT } from '@/config/nerwork';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

export async function deploy(
  // privkey,
  account,
  contractContent,
  config,
  clusterId = '0x0000000000000000000000000000000000000000000000000000000000000000',
  chainUrl = POLKADOT_ENDPOINT_DEFAULT,
  pruntimeUrl = POLKADOT_PRUNTIME_URL_DEFAULT,
) {
  const artifacts = loadContractFile(contractContent);
  console.log(account);

  // connect to the chain
  const wsProvider = new WsProvider(chainUrl);
  const api = await ApiPromise.create({
    provider: wsProvider,
    types: {
      ...Phala.types,
      ...typeDefinitions.contracts.types,
    },
    signer: account.signer,
  });

  const txqueue = new TxQueue(api);

  // Prepare accounts
  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice');
  const treasury = keyring.addFromUri('//Treasury');
  const certAlice = await Phala.signCertificate({ api, pair: alice });
  console.log(alice, certAlice);

  console.log('account.wallet.extension', account.wallet.extension);
  const cert = await Phala.signCertificate({
    api,
    account: {
      ...account.wallet.extension,
      address: account.address,
      meta: {
        source: 'polkadot-js',
      },
    },
    signer: account.signer,
  });
  console.log('after cert........', cert);
  // connect to pruntime
  const prpc = Phala.createPruntimeApi(pruntimeUrl);
  const connectedWorker = hex((await prpc.getInfo({})).publicKey);
  console.log('Connected worker:', connectedWorker);

  // contracts
  //  const address = await deployContracts(api, txqueue, account, cert, artifacts, clusterId);
  const address = '0xcb22a0c52a35981f73e16930b90709ce76441b9b310599258c500856c832aed0';
  artifacts.druntime.address = address;
  console.log(address);

  // create Fat Contract objects
  const contracts = {};
  // todo This line prevents errors.

  for (const [name, contract] of Object.entries(artifacts)) {
    const contractId = contract.address;
    console.log(api);
    const newApi = await api.clone().isReady;
    console.log(newApi);
    let t = await Phala.create({ api: newApi, baseURL: pruntimeUrl, contractId, autoDeposit: true });
    console.log(t);
    console.log(name);
    contracts[name] = new ContractPromise(
      t.api,
      contract.metadata,
      contractId,
    );
  }
  console.log('Fat Contract: connected', contracts);
  const { druntime } = contracts;

  // set up the contracts
  await txqueue.submit(
    // target_chain_rpc: Option<String>,
    // anchor_contract_addr: Option<H160>,
    // web2_api_url_prefix: Option<String>,
    // api_key: Option<String>,
    druntime.api.tx.config(
      {},
      config.target_chain_rpc, // saas3 protocol rpc
      config.anchor_contract_addr,
      config.web2_api_url_prefix,
      config.api_key,
    ),
    account.signer,
    true,
  );

  // wait for the worker to sync to the bockchain
  await blockBarrier(api, prpc);

  console.log('Deployment finished');
}
