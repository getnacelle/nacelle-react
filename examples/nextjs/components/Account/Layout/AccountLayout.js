import React, { useState, useEffect, useContext } from 'react';
import * as styles from './AccountLayout.styles';
import { useRouter } from 'next/router';
import { AccountContext } from 'providers/Account';
import { get as getCookie } from 'es-cookie';

const AccountLayout = ({ children }) => {
  const { accountData, accountDispatcher } = useContext(AccountContext);
  const [isReady, setIsReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    //TODO Reformat
    if (
      router.pathname.includes('account') &&
      !(
        router.pathname.includes('login') ||
        router.pathname.includes('register') ||
        router.pathname.includes('recover') ||
        router.pathname.includes('reset')
      )
    ) {
      if (accountData.loginStatus === 'loggedOut') {
        const customerAccessToken = getCookie('customerAccessToken');
        if (customerAccessToken) {
          console.log(customerAccessToken);
          accountDispatcher({
            type: 'TOKEN_LOGIN',
            payload: { customerAccessToken }
          });
        } else {
          router.push('/account/login');
        }
      }
      setIsReady(true);
    } else if (
      router.pathname.includes('login') ||
      router.pathname.includes('register') ||
      router.pathname.includes('recover') ||
      router.pathname.includes('reset')
    ) {
      console.log('READY');
      setIsReady(true);
    }
  }, [accountData.loginStatus, accountDispatcher, router]);

  return (
    <section>
      <div css={styles.container}>{isReady && children}</div>
    </section>
  );
};

export default AccountLayout;
