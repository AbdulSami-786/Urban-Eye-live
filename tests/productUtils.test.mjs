import test from 'node:test';
import assert from 'node:assert/strict';
import { applyProductFilters, sortProducts, formatPriceValue, getProductDiscountPercent } from '../src/services/productUtils.js';

const products = [
  { id: 'b', name: 'Beta', category: 'Optical', subcategory: 'Round', gender: 'Men', price: 12000, discountPrice: 12000, rating: 4.2, brand: 'A', sizes: ['48 (Medium)'], availability: 'In stock', keywords: ['vintage'] },
  { id: 'a', name: 'Alpha', category: 'Sunglasses', subcategory: 'Square', gender: 'Women', price: 9000, discountPrice: 9000, rating: 4.8, brand: 'B', sizes: ['50 (Medium)'], availability: 'Limited', keywords: ['modern'] },
  { id: 'c', name: 'Gamma', category: 'Optical', subcategory: 'Aviator', gender: 'Unisex', price: 15000, discountPrice: 15000, rating: 5, brand: 'A', sizes: ['52 (Medium)'], availability: 'In stock', keywords: ['sport'] },
];

test('sortProducts supports alphabetical and date ordering', () => {
  const sorted = sortProducts(products, 'alphaAZ').map((product) => product.id);
  assert.deepEqual(sorted, ['a', 'b', 'c']);

  const newest = sortProducts(products, 'dateNew').map((product) => product.id);
  assert.deepEqual(newest, ['c', 'a', 'b']);
});

test('applyProductFilters supports gender, shape, and search filters', () => {
  const filtered = applyProductFilters(products, { gender: ['Men'], shape: ['Round'] }, 'featured', 'vintage');
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].id, 'b');
});

test('formatPriceValue handles missing values safely', () => {
  assert.equal(formatPriceValue(undefined), '0');
  assert.equal(formatPriceValue(12500), '12,500');
});

test('getProductDiscountPercent falls back to the catalog price automatically', () => {
  assert.equal(getProductDiscountPercent({ price: 10000 }), 0);
  assert.equal(getProductDiscountPercent({ price: 10000, discountPrice: 8000 }), 20);
});
