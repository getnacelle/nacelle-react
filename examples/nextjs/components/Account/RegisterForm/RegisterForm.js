import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import * as styles from './RegisterForm.styles';
import { Button, TextInput } from '@nacelle/react-components';
import { AccountContext } from 'providers/Account';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [hasSubmited, setHasSubmited] = useState(false);
  const { accountData, accountDispatcher } = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    if (!accountData.userErrors.length && hasSubmited) {
      router.push('/');
    }
  }, [accountData.userErrors, hasSubmited, router]);

  const onInputChange = (evt) =>
    setFormData({ ...formData, [evt.target.name]: evt.target.value });

  const handleClick = async (evt) => {
    evt.preventDefault();
    await accountDispatcher({
      type: 'REGISTER',
      payload: formData
    });
    setHasSubmited(true);
  };
  return (
    <form css={styles.form}>
      <input type="hidden" name="form_type" value="create_customer" />
      <input type="hidden" name="utf8" value="✓" />
      <input type="hidden" name="return_url" value="/account" />

      <TextInput
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={onInputChange}
      />
      <TextInput
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={onInputChange}
      />
      <TextInput
        type="text"
        name="email"
        placeholder="email"
        onChange={onInputChange}
      />
      <TextInput
        type="password"
        name="password"
        placeholder="password"
        onChange={onInputChange}
      />
      <Button onClick={handleClick}>Create</Button>
      {accountData.userErrors.length > 0 && (
        <ul>
          {accountData.userErrors.map((error, key) => (
            <li css={styles.errorMessage} key={key}>
              {error.message}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default RegisterForm;
