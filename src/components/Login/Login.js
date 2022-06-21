import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {

  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
};

const passwordReducer = (state, action) => {

  if (action.type === 'PSWD_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'PSWD_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
};

const Login = () => {

  const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });
  const [passWordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT',
      val: event.target.value
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'PSWD_INPUT',
      val: event.target.value
    });

  };
  const { isValid: emailIsValid } = emailState;
  const { isValid: passordIsValid } = passWordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking from validity');
      setFormIsValid(emailIsValid && passordIsValid);
    }, 500);
    // CleanUp function runs before the side Effect fucntion, expect the first time.
    return () => {
      //  this timer set the time value to the null;
      clearTimeout(identifier)
      console.log('CleanUp !')
    };

  }, [emailIsValid, passordIsValid]);

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR', })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'PSWD_BLUR' });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogIn(emailState.value, passWordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          label="E-mail"
          id="email"
          name ="lable"
          value={emailState.value}
          isValid ={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}

        />

        <Input
          label="Password"
          id="password"
          name ="paswword"
          value={passWordState.value}
          isValid ={passWordState.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}

        />


        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
