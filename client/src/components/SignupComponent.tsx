import * as React from 'react';
import { useState } from 'react';
import { signupFields } from '../constants/formFields';
import FormAction from './FormAction';
import Input from './Input';
import apiUserService from '../Utils/apiUserService';
import { useNavigate } from 'react-router-dom';
import { Signup } from '../Types';
import auth from '../Utils/auth';

const fields = signupFields;
const initialState: Signup = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignupComponent({ setIsAuthenticated }) {
  const [signupState, setSignupState] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) =>
    setSignupState({ ...signupState, [event.target.id]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = signupState;
    const user = { name, email, password };

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please try again.');
      return;
    }

    const res = await apiUserService.register(user);
    if (res.error) {
      setErrorMessage('Account already exists. Please try again.');
      setSignupState(initialState);
    } else {
      // This sets isAuthenticated = true and redirects to profile
      setIsAuthenticated(true);
      auth.login(() => navigate('/home'));
    }
  };

  const validateForm = () => {
    return !signupState.email || !signupState.password || !signupState.name;
  };

  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
      <div className=''>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction
          handleSubmit={handleSubmit}
          text='Signup'
          validateForm={validateForm}
        />
      </div>
      <div data-testid='signupComponentErrorMessage' className='alert-error'>
        {errorMessage}
      </div>
    </form>
  );
}

export default SignupComponent;
