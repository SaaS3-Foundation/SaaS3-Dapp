const fs = require('fs');

const {ApiPromise, WsProvider, Keyring} = require('@polkadot/api');
const {ContractPromise} = require('@polkadot/api-contract');
const Phala = require('@phala/sdk');

const { TxQueue, blockBarrier, hex } = require('./utils');
const { loadArtifacts, deployContracts } = require('./common');

async function deploy(clusterId, privkey, chainUrl, pruntimeUrl, contractContent, config) {

    const artifacts = loadArtifacts(contractContent);

    // connect to the chain
    const wsProvider = new WsProvider(chainUrl);
    const api = await ApiPromise.create({
        provider: wsProvider,
        types: {
            ...Phala.types,
            'GistQuote': {
                username: 'String',
                accountId: 'AccountId',
            },
        }
    });
    const txqueue = new TxQueue(api);

    // prepare accounts
    const keyring = new Keyring({type: 'sr25519'})
    const pair = keyring.addFromUri(privkey);
    console.log('Using account', pair.address);
    const cert = await Phala.signCertificate({api, pair});

    // connect to pruntime
    const prpc = Phala.createPruntimeApi(pruntimeUrl);
    const connectedWorker = hex((await prpc.getInfo({})).publicKey);
    console.log('Connected worker:', connectedWorker);

    // contracts
    await deployContracts(api, txqueue, pair, artifacts, clusterId);
    
    // create Fat Contract objects
    const contracts = {};
    for (const [name, contract] of Object.entries(artifacts)) {
        const contractId = contract.address;
        const newApi = await api.clone().isReady;
        contracts[name] = new ContractPromise(
            await Phala.create({api: newApi, baseURL: pruntimeUrl, contractId}),
            contract.metadata,
            contractId
        );
    }
    console.log('Fat Contract: connected', contracts);
    const { druntime } = contracts['default'];

    
    // set up the contracts
    await txqueue.submit(
        api.tx.utility.batchAll([
            //target_chain_rpc: Option<String>,
            //anchor_contract_addr: Option<H160>,
            //web2_api_url_prefix: Option<String>,
            //api_key: Option<String>,
            druntime.tx.config({}, config.target_chain_rpc, config.anchor_contract_addr, config.web2_api_url_prefix, config.api_key),
        ]),
        pair,
        true,
    );

    // wait for the worker to sync to the bockchain
    await blockBarrier(api, prpc);

    console.log('Deployment finished');
}