import React from 'react';
import { Form } from './Form';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../firebase/authorization';

export const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = (email: string, password: string) => {
    createUser(email, password)
      .then(() => navigate('/home'))
      .catch((error) => alert(error.message));
  };

  return (
    <Form
      title="регистрация"
      handleClick={handleSignUp}
      data-testid="signup-form"
    />
  );
};
