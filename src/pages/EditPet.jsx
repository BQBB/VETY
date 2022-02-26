import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import IMG from "../assets/imgs/pet.svg";
import Input from "../components/Input";
import Grid from "../components/Grid";
import { PetService } from "../services/PetService";
import AlertMsg from '../components/AlertMsg'
import FormData from 'form-data'
import {Redirect} from 'react-router-dom'
import useSnack from "../hooks/useSnack";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { BASE_URL } from "../utils/constants";
import Options from "../components/Options";

const EditPet = (props) => {


  const [types, setTypes] = useState([]);
  const [value, setValue] = useState({text: 'الكل'})
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('')
  const [gender, setGender] = useState()
  const [type, setType] = useState('')
  const [age, setAge] = useState('')
  const [weight, setSWeight] = useState('')
  const [chip, setChip] = useState('')
  const [date, setDate] = useState('')
  const [errors, setErrors] = useState({})
  const { error, success} = useSnack()
  const { id } = useParams()
  const [load ,setLoad] = useState(true)
  const [img ,setImg] = useState('')

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
    else if(!weight.toString().match(/\d+/)) {
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
    else if(!age.toString().match(/\d+/)) {
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


    setErrors({...err})
    if(Object.keys(err).length > 0) {
      console.log(err);
        return
    }

    let data = new FormData()
    data.append("type_id", value.text)
    data.append("name", name)
    data.append("pet_id", id)
    data.append("gender", typeof(gender) == 'object' ? gender.value : gender)
    data.append("family", type)
    data.append("weight", weight)
    data.append("adopt_date", date)
    data.append("age", age)
    data.append("chip_num", chip)

    data.append("image", selectedImage)

    for (var key of data.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    (new PetService).update(data).then(res => {
      success('تم تحديث معلومات حيوانك الاليف في المنصة')
      handleRedirect('/pet/'+id)
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
      
    }).catch(err => null);

    (new PetService).getPet(id).then(res => {
        if(!res || res.status != 200) {
          throw new Error('err')
        }
        let pet = res.data
        setName(pet.name)
        setGender((pet.gender== 'male')? {title: 'ذكر', value:'male'} : {title: 'انثى', value:'female'})
        setAge(pet.age)
        setType(pet.family)
        setSWeight(pet.weight)
        setChip(pet.chip)
        setDate(pet.adopt_date)
        setValue({text: pet.type.id})
        setChip(pet.chip_num)
        setLoad(false)     
        setImg(BASE_URL+pet.image.slice(1,pet.image.length))   
      }).catch(err => {
        error('حدثت مشكلة ما')
        handleRedirect('/pets')
      });

  } ,[])

  return (
    <Container>
      {load? <Loader /> : (
          <>
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
                  selectedImage ? URL.createObjectURL(selectedImage) : img
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
                <Options options={[{title: 'ذكر', value:'male'},{title: 'انثى', value:'female'}]} for='gender' name='الجنس' value={gender.value} handleOptions={(e) => setGender(e.target.value)} />
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

            <div className="flex justify-between items-center mt-4">
              <button className=" transition text-white bg-vblue px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm mt-4 hover:bg-blue-900 ">
                تحديث معلومات الحيوان
              </button>
            </div>
          </form>
        </Grid>
      </div>
          </>
      )}
    </Container>
  );
};

export default EditPet;