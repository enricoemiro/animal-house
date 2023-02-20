import { Button, Divider, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useAuth } from '@/app/auth/use-auth.hook';
import { GET_PRODUCTS_BY_CATEGORY_KEY } from '@/app/ecommerce/api/get-products-by-category';
import { ErrorNotification } from '@/components/notifications/error-notification.component';
import { LoadingNotification } from '@/components/notifications/loading-notification.component';
import { SuccessNotification } from '@/components/notifications/success-notification.component';
import { queryClient } from '@/config/query';

import { CHECKOUT_KEY, checkout } from '../api/checkout';
import { CartProducts } from '../components/cart-products';

export const CartMainContent = ({ open }) => {
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState({ sub: 0, vipSub: 0 });

  const CHECKOUT_NOTIFICATION_ID = 'checkoutNotificationId';

  const {
    meQuery: { data: user },
  } = useAuth();

  const mutation = useMutation({
    mutationFn: async (query) => {
      return await checkout(query);
    },
    mutationKey: [CHECKOUT_KEY],

    onMutate: () => {
      showNotification(
        LoadingNotification({
          id: CHECKOUT_NOTIFICATION_ID,
        }),
      );
    },

    onSuccess: async (data) => {
      updateNotification(
        SuccessNotification({
          id: CHECKOUT_NOTIFICATION_ID,
          message: data,
        }),
      );
      updateSubtotal();
      setProducts(null);
      await queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS_BY_CATEGORY_KEY] });
    },
  });

  const handleCheckout = () => {
    let queryData = [];
    for (const key of Object.keys(products)) {
      queryData.push({
        productID: key,
        remainingQuantity: products[key].availability - products[key].buyedQuantity,
      });
    }
    if (queryData.length > 0) {
      localStorage.removeItem('cart-key');
    }
    mutation.mutate(queryData);
  };

  const updateSubtotal = () => {
    const storedProducts = JSON.parse(localStorage.getItem('cart-key'));
    let sub = 0;

    sub = checkSubtotal(storedProducts);
    if (storedProducts) {
      setProducts(storedProducts);
    }
    setSubtotal(sub);
  };

  useEffect(() => {
    updateSubtotal();
  }, [open]);

  const checkSubtotal = (prods) => {
    let sub = 0;
    let vipSub = 0;
    if (prods) {
      const keys = Object.keys(prods);
      keys.map((key) => {
        sub += prods[key].price * prods[key].buyedQuantity;
      });
    }
    if (user?.vip) {
      vipSub = sub - (sub * 10) / 100;
    }

    return { sub: sub, vipSub: vipSub };
  };

  const filterProductsById = (products, id) => {
    const keys = Object.keys(products).filter((key) => key !== id);
    let filteredProducts = {};
    for (const key of keys) {
      filteredProducts[key] = products[key];
    }
    return filteredProducts;
  };

  const onProductRemove = (productId) => {
    const storedCart = filterProductsById(JSON.parse(localStorage.getItem('cart-key')), productId);

    let sub = { sub: 0, vipSub: 0 };
    if (storedCart) {
      sub = checkSubtotal(storedCart);
    }
    setSubtotal(sub);
    setProducts(storedCart);
    localStorage.setItem('cart-key', JSON.stringify(storedCart));
  };

  return (
    <SimpleGrid cols={1}>
      {products && <CartProducts products={products} onProductRemove={onProductRemove} />}

      <Divider my="sm" label="Checkout" labelPosition="center" />
      <Stack>
        <Group>
          <Text fz="lg" fw="bold">
            Subtotal
          </Text>
          {user?.vip ? <Text>{subtotal.vipSub + '€'}</Text> : <Text>{subtotal.sub + '€'}</Text>}
        </Group>
        <Text fw="bold">
          {' '}
          Get a 10% discount on every order with a{' '}
          <Text span c="orange" inherit>
            VIP
          </Text>{' '}
          account.
        </Text>
        <Button radius="md" onClick={handleCheckout}>
          Checkout
        </Button>
      </Stack>
    </SimpleGrid>
  );
};
