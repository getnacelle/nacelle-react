import React, { useContext } from 'react';
import { Button } from '@nacelle/react-components';
import { useRouter } from 'next/router';
import { AccountContext } from 'providers/Account';
import Link from 'next/link';

const AccountNavigation = () => {
  const { accountDispatcher } = useContext(AccountContext);
  const router = useRouter();

  const logout = async () => {
    await accountDispatcher({
      type: 'LOGOUT'
    });
    router.push('/');
  };

  return (
    //     <nuxt-link to="/account" class="button">Account Details</nuxt-link>
    // <nuxt-link to="/account/orders" class="button">Orders</nuxt-link>
    // <nuxt-link to="/account/addresses" class="button">Addresses</nuxt-link>

    <div>
      <h1>AccountNavigation</h1>
      <ul>
        <li>
          <Link href="/account">
            <a>Account</a>
          </Link>
        </li>
        <li>
          <Link href="/account/orders">
            <a>Order</a>
          </Link>
        </li>
        <li>
          <Link href="/account/addresses">
            <a>Addresses</a>
          </Link>
        </li>
      </ul>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default AccountNavigation;
