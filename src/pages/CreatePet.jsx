import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import IMG from "../assets/imgs/pet.svg";
import Input from "../components/Input";
import Grid from "../components/Grid";
import Dropdown from "../components/Dropdown";
import profile from "../assets/imgs/default.svg";
import { PetService } from "../services/PetService";
import AlertMsg from '../components/AlertMsg'
import FormData from 'form-data'
import {Redirect} from 'react-router-dom'
import useSnack from "../hooks/useSnack";
import Options from "../components/Options";

const CreatePet = (props) => {
  const [types, setTypes] = useState([]);
  const [value, setValue] = useState({text: 'الكل'})
  const [show, setShow] = useState(false)
  const [selectedImage, setSelectedImage] = useState();
  const [name, setName] = useState('')
  const [gender, setGender] = useState({title: 'ذكر', value:'male'})
  const [type, setType] = useState('')
  const [age, setAge] = useState('')
  const [weight, setSWeight] = useState('')
  const [chip, setChip] = useState('')
  const [date, setDate] = useState('')
  const [errors, setErrors] = useState({})
  const { error, success} = useSnack()

  const handleMenu = (value) => {
    setValue({text: value})
    setShow(!show)

  }
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  }


  const handleSubmit = (e)=> {

    e.preventDefault()
    let err = {...errors}


    if(!name) {
      err.name = 'هذا الحقل مطلوب'
    }
    else {
        delete err.name
    }

    if(!weight) {
      err.weight = 'هذا الحقل مطلوب'
    }
    else if(!weight.match(/\d+/)) {
      err.weight = 'هذا الحقل يجب ان يكون رقم'
    }
    else {
        delete err.weight;
    }

    if(!gender) {
      err.gender = 'هذا الحقل مطلوب'
    }
    else {
        delete err.gender
    }

    if(!type) {
      err.family = 'هذا الحقل مطلوب'
    }
    else {
        delete err.family
    }

    if(!age) {
      err.age = 'هذا الحقل مطلوب'
    }
    else if(!age.match(/\d+/)) {
      err.age = "هذا الحقل يجب ان يكون رقم";
    }
    else {
        delete err.age
    }

    if(!chip) {
      err.chip = 'هذا الحقل مطلوب'
    }
    else {
        delete err.chip
    }

    if(!date) {
      err.date = 'هذا الحقل مطلوب'
    }
    else {
        delete err.date
    }

    if(!types.length) {
      err.types = 'هذا الحقل مطلوب'
    }
    else {
        delete err.types
    }

    if(!selectedImage) {
      err.img = 'هذا الحقل مطلوب'
    }
    else {
        delete err.img
    }
    setErrors({...err})
    if(Object.keys(err).length > 0) {
      console.log(err);
        return
    }

    let data = new FormData()

    data.append("type_id", value.text)
    data.append("name", name)
    data.append("gender", typeof(gender) == 'object' ? gender.value : gender)
    data.append("family", type)
    data.append("weight", weight)
    data.append("adopt_date", date)
    data.append("age", age)
    data.append("chip_num", chip)
    data.append("image", selectedImage, selectedImage.name)

    for (var key of data.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    (new PetService).create(data).then(res => {
      success('تم اضافة حيوانك الاليف الى المنصة')
      handleRedirect('/profile')
    }).catch(err => error('حدثت مشكلة ما'))

  }

  const handleRedirect = (path) => {
    props.history.push(path)
    return <Redirect to={path} />
  }
  useEffect(()=> {
    (new PetService).types().then(res => {
      if(!res.data.length) {
        throw new Error('err')
      }

      let _types = res.data.map((type)=> { return {title: type.name, value: type.id} })
      setTypes([..._types])
      setValue({text: res.data[0].id})
      
    }).catch(err => null)
  } ,[])

  return (
    <Container>
      <div className="mt-14">
        <Grid style="items-center gap-x-4">
          <img
            src={IMG}
            alt="login img"
            className="col-span-12 mx-auto w-[20rem] h-[20rem] mb-4 sm:mb-0 sm:w-auto sm:h-auto sm:col-span-6 mt-6"
          />
          <form
            onSubmit={handleSubmit}
            className="col-span-12 sm:col-span-6 bg-vgray p-5 rounded-md"
          >
            <div className="flex flex-row justify-center items-end  md:items-center sm:flex-col-reverse sm:gap-5 lg:flex-col-reverse ">
              <input
                type="file"
                className="form-control sm:w-64 block px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md  transition ease-in-out  m-0  focus:text-gray-700 focus:bg-white focus:border-vblue focus:outline-none focus:border-[2px]"
                onChange={imageChange}
              />

              <img
                src={
                  selectedImage ? URL.createObjectURL(selectedImage) : profile
                }
                alt="profile img"
                className="w-40 h-40 sm:w-30 sm:h-30 mt-4 sm:mt-10 md:w-40 md:h-40 lg:h-50 lg:w-50 rounded-full"
              />
            </div>
            {errors.img ? (
              <AlertMsg category={"vred"} msg={errors.img} />
            ) : null}
            <div className="lg:grid lg:grid-cols-2 gap-x-20 gap-y-2">
              <div>
                <Input
                  for="name"
                  type="text"
                  label=" الأسم"
                  value={name}
                  onType={(e) => setName(e.target.value)}
                />
                {errors.name ? (
                  <AlertMsg category={"vred"} msg={errors.name} />
                ) : null}
              </div>

              <div>
              <Options options={[{title: 'ذكر', value:'male'},{title: 'انثى', value:'female'}]} for='gender' name='الجنس' value={gender} handleOptions={(e) => setGender(e.target.value)} />
                {errors.gender ? (
                  <AlertMsg category={"vred"} msg={errors.gender} />
                ) : null}
              </div>

              <div>
                <Input
                  for="type"
                  type="text"
                  label="الصنف"
                  value={type}
                  onType={(e) => setType(e.target.value)}
                />
                {errors.family ? (
                  <AlertMsg category={"vred"} msg={errors.family} />
                ) : null}
              </div>

              <div>
                <Input
                  for="date"
                  type="date"
                  label="تاريخ الولادة"
                  value={date}
                  onType={(e) => setDate(e.target.value)}
                />
                {errors.date ? (
                  <AlertMsg category={"vred"} msg={errors.date} />
                ) : null}
              </div>

              <div>
                <Input
                  for="weight"
                  type="text"
                  label="الوزن"
                  value={weight}
                  onType={(e) => setSWeight(e.target.value)}
                />
                {errors.weight ? (
                  <AlertMsg category={"vred"} msg={errors.weight} />
                ) : null}
              </div>

              <div>
                <Input
                  for="age"
                  type="text"
                  label="العمر"
                  value={age}
                  onType={(e) => setAge(e.target.value)}
                />
                {errors.age ? (
                  <AlertMsg category={"vred"} msg={errors.age} />
                ) : null}
              </div>
              {types.length ? (
              <Options options={types} for='typ' name='النوع' value={value.text} handleOptions={(e) => setValue({text: e.target.value})} />
            ) : null}
              <div>
                <Input
                  for="chip_number"
                  type="text"
                  label="رقم الشريحة"
                  value={chip}
                  onType={(e) => setChip(e.target.value)}
                />
                {errors.chip ? (
                  <AlertMsg category={"vred"} msg={errors.chip} />
                ) : null}
              </div>
            </div>
            {/* <label className="relative mt-4">النوع</label>
            {types.length ? (
              <Dropdown
                default={types[0].name}
                handleShow={(e) => {
                  e.preventDefault();
                  setShow(!show);
                }}
                show={show}
                value={value.text}
                handleMenu={handleMenu}
                list={types.slice(1, types.length).map((type) => type.name)}
              />
            ) : null} */}

            <div className="flex justify-between items-center mt-4">
              <button className=" transition text-white bg-vblue px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm mt-4 hover:bg-blue-900 ">
                انشاء حيوان جديد
              </button>
            </div>
          </form>
        </Grid>
      </div>
    </Container>
  );
};

export default CreatePet;