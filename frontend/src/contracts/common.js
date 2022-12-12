import crypto from 'crypto-browserify';
import { checkUntil, checkUntilEq, hex } from './utils';

export function loadContractFile(contractFile) {
    const metadata = JSON.parse(contractFile);
    const constructor = metadata.V3.spec.constructors.find(c => c.label == 'default').selector;
    const name = metadata.contract.name;
    const wasm = metadata.source.wasm;
    const hash = metadata.source.hash;
    return {default: { hash, wasm, metadata, constructor, name }};
}

// artifacts: {FatBadges: {wasm, metadata, constructor}, ...}
export async function deployContracts(api, txqueue, pair, cert, artifacts, clusterId, salt) {
    salt = salt ? salt : hex(crypto.randomBytes(4)),
  console.log('Contracts: uploading', artifacts.default.name);

  let contract = artifacts.default;
      // upload the contract 
      await txqueue.submit(
        api.tx.phalaFatContracts.clusterUploadResource(clusterId, 'InkCode', contract.wasm),
        pair);

            // Not sure how much time it would take to sync the code into pruntime
    console.log("Waiting the code to be synced into pruntime to estmate the instantiation");
    await sleep(10000);
    console.log(`Contracts: ${contract.name} uploaded`);

  console.log('Contracts: instantiating', contract.name);
const { events: deployEvents } = await txqueue.submit(
  api.tx.phalaFatContracts.instantiateContract(
          { WasmCode: v.hash},
          v.constructor,
          salt,
          clusterId,
          0,
          "10000000000000", null
        ), cert
  );


  const contractIds = deployEvents
    .filter((ev) => ev.event.section === 'phalaFatContracts' && ev.event.method === 'Instantiating')
    .map((ev) => ev.event.data[0].toString());
    console.log(contractIds);

  const numContracts = 1;
  console.assert(contractIds.length === numContracts, 'Incorrect length:', `${contractIds.length} vs ${numContracts}`);
  contract.address = contractIds[0];

  console.log('Contracts: deployed');
}
