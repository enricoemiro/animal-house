import { CurrencyEuroIcon, ShoppingCartIcon } from '@heroicons/react/20/solid';
import PropTypes, { string } from 'prop-types';

/**
 * Product card with information and purchase options.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.product - Object representing the product.
 * @param {string} props.product.name - Product name.
 * @param {number} props.product.price - Product price.
 * @param {number} props.product.stock - Available quantity of the product.
 * @param {Array} props.product.images - URL of the product image.
 * @param {function} props.onAddToCart - Callback function for adding the product to the cart.
 */
function ProductCard({ product, onAddToCart }) {
  /**
   * Handles the click event on the add to cart button.
   *
   * @param {Event} event - Click event on the element.
   */
  function handleAddToCart(e) {
    e.preventDefault();
    onAddToCart(product);
  }

  return (
    <div className="rounded border">
      <img className="w-64 rounded" crossOrigin="use-credentials" src={product.images[0]} />

      <div className="p-3 flex flex-col bg-gray-200">
        <h1 className="font-bold">{product.name}</h1>
        <p className="font-bold">Stock: {product.availability}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <CurrencyEuroIcon className="w-6" />
            <span>{product.price}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="hover:scale-[1.1] transition-all ease-in-out bg-yellow-300 p-1 rounded-md"
          >
            <ShoppingCartIcon className="w-5 h-5 " />
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(string),
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
