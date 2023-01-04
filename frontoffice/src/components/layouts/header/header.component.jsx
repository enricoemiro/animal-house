import {
  Anchor,
  Burger,
  Button,
  Container,
  Group,
  Header as MantineHeader,
  Paper,
  Title,
  Transition,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/app/auth/use-auth.hook';

import { HeaderNavigationItem } from './header-navigation-item.component';
import { HeaderProfileDropdown } from './header-profile-dropdown.component';

export const HEADER_HEIGHT = 75;

export const Header = ({ navigation } = {}) => {
  const navigate = useNavigate();
  const {
    meQuery: { data: user },
  } = useAuth();

  const [opened, { toggle }] = useDisclosure(false);

  const items = navigation?.map(({ label, href }) => {
    return <HeaderNavigationItem key={href} label={label} href={href} />;
  });

  const authButtons = (
    <Group spacing={10}>
      <Button variant="default" onClick={() => navigate('/auth/register')}>
        Register
      </Button>

      <Button onClick={() => navigate('/auth/login')}>Log in</Button>
    </Group>
  );

  return (
    <MantineHeader
      withBorder
      height={HEADER_HEIGHT}
      sx={{
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Container
        size="lg"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Group sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/** Hamburger menu */}
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            sx={(theme) => ({
              [theme.fn.largerThan('sm')]: {
                display: 'none',
              },
            })}
          />

          <Title size="h3">
            <Anchor
              variant="text"
              component="a"
              color="dark"
              onClick={() => navigate('/')}
              sx={{
                fontFamily: 'Pacifico',
              }}
            >
              Animal House
            </Anchor>
          </Title>

          {/** Browser navigation */}
          <Group
            spacing={5}
            sx={(theme) => ({
              [theme.fn.smallerThan('sm')]: {
                display: 'none',
              },
            })}
          >
            {items}
          </Group>
        </Group>

        <div>{!user ? authButtons : <HeaderProfileDropdown />}</div>

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper
              withBorder
              style={styles}
              sx={(theme) => ({
                position: 'absolute',
                top: HEADER_HEIGHT,
                left: 0,
                right: 0,
                zIndex: 0,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                borderTopWidth: 0,
                overflow: 'hidden',

                [theme.fn.largerThan('sm')]: {
                  display: 'none',
                },
              })}
            >
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </MantineHeader>
  );
};
