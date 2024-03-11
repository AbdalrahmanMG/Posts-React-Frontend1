import React, { useState } from 'react'
import Style from './AddPost.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';



export default function AddPost() {
    const [isLoading, setLoading] = useState(false)

    let validationSchema = Yup.object({
        title: Yup.string().max(20, 'Must be 20 characters or less')
            .required("This field Required"),
        description: Yup.string().required("This field Required"),
    })

    let formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            thumbnail: 'https://cdn.dummyjson.com/product-images/8/thumbnail.jpg',
        }, validationSchema,
        onSubmit: submitAddPost
    })

    let navigate = useNavigate()

    async function submitAddPost(values) {
        console.log("submitting ...");
        setLoading(true)
        try {
            let res = await axios.post(`http://localhost:3000/posts`, values)
            console.log(res);
            toast.success('Post created successfully!');
            if (res.statusText == 'Created') {
                setTimeout(() => {
                    navigate('/')
                }, 0);
            }
        } catch (error) {
            console.log(error);
            toast.error('Faild to created Post!');

        }
        setLoading(false)
    }


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input type="text"
                    id="postTitle"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    name='title' className='block w-3/6 my-2 p-2 border border-gray-300 rounded-md m-auto focus:ring-red-500 focus:border-orange-300' />
                {formik.errors.title && formik.touched.title ? <div className='w-2/6 m-auto py-1 rounded-md text-white text-center justify-center grid-cols-none alert alert-error'>{formik.errors.title}</div> : null}


                <label htmlFor="postDescription">Description:</label>
                <input type="text"
                    id="postDescription"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    name='description' className='block w-3/6 my-2 p-2 border border-gray-300 rounded-md m-auto focus:ring-red-500 focus:border-orange-300' />
                {formik.errors.description && formik.touched.description ? <div className='w-2/6 m-auto py-1 rounded-md text-white text-center justify-center grid-cols-none alert alert-error'>{formik.errors.description}</div> : null}


                <Button type="submit" disabled={!(formik.isValid && formik.dirty)} outline gradientDuoTone="pinkToOrange" className='my-4 m-auto'>Add post</Button>
            </form>
            <Toaster position='top-right' />

        </>
    )
}
