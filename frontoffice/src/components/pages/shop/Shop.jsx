import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { Button } from 'flowbite-react';
import { useState } from 'react';

import Cart from './Cart';
import ProductCard from './ProductCard';
import products from './products.json';

function Shop() {
  const [prodToShow, setProdToShow] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [open, setOpen] = useState(false);

  //function filterProductsByCategory(products) {
  //  const data = {};
  //
  //  for (const product of products) {
  //
  //  }
  //
  //}

  function handleCartButtons(value) {
    setOpen(value);
  }

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
    <div>
      <Button
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          handleCartButtons(true);
        }}
      >
        <ShoppingCartIcon className="w-5 h-5" />
      </Button>

      <Cart open={open} handleCartButtons={handleCartButtons} />

      <div className="flex flex-row items-center justify-start mt-7">
        <h1 className="font-sans text-2xl subpixel-antialiased font-bold">Products</h1>
      </div>

      <div className="flex items-center justify-center flex-wrap mt-5">
        <div className="grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-x-5 gap-y-3">
          {products.data.map((product) => (
            <ProductCard product={product} handleAddToCartButton={handleAddToCartButton} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
