import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ActionIcon, Drawer, Group } from '@mantine/core';
import { useEffect, useState } from 'react';

import { CartMainContent } from '@/app/cart/pages/cart-main-content';

export const HeaderCartDrawer = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Shopping cart"
        padding="xl"
        size="xl"
        overlayOpacity={0.55}
        transition="slide-right"
        transitionDuration={250}
        overlayBlur={3}
      >
        <CartMainContent open={opened} />
      </Drawer>
      <Group position="center">
        <ActionIcon
          color="dark"
          aria-label="Click to open the cart"
          onClick={() => setOpened(true)}
        >
          <ShoppingCartIcon />
        </ActionIcon>
      </Group>
    </>
  );
};
