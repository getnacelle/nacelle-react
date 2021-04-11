import React, { useState, useEffect, useContext } from 'react';
import CustomerForm from 'components/Account/CustomerForm/CustomerForm';
import { AccountContext } from 'providers/Account';

const AccountDetails = () => {
  const { accountData } = useContext(AccountContext);
  return (
    <div>
      {accountData && accountData.customer && (
        <div>
          <h3>Details</h3>
          <div>
            <p>{accountData.customer.firstName}</p>
            <p>{accountData.customer.lastName}</p>
            <p>{accountData.customer.email}</p>
          </div>

          <CustomerForm customer={accountData.customer} />
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
