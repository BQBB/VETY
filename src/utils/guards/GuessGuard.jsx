import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const GuessGuard = (props) => {
    const { isAuthed } = useAuth()

    if(isAuthed) {
        return <Redirect to='/profile' />
    }
  return <>{props.children}</>;
};

export default GuessGuard;
