import { Button, SimpleGrid, Stack } from '@mantine/core';

import { CartProduct } from './cart-product';

export const CartProducts = ({ products, onProductRemove }) => {
  return (
    <Stack justify="flex-start" spacing="lg">
      {Object.keys(products).map((key) => (
        <CartProduct key={key} product={products[key]} onProductRemove={onProductRemove} id={key} />
      ))}
    </Stack>
  );
};
