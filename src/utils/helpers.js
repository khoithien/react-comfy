export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};
// filter left
export const getUniqueValues = (data, type) => {
  // console.log(data, type) [{...}]
  let unique = data.map((item) => item[type]);
  // console.log(unique) [...]
  // riêng color thì nó hơi đặc biệt vì nó là array chồng array nên nó ra [[...]]
  // if (type === "colors") {
  //   unique = unique.flat(); // flat() chuyển thành array từ array of array
  // }
  return ["all", ...new Set(unique)]; // ["all", "ikea","macros","liddy","caressa"] array unique của category.
};
