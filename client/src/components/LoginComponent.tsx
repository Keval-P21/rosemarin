import * as React from 'react';
import { useState } from 'react';
import { loginFields } from '../constants/formFields';
import FormAction from './FormAction';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import apiUserService from '../Utils/apiUserService';
import { Login } from '../Types';
import auth from '../Utils/auth';

const fields = loginFields;
const initialState: Login = {
  email: '',
  password: '',
};

// fields.forEach(field=>fieldsState[field.id]='');

function LoginComponent(props) {
  const [loginState, setLoginState] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginState;
    const user = { email, password };
    const res = await apiUserService.login(user);
    if (res.error) {
      setErrorMessage('Incorrect login information.');
      setLoginState(initialState);
    } else {
      // This sets isAuthenticated = true and redirects to profile
      props.setIsAuthenticated(true);
      auth.login(() => navigate('/home'));
    }
  };

  const validateForm = () => {
    return !loginState.email || !loginState.password;
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
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
        text="Login"
        validateForm={validateForm}
      />
      <div className="alert-error">{errorMessage}</div>
    </form>
  );
}

export default LoginComponent;
