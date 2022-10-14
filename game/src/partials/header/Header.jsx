import PropTypes from 'prop-types';

import HeaderBreadcrumb from './HeaderBreadcrumb';
import HeaderNavbar from './HeaderNavbar';

function Header({ breadcrumb = true }) {
  return (
    <header>
      <HeaderNavbar />

      {breadcrumb ? <HeaderBreadcrumb /> : ''}
    </header>
  );
}

Header.propTypes = {
  breadcrumb: PropTypes.bool,
};

export default Header;
