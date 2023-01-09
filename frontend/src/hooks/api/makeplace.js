import useSWR from 'swr';

export const useMarketList = (params) => useSWR({
  url: '/saas3/dapi/list',
  params,
}, {
  fallbackData: { list: [], total: 0 },
});

export const useMarketDetail = (params) => useSWR({
  url: '/saas3/dapi/detail',
  params,
}, {
  fallbackData: {
    oracleInfo: {
      title: '--',
      web2Info: { },
      sourceChain: { },
      targetChain: { },
    },
    creator: {
      id: '--',
      name: '--',
      email: '--',
      github: '--',
      twitter: '--',
      telegram: '--',
      description: '--',
      wallets: [],
      oracles: null,
      create_at: '--',
      update_at: '--',
    },
  },
});
