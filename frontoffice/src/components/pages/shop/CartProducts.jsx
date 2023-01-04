import CartProduct from './CartProduct';

function CartProducts({ products }) {
  return (
    <ul role="list" className="-my-6 divide-y divide-gray-200">
      {products.map((product) => (
        <CartProduct product={product} />
      ))}
    </ul>
  );
}

export default CartProducts;
