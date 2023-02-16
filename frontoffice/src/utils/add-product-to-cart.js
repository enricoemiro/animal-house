export const addProductToCart = (product, value) => {
  if (value > 0) {
    const storedCart = JSON.parse(localStorage.getItem('cart-key'));
    let prevCart = {};

    if (storedCart) {
      prevCart = storedCart;
    }

    prevCart[product.id] = {
      name: product.name,
      images: product.images,
      availability: product.availability,
      price: product.price,
      buyedQuantity: parseInt(value),
    };
    localStorage.setItem('cart-key', JSON.stringify(prevCart));
  }
};
