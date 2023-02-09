import { AppShell, Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { HEADER_HEIGHT, Header } from '@/components/layouts/header/header.component';

const navigation = [
  { label: 'Ecommerce', href: '/' },
  { label: 'Board', href: '/board' },
  { label: 'Activities', href: '/activities' },
  { label: 'Head Offices', href: '/headoffices' },
];

export const AppOutlet = () => {
  return (
    <AppShell
      padding={-HEADER_HEIGHT}
      header={<Header navigation={navigation} />}
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
      })}
    >
      <Container
        size="lg"
        sx={(theme) => ({
          paddingTop: theme.spacing.xl * 1.5,
          paddingBottom: theme.spacing.xl * 1.5,
        })}
      >
        <Outlet />
      </Container>
    </AppShell>
  );
};
