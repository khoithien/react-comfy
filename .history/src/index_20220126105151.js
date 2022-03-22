import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";



ReactDOM.render(
  <Auth0Provider
    domain="dev-5vl4as9o.us.auth0.com"
    clientId="ZnXcE4jybdSqFm2fjHpSeKxynFzt6XfE"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"  // mỗi khi login mới là tự động lưu vào localStorage
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
  document.getElementById("root")
);
