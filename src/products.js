// Sample catalogue for the grocery mart. Replace with a database lookup when one exists.
const products = [
  { id: 1, name: 'Whole Milk', category: 'Dairy', price: 3.49, unit: '1 L', inStock: true },
  { id: 2, name: 'Cheddar Cheese', category: 'Dairy', price: 5.99, unit: '250 g', inStock: true },
  { id: 3, name: 'Free-Range Eggs', category: 'Dairy', price: 4.25, unit: 'dozen', inStock: true },
  { id: 4, name: 'Sourdough Loaf', category: 'Bakery', price: 4.75, unit: '1 loaf', inStock: true },
  { id: 5, name: 'Bananas', category: 'Produce', price: 0.29, unit: 'each', inStock: true },
  { id: 6, name: 'Baby Spinach', category: 'Produce', price: 2.99, unit: '150 g', inStock: false },
  { id: 7, name: 'Roma Tomatoes', category: 'Produce', price: 3.10, unit: 'kg', inStock: true },
  { id: 8, name: 'Chicken Breast', category: 'Meat', price: 7.80, unit: 'kg', inStock: true },
  { id: 9, name: 'Basmati Rice', category: 'Pantry', price: 6.20, unit: '2 kg', inStock: true },
  { id: 10, name: 'Olive Oil', category: 'Pantry', price: 9.50, unit: '500 ml', inStock: true },
];

function getProducts({ category, inStock } = {}) {
  return products.filter(
    (product) =>
      (category === undefined || product.category.toLowerCase() === category.toLowerCase()) &&
      (inStock === undefined || product.inStock === inStock),
  );
}

module.exports = { products, getProducts };
