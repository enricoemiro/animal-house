import { Burger, Paper, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { HEADER_HEIGHT } from './header.component';

export const HeaderMobileMenu = ({ items }) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Burger opened={opened} onClick={toggle} size="sm" />

      <Transition transition="pop-top-right" duration={200} mounted={opened}>
        {(styles) => (
          <Paper
            withBorder
            style={styles}
            sx={{
              position: 'absolute',
              top: HEADER_HEIGHT,
              left: 0,
              right: 0,
              zIndex: 0,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              borderTopWidth: 0,
              overflow: 'hidden',
            }}
          >
            {items}
          </Paper>
        )}
      </Transition>
    </>
  );
};
