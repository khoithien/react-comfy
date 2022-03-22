export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
  return newNumber;
};
// filter left
export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  return ['all', ...new Set(unique)];
};
