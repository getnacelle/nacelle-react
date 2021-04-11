import React, { useState, useEffect, useContext } from 'react';
import * as styles from './AddressesForm.styles';
import { Button, TextInput } from '@nacelle/react-components';
import { AccountContext } from 'providers/Account';

const AddressesForm = ({ address }) => {
  const [formData, setFormData] = useState({
    address1: '',
    address2: '',
    city: '',
    company: '',
    country: 'US',
    firstName: '',
    lastName: '',
    phone: '',
    province: '',
    zip: ''
  });

  const [fetchedCountry, setFetchedCountry] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { accountData, accountDispatcher } = useContext(AccountContext);

  useEffect(() => {
    if (!accountData.countries.length) {
      accountDispatcher({
        type: 'FETCH_COUNTRIES'
      });
    }
  }, [accountData.countries, accountDispatcher]);

  useEffect(() => {
    if (formData.country && fetchedCountry !== formData.country) {
      setFetchedCountry(formData.country);
      accountDispatcher({
        type: 'FETCH_PROVINCES',
        payload: formData.country
      });
    }
  }, [
    formData.country,
    // accountData.countries,
    accountDispatcher,
    fetchedCountry
  ]);

  useEffect(() => {
    if (address) {
      setFormData({
        ...address,
        country: accountData.countries.find(
          (country) =>
            country.name === address.country ||
            country.shortName === address.country
        ).shortName
      });
      setIsEditing(true);
    }
  }, [address, accountData.countries]);

  const onInputChange = (evt) =>
    setFormData({ ...formData, [evt.target.name]: evt.target.value });

  const handleClick = async (evt) => {
    evt.preventDefault();
    if (isEditing) {
      const {
        id,
        address1,
        address2,
        city,
        company,
        country,
        firstName,
        lastName,
        phone,
        province,
        zip
      } = formData;
      await accountDispatcher({
        type: 'UPDATE_ADDRESS',
        payload: {
          address: {
            address1,
            address2,
            city,
            company,
            country,
            firstName,
            lastName,
            phone,
            province,
            zip
          },
          id
        }
      });
    } else {
      await accountDispatcher({
        type: 'CREATE_ADDRESS',
        payload: formData
      });
    }
  };

  return (
    <form css={styles.form}>
      <input type="hidden" name="form-name" value="address" />
      <input type="hidden" name="form_type" value="customer_address" />
      <input type="hidden" name="utf8" value="✓" />
      <TextInput
        type="text"
        name="address1"
        placeholder="Address"
        value={formData.address1}
        onChange={onInputChange}
      />
      <TextInput
        type="text"
        name="address2"
        placeholder="Suite, apt..."
        value={formData.address2}
        onChange={onInputChange}
      />
      <TextInput
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={onInputChange}
      />
      <TextInput
        type="text"
        name="zip"
        placeholder="Zip"
        value={formData.zip}
        onChange={onInputChange}
      />
      <select name="country" value={formData.country} onChange={onInputChange}>
        {accountData.countries.map((country, i) => (
          <option key={i} value={country.shortName}>
            {country.name}
          </option>
        ))}
      </select>

      {accountData.provinces && accountData.provinces.length && (
        <select
          name="province"
          value={formData.province}
          onChange={onInputChange}
        >
          {accountData.provinces.map((province, i) => (
            <option key={i} value={province}>
              {province}
            </option>
          ))}
        </select>
      )}

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
        value={formData.lastName}
        onChange={onInputChange}
      />
      <TextInput
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={onInputChange}
      />
      <TextInput
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={onInputChange}
      />
      <Button onClick={handleClick}> {isEditing ? 'Update' : 'Create'}</Button>
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

export default AddressesForm;
