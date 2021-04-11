import React from 'react';
import AccountLayout from 'components/Account/Layout/AccountLayout';
import RecoverForm from 'components/Account/Recover/RecoverForm';
const Recover = () => {
  return (
    <AccountLayout>
      <h1>Recover</h1>
      <RecoverForm />
    </AccountLayout>
  );
};

export default Recover;
