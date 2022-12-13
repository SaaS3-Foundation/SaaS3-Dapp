/* eslint-disable no-await-in-loop */
class TxQueue {
  constructor(api) {
    this.nonceTracker = {};
    this.api = api;
  }

  async nextNonce(address) {
    const byCache = this.nonceTracker[address] || 0;
    const byRpc = (await this.api.rpc.system.accountNextIndex(address)).toNumber();
    return Math.max(byCache, byRpc);
  }

  markNonceFailed(address, nonce) {
    if (!this.nonceTracker[address]) {
      return;
    }
    if (nonce < this.nonceTracker[address]) {
      this.nonceTracker[address] = nonce;
    }
  }

  async submit(txBuilder, account, waitForFinalization = false) {
    const nonce = await this.nextNonce(account.address);
    this.nonceTracker[account.address] = nonce + 1;
    let hash;
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const unsub = await txBuilder.signAndSend(account.address, { nonce, signer: account.signer }, (result) => {
        console.log(result);
        if (result.status.isInBlock) {
          for (const e of result.events) {
            const { event: { data, method, section } } = e;
            if (section === 'system' && method === 'ExtrinsicFailed') {
              unsub();
              reject(data[0].toHuman());
            }
          }
          if (!waitForFinalization) {
            unsub();
            resolve({
              hash: result.status.asInBlock,
              events: result.events,
            });
          } else {
            hash = result.status.asInBlock;
          }
        } else if (result.status.isFinalized) {
          resolve({
            hash,
            events: result.events,
          });
        } else if (result.status.isInvalid) {
          unsub();
          this.markNonceFailed(address, nonce);
          reject(new Error('Invalid transaction'));
        }
      });
    });
  }
}

async function sleep(t) {
  await new Promise((resolve) => {
    setTimeout(resolve, t);
  });
}

async function checkUntil(async_fn, timeout) {
  const t0 = new Date().getTime();
  while (true) {
    if (await async_fn()) {
      return;
    }
    const t = new Date().getTime();
    if (t - t0 >= timeout) {
      throw new Error('timeout');
    }
    await sleep(100);
  }
}

async function checkUntilEq(async_fn, expected, timeout, verbose = true) {
  const t0 = new Date().getTime();
  let lastActual;
  while (true) {
    const actual = await async_fn();
    if (actual === expected) {
      return;
    }
    if ((actual !== lastActual) && verbose) {
      console.log(`Waiting... (current = ${actual}, expected = ${expected})`);
      lastActual = actual;
    }
    const t = new Date().getTime();
    if (t - t0 >= timeout) {
      throw new Error('timeout');
    }
    await sleep(100);
  }
}

async function blockBarrier(api, prpc, finalized = false, timeout = 4 * 6000) {
  const head = await (finalized
    ? api.rpc.chain.getFinalizedHead()
    : api.rpc.chain.getHeader()
  );
  const chainHeight = head.number.toNumber();
  await checkUntil(
    async () => (await prpc.getInfo({})).blocknum > chainHeight,
    timeout,
  );
}

function hex(b) {
  if (typeof b !== 'string') {
    b = Buffer.from(b).toString('hex');
  }
  if (!b.startsWith('0x')) {
    return `0x${b}`;
  }
  return b;
}

export {
  TxQueue,
  sleep,
  checkUntil,
  checkUntilEq,
  blockBarrier,
  hex,
};
