import React from 'react';
import { Form } from './Form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../firebase/authorization';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    login(email, password)
      .then(() => navigate('/home'))
      .catch((error) => alert(error.message));
  };

  return <Form title="войти" handleClick={handleLogin} />;
};
