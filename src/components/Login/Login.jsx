import React, { useContext, useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Hooks/useAuth';
// import { authContext } from '../../context/AuthContext';


export default function Login() {
    const [isLoading, setLoading] = useState(false)
    // let {userToken, setUserToken}= useContext(authContext)
    const {login} = useAuth()
    let navigate = useNavigate()


    let validationSchema = Yup.object({
        email: Yup.string().email('Invalide Email').required("This field Required"),
        password: Yup.string().required("This field Required"),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, validationSchema,
        onSubmit: submitLogin
    })

    async function submitLogin(values) {
        console.log("submitting ...");
        setLoading(true)
        try {
            let res = await axios.post('https://first-posts-backend.onrender.com/api/v1/users/login', values)
            if (res.status == 200) {
                let token = res.data.token
                // localStorage.setItem('userToken', token)
                // setUserToken(token)
                login(token)
            navigate('/')
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return (
        < > 
            <form onSubmit={formik.handleSubmit}>

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

                <Button type="submit" disabled={!(formik.isValid && formik.dirty)} outline gradientDuoTone="pinkToOrange" className='my-4 m-auto'>Login</Button>
            </form>

        </>
    )
}
