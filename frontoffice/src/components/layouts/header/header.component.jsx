import { Container, Flex, Group, Header as MantineHeader, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import { HeaderCartDrawer } from './header-cart-drawer';
import { HeaderLogo } from './header-logo.component';
import { HeaderMobileMenu } from './header-mobile-menu.component';
import { HeaderNavigationItem } from './header-navigation-item.component';
import { HeaderRightMenu } from './header-right-menu.component';

const navigation = [
  { label: 'Ecommerce', href: '/' },
  { label: 'Board', href: '/board' },
  { label: 'Activities', href: '/activities' },
  { label: 'Head Offices', href: '/headoffices' },
];

export const HEADER_HEIGHT = 75;

export const Header = () => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();

  const items = navigation?.map(({ label, href }) => {
    return <HeaderNavigationItem key={href} label={label} href={href} />;
  });

  return (
    <MantineHeader
      withBorder
      fixed={false}
      zIndex={1}
      height={HEADER_HEIGHT}
      sx={{ position: 'relative' }}
    >
      <Container size="lg" sx={{ display: 'flex', height: '100%' }}>
        <Group position="apart" sx={{ width: '100%' }}>
          <Flex align="center" justify="center" columnGap="md">
            {width <= theme.breakpoints.sm && <HeaderMobileMenu items={items} />}
            <HeaderLogo />
            {width > theme.breakpoints.sm && <Group spacing={5}>{items}</Group>}
          </Flex>

          <HeaderRightMenu />
        </Group>
      </Container>
    </MantineHeader>
  );
};
