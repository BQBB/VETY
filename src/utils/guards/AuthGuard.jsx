import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AuthGuard = (props) => {
    const { isAuthed } = useAuth()
    
    if(!isAuthed) {
        return <Redirect to='/login' />
    }
  return <>{props.children}</>;
};

export default AuthGuard;
