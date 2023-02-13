import { ArrowLeftOnRectangleIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';
import { Menu } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/app/auth/use-auth.hook';
import { UserButton } from '@/components/buttons/user-button.component';

/**
 * @param {import('@mantine/core').MenuProps} props - Props
 */
export const HeaderProfileDropdown = (props) => {
  const {
    meQuery: { data: user },
    logoutQuery: { refetch: logout },
  } = useAuth();

  const navigate = useNavigate();

  return (
    <Menu
      withArrow
      width="target"
      shadow="xs"
      position="bottom-end"
      transition="pop-top-right"
      arrowPosition="side"
      offset={5}
      {...props}
    >
      <Menu.Target>
        <UserButton name={user.name} email={user.email} />
      </Menu.Target>

      <Menu.Dropdown
        sx={(theme) => ({
          [theme.fn.smallerThan('md')]: {
            minWidth: '200px',
          },
        })}
      >
        <Menu.Item icon={<Cog8ToothIcon width={20} />} onClick={() => navigate('/profile')}>
          Profile
        </Menu.Item>

        <Menu.Item icon={<ArrowLeftOnRectangleIcon width={20} />} onClick={() => logout()}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
