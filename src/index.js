import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './context/user_context';
// Domain : dev-jbi0b4a8.us.auth0.com
// ClientId : CGNfDmpzTPLaTmZO4ZHsi8PruvgB62CE

ReactDOM.render(
  <Auth0Provider
    domain="dev-jbi0b4a8.us.auth0.com"
    clientId="CGNfDmpzTPLaTmZO4ZHsi8PruvgB62CE"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
