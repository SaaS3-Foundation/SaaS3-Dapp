import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { LocaleProvider } from '@douyinfe/semi-ui';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import Marketplace from './pages/marketplace';

import './index.less';
import MarketplaceDetails from './pages/marketplace/details';
import Profile from './pages/profile';
import SelectPanels from './pages/deployOracles/SelectPanels';
import Deploy from './pages/deployOracles/deploy';

ReactDOM.createRoot(document.getElementById('root')).render(
  <LocaleProvider locale={en_US}>
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
  </LocaleProvider>,
);
