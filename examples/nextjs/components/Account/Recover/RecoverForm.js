import React, { useState, useEffect, useContext } from 'react';
import * as styles from './RecoverForm.styles';
import { Button, TextInput } from '@nacelle/react-components';
import Link from 'next/link';
import { AccountContext } from 'providers/Account';
import { useRouter } from 'next/router';

const RecoverForm = () => {
  const [email, setEmail] = useState('');
  const [hasSubmited, setHasSubmited] = useState(false);
  const { accountData, accountDispatcher } = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    if (!accountData.userErrors.length && hasSubmited) {
      // router.push('/account');
      //TODO SHOW MESSAGE TO CHECK MAILS
    }
  }, [accountData.userErrors, hasSubmited, router]);

  const onInputChange = (evt) => setEmail(evt.target.value);

  const handleClick = async (evt) => {
    evt.preventDefault();
    await accountDispatcher({
      type: 'RECOVER',
      payload: { email }
    });
    setHasSubmited(true);
  };

  return (
    <form css={styles.form}>
      <p> We will send you an email to reset your password.</p>
      <TextInput
        type="text"
        name="email"
        placeholder="email"
        onChange={onInputChange}
      />
      <Button onClick={handleClick}>Recover</Button>
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

export default RecoverForm;
