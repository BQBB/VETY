import React, { useState } from 'react';
import Container from '../components/Container';
import IMG from '../assets/imgs/vlogin.svg'
import Input from '../components/Input';
import Grid from '../components/Grid';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useAuth from '../hooks/useAuth'
import AlertMsg from '../components/AlertMsg';

const Login = () => {
    const { msg, login, setMsg } = useAuth(AuthContext)
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [errors, setErrors] = useState({})

    const handleUser = (e) => {
        setUser(e.target.value)
    }

    const handlePass = (e) => {
        setPass(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMsg('')
        let err = {...errors}
        if(pass.length < 8) {
            err.pass = 'كلمة المرور لايجب ان تكون اقل من 8 احرف او ارقام'
        }
        else {
            delete err.pass
        }
        if(user.length == 0) {
            err.user = 'هذا الحقل مطلوب'
        }
        else {
            delete err.user
        }
        setErrors({...err})
        if(Object.keys(err).length > 0) {
            return
        }

        login(user,pass)
    }

  return (
    <Container>
      <div className="mt-14">
        <Grid style="items-center gap-x-4">
          <img
            src={IMG}
            alt="login img"
            className="col-span-12 mx-auto w-[20rem] h-[20rem] mb-4 sm:mb-0 sm:w-auto sm:h-auto sm:col-span-6"
          />
          <form
            className="col-span-12 sm:col-span-6 bg-vgray p-5 rounded-md"
            onSubmit={handleSubmit}
          >
            <Input
              for="email"
              type="text"
              label="البريد الألكتروني او رقم الهاتف"
              value={user}
              onType={handleUser}
            />
            {errors.user && <AlertMsg msg={errors.user} category="vred" />}
            <Input
              for="password"
              type="password"
              label="كلمة المرور"
              value={pass}
              onType={handlePass}
            />
            {errors.pass && <AlertMsg msg={errors.pass} category="vred" />}
            {<AlertMsg msg={msg} category="vred" /> || null}
            <div className="flex justify-between items-center mt-4">
              <Link to="/register" className="text-vblue text-sm">
                انشاء حساب جديد
              </Link>
              <button className="text-white bg-vblue px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm mt-4 ">
                تسجيل الدخول
              </button>
            </div>
          </form>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
