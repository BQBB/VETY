import React, { createContext, useEffect, useReducer } from 'react';
import { SESSION_KEY } from '../utils/constants';
import axiosInstance from '../utils/axios';
import { AuthService } from '../services/AuthService';
import { useLocation } from 'react-router-dom';

const initState = {
    isAuthed: false,
    msg: null,
    user: null,
    path: null
}

const AuthContext = createContext({
    ...initState,
    login: () => {},
    logout: () => {},
    register: () => {}
})

const setSession = (session) =>  {
    if(session) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${session.token.access_token}`;
      } else {
        localStorage.removeItem(SESSION_KEY);
        delete axiosInstance.defaults.headers.common.Authorization;    
    }
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'INITIALISE' : {
            const {isAuthed, profile} = action.payload
            return {...state, isAuthed, user: profile} 

        }

        case 'LOGIN' : {
            const {profile} = action.payload
            return {...state, user: profile, isAuthed: true}
        }

        case 'REGISTER' : {
            const {profile} = action.payload
            return {...state, user: profile, isAuthed: true}
        }

        case 'LOGOUT' : {
            return {...state, user: null, isAuthed: false}
        }

        case 'MSG' : {
            return {...state, msg: action.payload}
        }

        case 'PATH' : {
            return {...state, path: action.payload}
        }

        default: {
            return { ...state }
        }

    }
}

export const AuthProvider = (props) => {
    const location = useLocation()
    const [state, dispatch] = useReducer(reducer, initState)

    const login = (user, pass) => {
        (new AuthService).login(user, pass).then(
            res => {
                if(res.status != '200') {
                    dispatch({type: 'MSG', payload: 'لايمكن تسجيل الدخول الرجاء التحقق من معلوماتك'})
                    return
                }
                dispatch({type: 'MSG', payload: ''})
                dispatch({type: 'LOGIN', payload: {profile: res.data}})
                setSession(res.data)

            }
        ).catch(err => dispatch({type: 'MSG', payload: 'لايمكن تسجيل الدخول الرجاء التحقق من معلوماتك'}))

    }

    const logout = () => { setSession();dispatch({type: 'LOGOUT'}) }
    const register = (firstName, lastName, email, password, phone) => {


            (new AuthService).register(firstName, lastName, email, password, phone).then(
                res => {
                    if(res.status != '201') {
                        dispatch({type: 'MSG', payload: 'لايمكن التسجيل الرجاء التحقق من معلوماتك'})
                        return
                    }
                    dispatch({type: 'MSG', payload: ''})
                    dispatch({type: 'REGISTER', payload: {profile: res.data}})
                    setSession(res.data)

                }
            ).catch(err => dispatch({type: 'MSG', payload: 'لايمكن التسجيل الرجاء التحقق من معلوماتك'}))
        

    }

    const setMsg = (message) => dispatch({type:'MSG', payload: message})

    useEffect(()=>{
        dispatch({type:'PATH', payload: location.pathname})
        dispatch({type:'MSG', payload: ''})
        try {
            let user = window.localStorage.getItem(SESSION_KEY)
            if(user) {
                user = JSON.parse(user)
                setSession(user)
                dispatch({type:'INITIALISE', payload: {isAuthed: true, profile: user}})
            } else {
                dispatch({type:'INITIALISE', payload: {isAuthed: false, profile: null}})
                setSession()
            }
        } catch (err) {
            dispatch({type:'INITIALISE', payload: {isAuthed: false, profile: null}})
            setSession()
        }
    },[])   

  return (
      <AuthContext.Provider value={
          {
              ...state,
              login,
              logout,
              register,
              setMsg
          }
      }>
          {props.children}
      </AuthContext.Provider>
  );
};
  
export default AuthContext;