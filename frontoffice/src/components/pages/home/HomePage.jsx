import { useState } from 'react';

import { HorizontalNavigation } from '../../shared/partials/HorizontalNavigation';
import ProductCard from '../shop/ProductCard';
import products from '../shop/products.json';

function HomePage() {
  const [cartProducts, setCartProducts] = useState([]);
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
      <HorizontalNavigation items={items} />

      <section>
        <div className="flex items-center justify-center flex-wrap mt-5">
          <div className="grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-x-5 gap-y-3">
            {products.data.map((product) => (
              <ProductCard product={product} handleAddToCartButton={handleAddToCartButton} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
