import crypto from 'crypto-browserify';
import { checkUntil, checkUntilEq, hex } from './utils';

export function loadContractFile(contractFile) {
  const metadata = JSON.parse(contractFile);
  const constructor = metadata.V3.spec.constructors.find((c) => c.label === 'default').selector;
  const { name } = metadata.contract;
  const { wasm } = metadata.source;
  const { hash } = metadata.source;
  return {
    default: {
      hash, wasm, metadata, constructor, name,
    },
  };
}

// artifacts: {FatBadges: {wasm, metadata, constructor}, ...}
export async function deployContracts(api, txqueue, pair, artifacts, clusterId, salt) {
  salt = salt || hex(crypto.randomBytes(4));

  console.log('Contracts: uploading', api, txqueue, pair, artifacts, clusterId, salt);
  const arg1 = Object.entries(artifacts).flatMap(([_k, v]) => [
    api.tx.phalaFatContracts.clusterUploadResource(clusterId, 'InkCode', v.wasm),
    api.tx.phalaFatContracts.instantiateContract(
      { WasmCode: v.hash },
      v.constructor,
      salt,
      clusterId,
      0,
      '10000000000000',
      null,
    ),
  ]);
  console.log('arg1', arg1);
  const promiseBatchAll = api.tx.utility.batchAll(arg1);
  console.log('promiseBatchAll', promiseBatchAll);

  // upload contracts
  // todo Error reported here with signer
  const { events: deployEvents } = await txqueue.submit(
    // api.tx.utility.batchAll(arg1),
    promiseBatchAll,
    pair,
  );
  console.log('after submit....');
  const contractIds = deployEvents
    .filter((ev) => ev.event.section === 'phalaFatContracts' && ev.event.method === 'Instantiating')
    .map((ev) => ev.event.data[0].toString());

  // todo This line prevents errors.
  const contractNames = [];
  const numContracts = contractNames.length;
  console.assert(contractIds.length === numContracts, 'Incorrect length:', `${contractIds.length} vs ${numContracts}`);
  for (const [i, id] of contractIds.entries()) {
    artifacts[contractNames[i]].address = id;
  }
  await checkUntilEq(
    async () => (await api.query.phalaFatContracts.clusterContracts(clusterId))
      .filter((c) => contractIds.includes(c.toString()))
      .length,
    numContracts,
    4 * 6000,
  );
  console.log('Contracts: uploaded');
  for (const [name, contract] of Object.entries(artifacts)) {
    // eslint-disable-next-line no-await-in-loop
    await checkUntil(
      async () => (await api.query.phalaRegistry.contractKeys(contract.address)).isSome,
      4 * 6000,
    );
    console.log('Contracts:', contract.address, name, 'key ready');
  }
  console.log('Contracts: deployed');
}
