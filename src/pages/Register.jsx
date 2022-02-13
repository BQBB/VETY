import React from 'react';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Input from '../components/Input';
import IMG from '../assets/imgs/vregister.svg'
import AuthContext from '../context/AuthContext';
import useAuth from '../hooks/useAuth'

const Register = () => {
    const { msg, register } = useAuth(AuthContext)

  return (
        <Container>
            <div className='mt-14'>
                <Grid style='items-center gap-x-4'>
                    <img src={IMG} alt='login img' className='col-span-12 mx-auto w-[20rem] h-[20rem] mb-4 sm:mb-0 sm:w-auto sm:h-auto sm:col-span-6' />
                    <form className='col-span-12 sm:col-span-6 bg-vgray p-5 rounded-md'>
                        <Input for='email' type='email' label='الاسم الأول' />
                        <Input for='email' type='email' label='الاسم الأخير' />
                        <Input for='email' type='email' label='البريد الألكتروني' />
                        <Input for='email' type='password' label='رقم الهاتف' />
                        <Input for='email' type='password' label='كلمة المرور' />
                        <div className='mt-4 flex gap-x-4 items-center'>
                            <input type='checkbox' id='accept' />
                            <label htmlFor='accept'>اوافق على <span className='text-vblue underline'>بنود الخدمة</span> و <span className='text-vblue underline'>سياسة الخصوصية</span></label>
                        </div>
                        <button className="text-white bg-vblue px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm mt-4 table mr-auto">انشاء حساب</button>
                    </form> 
                </Grid>
            </div>
        </Container>
  
    );
};

export default Register;
