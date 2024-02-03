import React, { useState } from 'react';
import { Login } from '../components/Auth/Login';
import { SignUp } from '../components/Auth/SignUp';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="authPageContainer">
      <h1 className="authPageTitle" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Перейти в регистрацию' : 'Перейти на вход'}
      </h1>
      {isLogin ? <Login /> : <SignUp />}
    </div>
  );
};

export default AuthPage;
