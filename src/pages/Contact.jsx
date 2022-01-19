import React from 'react'
import Container from '../components/Container'
import Grid from '../components/Grid'
import contact from '../assets/imgs/vcontact.svg'
import Input from '../components/Input'

const Contact = () => {
    return (
        <Container>
            <div className='mt-14'>
                <Grid style='items-center gap-x-4'>
                    <img src={contact} alt='contact img' className='col-span-12 mx-auto w-[20rem] h-[20rem] mb-4 sm:mb-0 sm:w-auto sm:h-auto sm:col-span-6' />
                    <form className='col-span-12 sm:col-span-6 bg-vgray p-5 rounded-md'>
                        <Input for='email' type='email' label='الاسم الأول' />
                        <Input for='email' type='email' label='الاسم الأخير' />
                        <Input for='email' type='email' label='البريد الألكتروني' />
                        <div className='flex flex-col mt-4'>
                            <label className='text-[#102840] text-vsm'>ادخل سؤالك هنا</label>
                            <textarea className='p-2 border-[2px] border-vblue focus:ouline-none rounded-md'></textarea>
                        </div>
                        <button className="text-white bg-vblue px-4 md:px-8 py-2 rounded-lg hover:shadow-md text-vsm mt-4 table mr-auto">ارسال</button>
                    </form> 
                </Grid>
            </div>
        </Container>
    )
}

export default Contact
