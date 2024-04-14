import React, { useState } from 'react';
import { Login } from '../components/Auth/Login';
import { SignUp } from '../components/Auth/SignUp';
import '../styles/AuthPage.css';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="authPageContainer">
      <div className="authPageToggle">
        <span
          className={`toggleOption ${isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          Уже есть аккаунт
        </span>
        <span> | </span>
        <span
          className={`toggleOption ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          Нет аккаунта
        </span>
      </div>
      {isLogin ? <Login /> : <SignUp />}
    </div>
  );
};

export default AuthPage;
