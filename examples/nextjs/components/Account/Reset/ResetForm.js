import React, { useState, useEffect, useContext } from 'react';
import * as styles from './ResetForm.styles';
import { Button, TextInput } from '@nacelle/react-components';
import Link from 'next/link';
import { AccountContext } from 'providers/Account';
import { useRouter } from 'next/router';

const ResetForm = () => {
  const [password, setPassword] = useState('');
  const [hasSubmited, setHasSubmited] = useState(false);
  const { accountData, accountDispatcher } = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    if (!accountData.userErrors.length && hasSubmited) {
      // router.push('/account');
      //TODO HANDLE DONE
    }
  }, [accountData.userErrors, hasSubmited, router]);

  const onInputChange = (evt) => setPassword(evt.target.value);

  const handleClick = async (evt) => {
    evt.preventDefault();
    await accountDispatcher({
      type: 'RESET',
      payload: {
        password,
        resetToken: router.query.token,
        customerId: router.query.id
      }
    });
    setHasSubmited(true);
  };

  return (
    <form css={styles.form}>
      <TextInput
        type="text"
        name="password"
        placeholder="password"
        onChange={onInputChange}
      />
      <Button onClick={handleClick}>Reset</Button>
      {accountData.userErrors.length > 0 && (
        <ul>
          {accountData.userErrors.map((error, key) => (
            <li css={styles.errorMessage} key={key}>
              {error.message}
            </li>
          ))}
        </ul>
      )}
      <p>
        <Link href="/account/login">
          <a>Cancel</a>
        </Link>
      </p>
    </form>
  );
};

export default ResetForm;
