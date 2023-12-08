import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './Context/CartContext';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CartProvider>
    <BrowserRouter>
      <Loading status = 'true'></Loading>
      <ScrollToTop></ScrollToTop>
      <React.Suspense fallback="loading">
        <App />
      </React.Suspense>
    </BrowserRouter>
  </CartProvider>
  
);

