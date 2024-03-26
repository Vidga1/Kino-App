import React from 'react';
import { FC, useState } from 'react';
import '../../styles/Form.css';

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

const Form: FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="formContainer">
      <input
        type="email"
        className="formInput"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        className="formInput"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      <button className="formButton" onClick={() => handleClick(email, pass)}>
        {title}
      </button>
    </div>
  );
};

export { Form };
