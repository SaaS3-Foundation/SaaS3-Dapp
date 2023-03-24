import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { LocaleProvider } from '@douyinfe/semi-ui';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import { WagmiConfig } from 'wagmi';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { SWRConfig } from 'swr';
import Marketplace from './pages/marketplace';
import MarketplaceDetails from './pages/marketplace/details';
import Profile from './pages/profile';
import SelectPanels from './pages/deployOracles/SelectPanels';
import Deploy from './pages/deployOracles/deploy';
import Providers from './provider';
import { chains, wagmiClient } from './config/wagmiClient';
import axios from './utils/ajax';

const fetcher = (options) => axios({
  method: 'GET',
  ...options,
}).then((res) => {
  if (res.code === 200) {
    return res.data;
  }
  throw res;
});

function App() {
  return (
    <SWRConfig value={{
      errorRetryCount: 0,
      revalidateOnFocus: false,
      fetcher,
    }}
    >
      <LocaleProvider locale={en_US}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
            <Providers>
              <BrowserRouter>
                <Routes>
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/marketplace/details/:id" element={<MarketplaceDetails />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/deploy-oracles-panels" element={<SelectPanels />} />
                  <Route path="/deploy-oracles/:type" element={<Deploy />} />
                  <Route path="*" element={<Navigate to="/marketplace" />} />
                </Routes>
              </BrowserRouter>
            </Providers>
          </RainbowKitProvider>
        </WagmiConfig>
      </LocaleProvider>
    </SWRConfig>
  );
}

export default App;
