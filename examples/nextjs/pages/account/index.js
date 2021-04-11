import React, { useEffect, useContext } from 'react';
import AccountLayout from 'components/Account/Layout/AccountLayout';
import AccountNavigation from 'components/Account/AccountNavigation/AccountNavigation';
import AccountDetails from 'components/Account/AccountDetails/AccountDetails';
import { AccountContext } from 'providers/Account';

import { get as getCookie } from 'es-cookie';

const Account = () => {
  const { accountData, accountDispatcher } = useContext(AccountContext);

  // useEffect(() => {
  //   if (accountData.loginStatus === 'loggedOut') {
  //     const customerAccessToken = getCookie('customerAccessToken');
  //     if (customerAccessToken) {
  //       accountDispatcher({
  //         type: 'TOKEN_LOGIN',
  //         payload: { customerAccessToken }
  //       });
  //     }
  //   }
  // }, [accountData, accountDispatcher]);
  return (
    <AccountLayout>
      <h1>Account</h1>
      <AccountNavigation />
      <AccountDetails />
    </AccountLayout>
  );
};

export default Account;
