import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { LocaleProvider } from '@douyinfe/semi-ui';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import { WagmiConfig } from 'wagmi';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import Marketplace from './pages/marketplace';
import MarketplaceDetails from './pages/marketplace/details';
import Profile from './pages/profile';
import SelectPanels from './pages/deployOracles/SelectPanels';
import Deploy from './pages/deployOracles/deploy';
import Providers from './provider';
import { wagmiClient } from './config/wagmiClient';
import { EVMNETWORKS } from './config/network';

function App() {
  return (
    <LocaleProvider locale={en_US}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={Object.keys(EVMNETWORKS).map((key) => EVMNETWORKS[key].chain)} theme={darkTheme()}>
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
  );
}

export default App;
