import React, { createContext, useReducer } from 'react';

const initState = {
    isAuthed: false,
    permessions: [],
    user: null
}

const AuthContext = createContext({
    ...initState,
    login: () => {},
    logout: () => {},
    hasPerm: () => {}
})

const reducer = (state, action) => {
    switch(action.type) {
        case 'INITIALISE' : {
            const {isAuthed, user, permessions} = action.payload
            return {...initState, isAuthed, user, permessions} 

        }

        case 'LOGIN' : {
            const {user, permessions} = action.payload
            return {...initState, user, permessions, isAuthed: true}
        }

        case 'LOGOUT' : {
            return {...initState, user: null, permessions: [], isAuthed: false}
        }

    }
}

export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initState)

    const login = (user, pass) => {
        if(user===pass) {
            dispatch({
                type: 'LOGIN',
                payload: {user: 'karrar', permessions: ['can add', 'can delete']}
            })
        }

        else {
            dispatch({type: 'LOGOUT'})
        }

    }

    const logout = () => dispatch({type: 'LOGOUT'})
    const hasPerm = (permession) => (state.permessions || []).find((perm)=> perm===permession) ? true : false

  return (
      <AuthContext.Provider value={
          ...state,
          login,
          logout,
          hasPerm
      }>
          {props.children}
      </AuthContext.Provider>
  );
};

export default AuthContext;
