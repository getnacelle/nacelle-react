import React, { useEffect, useState, useContext } from 'react';
import { Button, TextInput } from '@nacelle/react-components';
import * as styles from './CustomerForm.styles';
import { AccountContext } from 'providers/Account';

const CustomerForm = ({ customer }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    acceptsMarketing: false
  });
  const [hasSubmited, setHasSubmited] = useState(false);
  const { accountData, accountDispatcher } = useContext(AccountContext);

  useEffect(() => {
    if (!accountData.userErrors.length && hasSubmited) {
      // router.push('/');
      //TODO handle success
    }
  }, [accountData.userErrors, hasSubmited]);

  useEffect(() => {
    setFormData(customer);
  }, [customer]);

  const onInputChange = (evt) => {
    if (evt.target.name === 'acceptsMarketing') {
      setFormData({
        ...formData,
        acceptsMarketing: !formData.acceptsMarketing
      });
    } else {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
    }
  };
  const handleClick = async (evt) => {
    evt.preventDefault();
    // console.log(formData);
    await accountDispatcher({
      type: 'UPDATE_CUSTOMER',
      payload: { customer: formData }
    });
    setHasSubmited(true);
  };

  return (
    <div>
      <h1>Customer Form</h1>
      <form css={styles.form}>
        <TextInput
          type="text"
          name="firstName"
          placeholder="firstName"
          value={formData.firstName}
          onChange={onInputChange}
        />
        <TextInput
          type="text"
          name="firstName"
          placeholder="firstName"
          value={formData.lastName}
          onChange={onInputChange}
        />

        <TextInput
          type="text"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={onInputChange}
        />
        <input
          type="checkbox"
          name="acceptsMarketing"
          checked={formData.acceptsMarketing}
          onChange={onInputChange}
        />
        <label htmlFor="acceptsMarketing">Accepts Marketing</label>

        <Button onClick={handleClick}>Update Profile</Button>
      </form>
    </div>
  );
};

export default CustomerForm;
