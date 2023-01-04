import { Avatar, Button, DarkThemeToggle, Dropdown, Flowbite, Navbar } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <Navbar className="border-b py-5">
      <Link to="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          {import.meta.env.VITE_APP_NAME}
        </span>
      </Link>

      <div className="flex gap-x-3 items-center">
        <Flowbite>
          <DarkThemeToggle />
        </Flowbite>

        {user ? (
          <Dropdown
            id="user-settings-dropdown-menu"
            name="user settings dropdown menu"
            label={<Avatar alt="" />}
            arrowIcon={false}
            dismissOnClick={true}
            inline={true}
          >
            <Dropdown.Header>
              <span className="block text-sm">Signed in as</span>
              <span className="block truncate text-sm font-medium">{user?.email}</span>
            </Dropdown.Header>

            <Dropdown.Item onClick={() => navigate('/settings/profile')}>
              Your profile
            </Dropdown.Item>
            <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
          </Dropdown>
        ) : (
          <>
            <Button color="dark" onClick={() => navigate('/auth/register')}>
              Register
            </Button>

            <Button color="dark" outline={true} onClick={() => navigate('/auth/login')}>
              Login
            </Button>
          </>
        )}
      </div>
    </Navbar>
  );
}

export default Header;
