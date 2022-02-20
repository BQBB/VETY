import React, { useState } from 'react'
import Container from '../components/Container'
import Grid from '../components/Grid'
import contact from '../assets/imgs/vcontact.svg'
import Input from '../components/Input'
import AlertMsg from '../components/AlertMsg'
import {Http} from '../utils/http'

const Contact = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = { ...errors };
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
    if (question.length == 0) {
      err.question = "هذا الحقل مطلوب";
    } else {
      delete err.question;
    }
    if (email.length == 0) {
      err.email = "هذا الحقل مطلوب";
    } else if (!email.match(/^\w+\@\w+\.\w+$/)) {
      err.email = "البريد الالكتروني غير صحيح";
    } else {
      delete err.email;
    }
    setErrors({ ...err });
    if (Object.keys(err).length > 0) {
      return;
    }

    new Http()
      .post("/api/contact/contact_us", {
        first_name: fname,
        last_name: lname,
        email: email,
        question: question,
      })
      .then((res) => {
        if (!res || (res.detail && res.detail.length > 0)) {
          throw new Error("Error");
        }
        setMsg({ text: "تم ارسال سؤالك بنجاح", category: "green-600" });
      })
      .catch((err) =>
        setMsg({ text: "حدثت مشكلة اثناء ارسال الرسالة", category: "vred" })
      );
  };

  return (
    <Container>
      <div className="mt-14">
        <Grid style="items-center gap-x-4">
          <img
            src={contact}
            alt="contact img"
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
            <div className="flex flex-col mt-4">
              <label className="text-[#102840] text-vsm">ادخل سؤالك هنا</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                name="question"
                className="p-2 border-[2px] border-vblue focus:ouline-none rounded-md"
              ></textarea>
              {errors.question && (
                <AlertMsg msg={errors.question} category="vred" />
              )}
            </div>
            {msg.text && <AlertMsg msg={msg.text} category={msg.category} />}
            <button className="text-white bg-vblue px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm mt-4 table mr-auto">
              ارسال
            </button>
          </form>
        </Grid>
      </div>
    </Container>
  );
}

export default Contact
