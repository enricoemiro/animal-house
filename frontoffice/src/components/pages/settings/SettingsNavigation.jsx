import { BuildingOfficeIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  {
    name: 'Profile',
    href: '/settings/profile',
    icon: UserCircleIcon,
  },
  {
    name: 'Orders',
    href: '/settings/orders',
    icon: ShoppingBagIcon,
  },
  {
    name: 'Booked Services',
    href: '/settings/booked/services',
    icon: BuildingOfficeIcon,
  },
];

function SettingsNavigation() {
  const { pathname } = useLocation();

  return (
    <nav
      role="navigation"
      aria-label="Navigation for user's profile, orders and services"
      className="space-y-1"
    >
      {navigation.map((item) => {
        const isActive = item.href === pathname;

        return (
          <Link
            key={item.name}
            to={item.href}
            className={classNames(
              isActive
                ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
              'focus:text-teal-700 group border-l-4 px-3 py-2 flex items-center text-sm font-medium',
            )}
            tabIndex={0} // Allows users with motor disabilities to navigate through the navigation elements using the keyboard
            aria-label={`${item.name}'s section`}
            aria-current={isActive ? 'page' : undefined}
          >
            <item.icon
              className={classNames(
                isActive
                  ? 'text-teal-500 group-hover:text-teal-500'
                  : 'text-gray-400 group-hover:text-gray-500',
                'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
              )}
              aria-hidden="true"
            />

            <span className="truncate">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export { SettingsNavigation };
