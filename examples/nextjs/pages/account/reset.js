// https://socialauth.commercejam.com/account/reset/?id=5094637994043&token=ea62112d15240b89dc57e5c8e18fbe92-1617777171

import React from 'react';
import AccountLayout from 'components/Account/Layout/AccountLayout';
import ResetForm from 'components/Account/Reset/ResetForm';

const Reset = () => {
  return (
    <AccountLayout>
      <h1>Reset</h1>
      <ResetForm />
    </AccountLayout>
  );
};

export default Reset;
