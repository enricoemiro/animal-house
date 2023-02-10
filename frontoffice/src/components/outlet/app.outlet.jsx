import { AppShell, Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { HEADER_HEIGHT, Header } from '@/components/layouts/header/header.component';

export const AppOutlet = () => {
  return (
    <AppShell
      padding={-HEADER_HEIGHT}
      header={<Header />}
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
