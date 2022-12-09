/* eslint-disable no-await-in-loop */
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import * as Phala from '@phala/sdk';
import { TxQueue, blockBarrier, hex } from './utils';
import { loadArtifacts, deployContracts } from './common';
import { POLKADOT_NEDPOINT_DEFAULT, POLKADOT_PRUNTIME_URL_DEFAULT } from '@/config/nerwork';
// import {} from '@polkadot/wasm-crypto';

// const keyring1 = new Keyring({ type: 'sr25519' });
// console.log(keyring1.add);
// // 0x180f0b2b8ba91b2a937ead4418f1fc810affc2ab82b23f36062b97dddf2da97e1e760b03a18eed8e3591d96ea7527c353380178fd90bdc8eeb36e503f67d4457
// // gorilla edit accuse fat census rotate gym measure comic sentence wet permit
// const pair = keyring1.addFromUri('entire material egg meadow latin bargain dutch coral blood melt acoustic thought');
// console.log(pair);

// deploy(
//   '0x0000000000000000000000000000000000000000000000000000000000000000',
// '//Alice',
// 'wss://poc5.phala.network/ws',
// 'https://poc5.phala.network/tee-api-1',
// )

export async function deploy(
  // privkey,
  account,
  contractContent,
  config,
  clusterId = '0x0000000000000000000000000000000000000000000000000000000000000000',
  chainUrl = POLKADOT_NEDPOINT_DEFAULT,
  pruntimeUrl = POLKADOT_PRUNTIME_URL_DEFAULT,
) {
  const artifacts = loadArtifacts(contractContent);
  const { signer } = account;

  // connect to the chain
  const wsProvider = new WsProvider(chainUrl);
  const api = await ApiPromise.create({
    provider: wsProvider,
    types: {
      ...Phala.types,
      GistQuote: {
        username: 'String',
        accountId: 'AccountId',
      },
    },
  });
  const txqueue = new TxQueue(api);

  // prepare accounts
  // const keyring = new Keyring({ type: 'sr25519' });
  // const pair = keyring.addFromUri('privkey');
  // console.log('Using account', pair.address);
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
    signer,
  });

  // connect to pruntime
  const prpc = Phala.createPruntimeApi(pruntimeUrl);
  const connectedWorker = hex((await prpc.getInfo({})).publicKey);
  console.log('Connected worker:', connectedWorker);

  // contracts
  await deployContracts(api, txqueue, signer, artifacts, clusterId);

  // create Fat Contract objects
  const contracts = {};
  for (const [name, contract] of Object.entries(artifacts)) {
    const contractId = contract.address;
    const newApi = await api.clone().isReady;
    contracts[name] = new ContractPromise(
      await Phala.create({ api: newApi, baseURL: pruntimeUrl, contractId }),
      contract.metadata,
      contractId,
    );
  }
  console.log('Fat Contract: connected', contracts);
  const { druntime } = contracts.default;

  // set up the contracts
  await txqueue.submit(
    api.tx.utility.batchAll([
      // target_chain_rpc: Option<String>,
      // anchor_contract_addr: Option<H160>,
      // web2_api_url_prefix: Option<String>,
      // api_key: Option<String>,
      druntime.tx.config(
        {},
        config.target_chain_rpc, // saas3 protocol rpc
        config.anchor_contract_addr,
        config.web2_api_url_prefix,
        config.api_key,
      ),
    ]),
    signer,
    true,
  );

  // wait for the worker to sync to the bockchain
  await blockBarrier(api, prpc);

  console.log('Deployment finished');
}
