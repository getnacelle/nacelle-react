import React from 'react';
import AccountLayout from 'components/Account/Layout/AccountLayout';
import RegisterForm from 'components/Account/RegisterForm/RegisterForm';

const Register = () => {
  return (
    <AccountLayout>
      <h1>Register</h1>
      <RegisterForm />
    </AccountLayout>
  );
};

export default Register;
