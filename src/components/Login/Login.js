import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

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

const Login = (props) => {

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
      setFormIsValid( emailIsValid&& passordIsValid);
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
    props.onLogin(emailState.value, passWordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passWordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passWordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
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
