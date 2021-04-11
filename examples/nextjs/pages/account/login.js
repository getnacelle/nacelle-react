import React from 'react';
import AccountLayout from 'components/Account/Layout/AccountLayout';
import LoginForm from 'components/Account/LoginForm/LoginForm';
import Link from 'next/link';

const Login = () => {
  return (
    <AccountLayout>
      <h1>Log in</h1>
      <LoginForm />
      {/* //TODO MOVE TO LOGIN FORM */}
      <Link href="/account/recover">
        <a>Recover Password</a>
      </Link>
    </AccountLayout>
  );
};
export default Login;
