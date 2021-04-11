import React, { useContext, useState, useEffect } from 'react';
import AccountLayout from 'components/Account/Layout/AccountLayout';
import AddressesForm from 'components/Account/Addresses/AddressesForm';
import AddressesItems from 'components/Account/Addresses/AddressesItems';
import { AccountContext } from 'providers/Account';

const Addresses = () => {
  const { accountData, accountDispatcher } = useContext(AccountContext);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!isFetched && accountData.customerAccessToken) {
      accountDispatcher({
        type: 'FETCH_ADDRESSES'
      });
    }
    setIsFetched(true);
  }, [accountDispatcher, accountData.customerAccessToken, isFetched]);

  return (
    <AccountLayout>
      <h1>Addresses</h1>
      {accountData.addresses.map((address, i) => (
        <AddressesItems key={i} address={address} />
      ))}
      <h2>Add New Address</h2>
      <AddressesForm />
    </AccountLayout>
  );
};

export default Addresses;
