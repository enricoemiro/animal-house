import { useQuery } from '@tanstack/react-query';
import { Carousel } from 'flowbite-react';
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
  //960x384
  return (
    <>
      {categories && <HorizontalNavigation items={categories} onCategoryClick={onCategoryClick} />}
      <div className="flex justify-center">
        <div className="h-64 sm:h-64 xl:h-80 2xl:h-96 w-1/2 flex-none">
          <Carousel slideInterval={5000}>
            <img
              src="../images/homePage-1.jpeg"
              alt="A squirrel in a forest setting, perched on a tree branch."
            />
            <img
              src="../images/homePage-2.jpeg"
              alt="A sleeping cat, curled up in a cozy position."
            />
            <img
              src="../images/homePage-3.jpeg"
              alt="A rabbit with one ear perked up and the other drooping."
            />
            <img
              src="../images/homePage-4.jpeg"
              alt="A dove landing on a tree branch, wings spread and tail feathers ruffled."
            />
            <img
              src="../images/homePage-5.jpeg"
              alt="Turtles on a log in a lake, basking in the sun."
            />
            <img src="../images/homePage-6.jpeg" alt="A playful dog " />
          </Carousel>
        </div>
      </div>

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
