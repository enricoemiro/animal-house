import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { GET_ALL_CATEGORIES_KEY, getAllCategories } from '@/api/categories/getAllCategories';
import {
  GET_PRODUCTS_BY_CATEGORY_KEY,
  getProductsByCategory,
} from '@/api/products/getProductsByCategory';

import { HorizontalNavigation } from '../../shared/partials/HorizontalNavigation';
import ProductCard from '../shop/ProductCard';

//import products from '../shop/products.json';

function HomePage() {
  const [cartProducts, setCartProducts] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13',
    'Item 14',
    'Item 15',
    'Item 16',
    'Item 17',
    'Item 18',
    'Item 19',
    'Item 20',
    'Item 21',
  ];

  const { isLoading, data: categories } = useQuery([GET_ALL_CATEGORIES_KEY], getAllCategories);

  const { data: products } = useQuery(
    [GET_PRODUCTS_BY_CATEGORY_KEY],
    () => getProductsByCategory(categoryId),
    {
      enabled: !!categoryId,
      onSuccess: () => setCategoryId(null),
    },
  );

  const onCategoryClick = (id, name) => {
    console.log(id);
    setCategoryId(id);
    setCategoryName(name);
  };

  function handleAddToCartButton(product) {
    const prevCart = cartProducts;
    const data = {
      name: product.name,
      image: product.image,
      stock: product.stock,
      price: product.price,
    };

    prevCart.push(data);
    setCartProducts(prevCart);
  }
  return (
    <>
      {categories && <HorizontalNavigation items={categories} onCategoryClick={onCategoryClick} />}

      {products && (
        <section>
          <div className="flex items-center mt-5">
            <h1 className="font-bold text-2xl">{'Prodotti per ' + categoryName}</h1>
          </div>
          <div className="flex items-center justify-center flex-wrap mt-5">
            <div className="grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-x-5 gap-y-3">
              {products.map((product) => (
                <ProductCard product={product} handleAddToCartButton={handleAddToCartButton} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default HomePage;
