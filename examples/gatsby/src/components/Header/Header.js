import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { useCart } from '@nacelle/react-hooks';
import { Button, Image } from '@nacelle/react-components';

import SearchBar from 'components/SearchBar';
import * as styles from './Header.styles';

const MobileNav = ({ show, navItems, toggleNav, title }) => {
  const navStateStyle = show ? styles.show : styles.hide;

  return (
    <nav
      css={[styles.mobileNav, navStateStyle, !show && { boxShadow: 'none' }]}
    >
      <div css={styles.mobileNavHeader}>
        <Button styles={styles.closeButton} onClick={toggleNav}>
          <Image
            styles={styles.closeIcon}
            src="https://nacelle-assets.s3-us-west-2.amazonaws.com/default-close-icon.svg"
            alt="close the navigation"
          />
        </Button>
        <strong>{title}</strong>
      </div>
      <div css={styles.mobileNavItems}>
        {navItems.map((link, idx) => (
          <Link
            to={link.url}
            key={`${link.title}-${idx}`}
            onClick={toggleNav}
            activeStyle={{ color: '#ee7acb' }}
            css={styles.mobileNavLink}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

const DesktopNav = ({ navItems }) => {
  return (
    <nav css={styles.nav}>
      {navItems.map((link, idx) => (
        <Link
          to={link.url}
          key={`${link.title}-${idx}`}
          activeStyle={{ color: '#ee7acb' }}
          css={styles.navLink}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

const Header = ({ nav }) => {
  const [{ cart }, { toggleCart }] = useCart();
  const [showNav, setShowNav] = useState(false);
  const [showCartCount, setShowCartCount] = useState(false);
  const toggleNav = () => setShowNav((navState) => !navState);

  useEffect(() => {
    setShowCartCount(cart.length > 0);
  }, [cart]);
  const navItems = nav.items;

  return (
    <header css={styles.header}>
      <Button styles={styles.mobileMenuButton} onClick={toggleNav}>
        <span />
        <span />
        <span />
      </Button>
      <Link to="/" css={styles.name}>
        Example Store
      </Link>
      <MobileNav
        show={showNav}
        navItems={navItems}
        toggleNav={toggleNav}
        title="Example Store"
      />
      <DesktopNav navItems={navItems} />
      <div css={styles.buttons}>
        <SearchBar />
        <Button
          variant="secondary"
          styles={styles.cartButton}
          onClick={toggleCart}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            css={styles.cartIcon}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
            />
          </svg>
          {showCartCount && <span css={styles.cartCount}>{cart.length}</span>}
        </Button>
      </div>
    </header>
  );
};

export default Header;
