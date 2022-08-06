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
};

// fields.forEach(field => fieldsState[field.id]='');

function SignupComponent(props) {
  const [signupState, setSignupState] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupState;
    const user = { name, email, password };


    const res = await apiUserService.register(user);
    if (res.error) {
      setErrorMessage('Account already exists. Please try again.');
      setSignupState(initialState);
      e.target.reset()
    } else {
      // This sets isAuthenticated = true and redirects to profile
      props.setIsAuthenticated(true);
    //   navigate("/home");
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
      <div className='alert-error'>{errorMessage}</div>
    </form>
  );
}

export default SignupComponent;
