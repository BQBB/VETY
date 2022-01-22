import React from 'react';
import Container from '../components/Container';
import login from '../assets/imgs/vlogin.svg'
import Input from '../components/Input';
import Grid from '../components/Grid';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
        <Container>
            <div className='mt-14'>
                <Grid style='items-center gap-x-4'>
                    <img src={login} alt='login img' className='col-span-12 mx-auto w-[20rem] h-[20rem] mb-4 sm:mb-0 sm:w-auto sm:h-auto sm:col-span-6' />
                    <form className='col-span-12 sm:col-span-6 bg-vgray p-5 rounded-md'>
                        <Input for='email' type='text' label='البريد الألكتروني او رقم الهاتف' />
                        <Input for='email' type='password' label='كلمة المرور' />
                        <div className='flex justify-between items-center mt-4'>
                            <Link to='/register' className='text-vblue text-sm'>انشاء حساب جديد</Link>
                            <button className="text-white bg-vblue px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm mt-4 ">تسجيل الدخول</button>
                        </div>
                    </form> 
                </Grid>
            </div>
        </Container>
  
    );
};

export default Login;
