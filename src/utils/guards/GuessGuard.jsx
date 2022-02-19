import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const GuessGuard = (props) => {
    const { isAuthed, path } = useAuth()

    if(isAuthed) {
        if(path == '/login' || path == '/register')
        {
          return <Redirect to={'/profile'} />
        }
        return <Redirect to={path} />

    }
  return <>{props.children}</>;
};

export default GuessGuard;
