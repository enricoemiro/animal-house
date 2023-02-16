import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ActionIcon, Button, Group, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRef, useState } from 'react';

import { addProductToCart } from '@/utils/add-product-to-cart';

export const QuantitySelector = ({ product }) => {
  const [value, setValue] = useState(0);
  const handlers = useRef(null);

  const form = useForm({
    initialValues: {
      quantity: 0,
    },
  });

  const onAddToCart = (values) => {
    addProductToCart(product, values.quantity);
  };

  return (
    <form onSubmit={form.onSubmit(onAddToCart)}>
      <Group position="apart">
        <Group spacing={0}>
          <ActionIcon
            size={35}
            aria-label="Decrement product quantity"
            variant="default"
            onClick={() => handlers.current.decrement()}
          >
            –
          </ActionIcon>

          <NumberInput
            aria-label="Selected quantity"
            hideControls
            value={value}
            onChange={(val) => setValue(val)}
            handlersRef={handlers}
            max={product.availability}
            min={0}
            step={1}
            styles={{ input: { width: 54, height: 35, textAlign: 'center' } }}
            {...form.getInputProps('quantity')}
          />

          <ActionIcon
            size={35}
            variant="default"
            aria-label="Increment product quantity"
            onClick={() => handlers.current.increment()}
          >
            +
          </ActionIcon>
        </Group>
        <Button
          disabled={product.availability > 0 ? false : true}
          color="yellow"
          radius="md"
          type="submit"
          leftIcon={<ShoppingCartIcon width={20} height={20} />}
        >
          Buy
        </Button>
      </Group>
    </form>
  );
};
