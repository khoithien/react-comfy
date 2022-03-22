import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    // kiếm cái giá tiền cao nhất cho cái input type='range' của filter left và spread để hoạt động được.
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    // console.log(maxPrice);
    return {
      ...state,
      all_products: [...action.payload], // spread để khi clear filter quay về default và trành cái reference.
      filtered_products: [...action.payload], // spread để khi clear filter quay về default và trành cái reference.
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
    const { sort, filtered_products } = state; // cái sort lấy từ cái action UPDATE_SORT ở trên
    let tempProducts = [...filtered_products]; // john said : phòng khi có lỗi gì đó nếu để empty array thành nó sẽ không hiển thị gì cả trông hơi kì.
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price); // a-b = âm thì a đứng trước b và ngược lại
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    // localeCompare method : sort theo ký tự
    if (sort === "name-a") {
      // sort theo từ a.name đến b.name
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    return { ...state, filtered_products: tempProducts }; // john said : phòng khi có lỗi gì đó nếu để empty array thành nó sẽ không hiển thị gì cả trông hơi kì.
  }

  // filter left
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    console.log(name, value);
    return { ...state, filters: { ...state.filters, [name]: value } }; // dynamic name property ( happend in real time)
  }

  if (action.type === FILTER_PRODUCTS) {
    // console.log("filtering products");  mỗi lần thay đổi các filter thì useEffect chạy fetch lại product theo filter.
    // filter right functionality
    const { all_products } = state; // đây là array dự phòng để quay lại ban đầu
    const { text, category, company, price, shipping } = state.filters; // các filter để ở array filter này

    let tempProducts = [...all_products];
    // filtering functionality
    // filter text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    // filter category
    if (category !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category;
      });
    }
    // filter company
    if (company !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company;
      });
    }
    
    // colors
    // if (color !== "all") {
    //   tempProducts = tempProducts.filter((product) => {
    //     return product.colors.find((c) => c === color);
    //   });
    // }

    // price
    tempProducts = tempProducts.filter((product) => product.price <= price);

    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
