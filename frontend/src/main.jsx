import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Marketplace from './pages/marketplace';

import './index.less';
import MarketplaceDetails from './pages/marketplace/details';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/marketplace/details/:id" element={<MarketplaceDetails />} />
      <Route path="*" element={<Navigate to="/marketplace" />} />
    </Routes>
  </BrowserRouter>,
);
