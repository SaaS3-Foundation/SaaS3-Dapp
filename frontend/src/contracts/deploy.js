/* eslint-disable no-await-in-loop */
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { typeDefinitions } from '@polkadot/types';
import { ContractPromise } from '@polkadot/api-contract';
import * as Phala from '@phala/sdk';
import { TxQueue, blockBarrier, hex } from './utils';
import { loadContractFile, deployContracts } from './common';
import { POLKADOT_NEDPOINT_DEFAULT, POLKADOT_PRUNTIME_URL_DEFAULT } from '@/config/nerwork';
import {
  web3Accounts,
  web3Enable,
  web3FromSource,
} from "@polkadot/extension-dapp";

export async function deploy(
  // privkey,
  account,
  contractContent,
  config,
  clusterId = '0x0000000000000000000000000000000000000000000000000000000000000000',
  chainUrl = POLKADOT_NEDPOINT_DEFAULT,
  pruntimeUrl = POLKADOT_PRUNTIME_URL_DEFAULT,
) {
  const contractObj = loadContractFile(contractContent);
  console.log(account);

  //const extensions = await web3Enable("local canvas");
  //const allAccounts = await web3Accounts();
  //const selectedAccount = allAccounts[0];
  //// Create a signer 
  //const signer = await web3FromSource(selectedAccount.meta.source).then(
  //  (res) => res.signer
  //);
  //console.log(signer);


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
    const keyring = new Keyring({ type: 'sr25519' })
    const alice = keyring.addFromUri('//Alice')
    const treasury = keyring.addFromUri('//Treasury')
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
  await deployContracts(api, txqueue, account, cert, contractObj, clusterId);

  // create Fat Contract objects
  const contracts = {};
  // todo This line prevents errors.
  const artifacts = {};

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
