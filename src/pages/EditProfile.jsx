import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { AuthService } from "../services/AuthService";
import Loader from "../components/Loader";
import Options from "../components/Options";
import { Redirect } from "react-router-dom";
import { Http } from "../utils/http";
import useSnack from "../hooks/useSnack";


const EditProfile = (props) => {
  const [gender, setGender] = useState('')
  const [user, setUser] = useState({})
  const [load, setLoad] = useState(true)
  const [addresses, setAddresses] = useState('')
  const [address, setAddress] = useState('')
  const {error, success} = useSnack()

  const handleRedirect = (path) => {
    props.history.push(path)
    return <Redirect to={path} />
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    (new AuthService).updateProfile(user.first_name, user.last_name, address, (typeof(gender) == 'object' ? gender.value : gender)).then(res=>{
      if (res.status != 200) {
        throw new Error("err");
      }
      success('تم تحديث معلوماتك')
      handleRedirect('/profile')
    }).catch(err=> error('حدثت مشكلة ما'))
  }

  useEffect(() => {
    (new AuthService)
      .me()
      .then((res) => {
        if (res.status != 200) {
          throw new Error("err");
        }

        setUser({ ...res.data })
        setGender((res.data.member.gender == 'male')? {title: 'ذكر', value:'male'} : {title: 'انثى', value:'female'})
        setAddress(res.data.address?.id)
      })
      .catch((err) => handleRedirect('/profile'));

      (new Http).get('api/address/all_address').then((res) => {
        if (res.status != 200) {
          throw new Error("err");
        }

        let _addresses = res.data.map((address)=> { return {title: address.city.name+" - "+address.zone.name, value: address.id} })
        setAddresses([..._addresses])
        setLoad(false);
      })
      .catch((err) => handleRedirect('/profile'));

  }, []);


  return (
    <Container>
      {load? <Loader />: (
          <>
            <div className="mt-14 flex flex-col ">
        <form onSubmit={handleSubmit} className=" bg-vgray rounded-md p-2  lg:w-5/12 md:6/12 lg:mx-auto content-center justify-center align-middle">
          <div className="">
            <Input for="first_name" type="text" label=" الاسم الاول" value={user.first_name} onType={(e)=> setUser({...user, first_name: e.target.value})} />
            <Input for="last_name" type="text" label="الاسم الاخير" value={user.last_name} onType={(e)=> setUser({...user, last_name: e.target.value})}/>
          </div>

         
          <Options options={[{title: 'ذكر', value:'male'},{title: 'انثى', value:'female'}]} for='gender' name='الجنس' value={gender.value} handleOptions={(e) => setGender(e.target.value)} />
          <Options options={addresses} for='address' name='العنوان' value={address} handleOptions={(e) => setAddress(e.target.value)} />



          <div className="flex justify-between items-center mt-4">
            <button className="text-white bg-vblue px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm mt-4 ">
              تحديث
            </button>
          </div>
        </form>
      </div>
          </>
      )}
    </Container>
  );
};

export default EditProfile;