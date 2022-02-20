import React, { useState } from 'react';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Input from '../components/Input';
import IMG from '../assets/imgs/vregister.svg'
import AuthContext from '../context/AuthContext';
import useAuth from '../hooks/useAuth'
import AlertMsg from '../components/AlertMsg';

const Register = () => {
    const { msg, register, setMsg } = useAuth(AuthContext)
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [pass, setPass] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
      e.preventDefault();
      setMsg("");
      let err = { ...errors };
      if (pass.length < 8) {
        err.pass = "كلمة المرور لايجب ان تكون اقل من 8 احرف او ارقام";
      } else {
        delete err.pass;
      }
      if (phone.length == 0) {
        err.phone = "هذا الحقل مطلوب";
      } else if (!phone.match(/^07([\s\d]+)$/)) {
        err.phone = "رقم هاتف غير صحيح";
      } else {
        delete err.phone;
      }
      if (fname.length == 0) {
        err.fname = "هذا الحقل مطلوب";
      } else {
        delete err.fname;
      }
      if (lname.length == 0) {
        err.lname = "هذا الحقل مطلوب";
      } else {
        delete err.lname;
      }
      if (email.length > 0 && !email.match(/^\w+\@\w+\.\w+$/)) {
        err.email = "البريد الالكتروني غير صحيح";
      } else {
        delete err.email;
      }
      setErrors({ ...err });
      if (Object.keys(err).length > 0) {
        return;
      }

      register(fname, lname, email, pass, phone);
    };

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
              for="fname"
              type="text"
              label="الاسم الأول"
              value={fname}
              onType={(e) => setFname(e.target.value)}
            />
            {errors.fname && <AlertMsg msg={errors.fname} category="vred" />}
            <Input
              for="lname"
              type="text"
              label="الاسم الأخير"
              value={lname}
              onType={(e) => setLname(e.target.value)}
            />
            {errors.lname && <AlertMsg msg={errors.lname} category="vred" />}
            <Input
              for="email"
              type="email"
              label="البريد الألكتروني"
              value={email}
              onType={(e) => setEmail(e.target.value)}
            />
            {errors.email && <AlertMsg msg={errors.email} category="vred" />}
            <Input
              for="phone"
              type="text"
              label="رقم الهاتف"
              value={phone}
              onType={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <AlertMsg msg={errors.phone} category="vred" />}
            <Input
              for="pass"
              type="password"
              label="كلمة المرور"
              value={pass}
              onType={(e) => setPass(e.target.value)}
            />
            {errors.pass && <AlertMsg msg={errors.pass} category="vred" />}
            {<AlertMsg msg={msg} category="vred" /> || null}
            <div className="mt-4 flex gap-x-4 items-center">
              <input type="checkbox" id="accept" />
              <label htmlFor="accept">
                اوافق على{" "}
                <span className="text-vblue underline">بنود الخدمة</span> و{" "}
                <span className="text-vblue underline">سياسة الخصوصية</span>
              </label>
            </div>
            <button className="text-white bg-vblue px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm mt-4 table mr-auto">
              انشاء حساب
            </button>
          </form>
        </Grid>
      </div>
    </Container>
  );
};

export default Register;
