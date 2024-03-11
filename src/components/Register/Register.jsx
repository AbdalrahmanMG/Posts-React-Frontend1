import React, {  useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'


export default function Register() {
    const [isLoading, setLoading] = useState(false)


    let validationSchema = Yup.object({
        name: Yup.string().max(20, 'Must be 20 characters or less')
            .required("This field Required"),
        phone: Yup.number().required("This field Required"),
        email: Yup.string().email('Invalide Email').required("This field Required"),
        password: Yup.string().required("This field Required"),
        rePassword: Yup.string().oneOf([Yup.ref('password')], "Dosen't match Password").required("This field Required")
    })

    let formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            rePassword: '',
        }, validationSchema,
        onSubmit: submitRegister
    })

    let navigate = useNavigate()

    async function submitRegister(values) {
        console.log("submitting ...");
        setLoading(true)
        try {
            let res = await axios.post('https://first-posts-backend.onrender.com/api/v1/users/register', values)
            console.log(res);
            if (res.status == 201) {
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }




    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="userName">Name:</label>
                <input type="text"
                    id="userName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    name='name' className='block w-3/6 my-2 p-2 border border-gray-300 rounded-md m-auto focus:ring-red-500 focus:border-orange-300' />
                {formik.errors.name && formik.touched.name ? <div className='w-2/6 m-auto py-1 rounded-md text-white text-center justify-center grid-cols-none alert alert-error'>{formik.errors.name}</div> : null}

                <label htmlFor="userPhone">Phone:</label>
                <input type="tel"
                    id="userPhone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    name='phone' className='block w-3/6 my-2 p-2 border border-gray-300 rounded-md m-auto focus:ring-red-500 focus:border-orange-300' />
                {formik.errors.phone && formik.touched.phone ? <div className='w-2/6 m-auto py-1 rounded-md text-white text-center justify-center grid-cols-none alert alert-error'>{formik.errors.phone}</div> : null}


                <label htmlFor="userEmail">Email:</label>
                <input type="email"
                    id="userEmail"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    name='email' className='block w-3/6 my-2 p-2 border border-gray-300 rounded-md m-auto focus:ring-red-500 focus:border-orange-300' />
                {formik.errors.email && formik.touched.email ? <div className='w-2/6 m-auto py-1 rounded-md text-white text-center justify-center grid-cols-none alert alert-error'>{formik.errors.email}</div> : null}


                <label htmlFor="userPassword">Password:</label>
                <input type="password"
                    id="userPassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name='password' className='block w-3/6 my-2 p-2 border border-gray-300 rounded-md m-auto focus:ring-red-500 focus:border-orange-300' />
                {formik.errors.password && formik.touched.password ? <div className='w-2/6 m-auto py-1 rounded-md text-white text-center justify-center grid-cols-none alert alert-error'>{formik.errors.password}</div> : null}


                <label htmlFor="userRePassword">RePassword:</label>
                <input type="password"
                    id="userRePassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.rePassword}
                    name='rePassword' className='block w-3/6 my-2 p-2 border border-gray-300 rounded-md m-auto focus:ring-red-500 focus:border-orange-300' />
                {formik.errors.rePassword && formik.touched.rePassword ? <div className='w-2/6 m-auto py-1 rounded-md text-white text-center justify-center grid-cols-none alert alert-error'>{formik.errors.rePassword}</div> : null}


                <Button type="submit" disabled={!(formik.isValid && formik.dirty)} outline gradientDuoTone="pinkToOrange" className='my-4 m-auto'>Register</Button>
            </form>
        </>
    )
}
