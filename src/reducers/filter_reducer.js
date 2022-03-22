import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      // filter left
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },
    };
  }

  // click view
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  // Sort By ...
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    // sort by functionality
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    // localeCompare method : sort theo ký tự
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    return { ...state, filtered_products: tempProducts };
  }

  // filter left
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    console.log(name, value);
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    // filter right functionality
    const { all_products } = state;
    const { text, category, company, price, shipping } = state.filters;

    let tempProducts = [...all_products];
    // filtering functionality
    // filter text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    // filter category
    if (category !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category;
      });
    }
    // filter company
    if (company !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company;
      });
    }

    // price
    tempProducts = tempProducts.filter((product) => product.price <= price);

    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true);
    }
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
