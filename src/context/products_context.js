import axios from "axios";

import React, { useContext, useEffect, useReducer } from "react";

import reducer from "../reducers/products_reducer";

import { products_url as url } from "../utils/constants";

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  // sidebar
  isSidebarOpen: false,
  
  // product
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [], // tạo sẵn mảng để lát filter cái featured cái nguyên cái api để map cho dễ.

  // single product
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  console.log("contextProduct");
  // qua index.js import bọc App.js
  // children ở đây là App.js đấy thay vì bọc trực tiếp thì chơi gián tiếp.
  const [state, dispatch] = useReducer(reducer, initialState);

  // sidebar
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  // fetch all product : fetch ngay khi component mount
  const fetchProduct = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN }); // để dùng cho spinner load
    try {
      const response = await axios.get(url); // data ở axios nó nằm ở data
      const products = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products }); // load xong bắn tín hiệu lên reducer là bố có data rồi đây xử lí đi.
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  // fetch single product : chỉ fetch khi đến đúng url single : `/products/${id}` ở SingleProductPage.js
  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN }); // để dùng cho spinner load
    try {
      const response = await axios.get(url); // data ở axios nó nằm ở data
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct }); // load xong bắn tín hiệu lên reducer là bố có data rồi đây xử lí đi.
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  /* hình như là nó render cái App.js trước rối mới đến cái context này
 tại nghi useEffect trước khi App được render không phải là lỗi sao 
 À console.log thì context chạy trước rồi mới đến App.js
 */
  useEffect(() => {
    fetchProduct(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children} {/* App.js */}
    </ProductsContext.Provider>
  );
};
// make sure use
// ở đâu cần prop thì import thằng này vô.
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
