import React, { useEffect, useContext, useReducer } from "react";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

import { useProductsContext } from "./products_context";

import reducer from "../reducers/filter_reducer";

const initialState = {
  // product
  filtered_products: [], // dùng cho tất cả các filter trừ clearFilter ra.
  all_products: [], // dùng để dự phòng khi quay lại default các product chứ filter hết rồi sau quay lại được.

  // View
  grid_view: true,

  // sort filter
  sort: "price-lowest", // trùng với cái value của option tag

  // filter left : thay vì làm 10 cái useState thì dùng useState Object.
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext(); // lấy product từ product_context xài
  const [state, dispatch] = useReducer(reducer, initialState);

  // load products
  useEffect(() => {
    // lấy product từ product_context xài
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]); // phải theo dõi cái product vì chưa biết khi nào nó fetch xong ở thằng product_context

  // sort by functionality
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS }); // filter left : filter trước rồi mới sort sau.
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  // GridView and ListView
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  // Sort By ...
  const updateSort = (e) => {
    // for demonstration
    // const name = e.target.name;  chỉ cần khi có nhiều cái name ở đây chỉ có mỗi cái select sort by thôi.
    const value = e.target.value;
    // console.log(value);
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  // filter left
  const updateFilters = (e) => {
    let name = e.target.name; // cái name attribute ở mấy cái input hay button...
    let value = e.target.value;
    if (name === "category") {
      // cái name ở button
      // do không thể truy cập cái value của button ( vì button không có attribute value như mấy thằng input hay option ) bằng e.target.value nên phải dùng textContent
      value = e.target.textContent; // lấy cái textContent khi nhấn vô tại nhấn vô nó là empty string.
    }
    // if (name === "color") {
    //   value = e.target.dataset.color;
    // }
    if (name === "price") {
      value = Number(value);  // cái input type range nó return về string nên ta convert về number.
      // console.log(value)
    }
    if (name === "shipping") {
      value = e.target.checked; // khi ân tick vô thì thành true.
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  // clearFilters
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
