import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginFields } from '../constants/formFields';
import { Login } from '../Types';
import apiUserService from '../Utils/apiUserService';
import auth from '../Utils/auth';
import FormAction from './FormAction';
import Input from './Input';

const fields = loginFields;
const initialState: Login = {
  email: '',
  password: '',
};

function LoginComponent({ setIsAuthenticated }) {
  const [loginState, setLoginState] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginState({ ...loginState, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = loginState;
    const user = { email, password };
    const res = await apiUserService.login(user);
    if (res.error) {
      setErrorMessage('Incorrect login information.');
      setLoginState(initialState);
    } else {
      setIsAuthenticated(true);
      auth.login(() => navigate('/home'));
    }
  };

  const validateForm = () => {
    return !loginState.email || !loginState.password;
  };

  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
      <div className='-space-y-px'>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      {/* <FormExtra/> */}
      <FormAction
        handleSubmit={handleSubmit}
        text='Login'
        validateForm={validateForm}
      />
      <div data-testid='loginErrorMessage' className='alert-error'>
        {errorMessage}
      </div>
    </form>
  );
}

export default LoginComponent;
