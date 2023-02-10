import { Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/app/auth/use-auth.hook';

import { HeaderProfileDropdown } from './header-profile-dropdown.component';

export const HeaderRightMenu = () => {
  const navigate = useNavigate();

  const {
    meQuery: { data: user },
  } = useAuth();

  if (user) {
    return <HeaderProfileDropdown />;
  }

  return (
    <Group spacing={10}>
      <Button variant="default" onClick={() => navigate('/auth/register')}>
        Register
      </Button>

      <Button onClick={() => navigate('/auth/login')}>Log in</Button>
    </Group>
  );
};
