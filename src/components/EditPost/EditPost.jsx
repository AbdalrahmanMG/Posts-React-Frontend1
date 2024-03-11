import React, { useEffect, useState } from 'react'
import Style from './EditPost.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Button } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';



export default function EditPost() {
    const [isLoading, setLoading] = useState(false)
    const { id } = useParams()
    const [post, setPost] = useState(null)


    useEffect(() => {
        axios.get(`https://first-posts-backend.onrender.com/api/v1/posts/${id}`).then(res => {
            setPost(res.data)
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    console.log("reRender");


    let validationSchema = Yup.object({
        title: Yup.string().max(30, 'Must be 30 characters or less')
            .required("This field Required"),
        description: Yup.string().required("This field Required"),
    })

    let formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            thumbnail: '',
        }, validationSchema,
        onSubmit: submitEditPost
    })

    let navigate = useNavigate()

    useEffect(() => {
        if (post) {
            formik.setValues({
                title: post.title || '',
                description: post.description || '',
                thumbnail: post.thumbnail || '',
            });
        }
    }, [post, formik.setValues]);

    async function submitEditPost(values) {
        console.log("submitting ...");
        setLoading(true)
        try {
            let res = await axios.put(`https://first-posts-backend.onrender.com/api/v1/posts/${id}`, values)
            console.log(res);
            toast.success('Post created successfully!');
            if (res.statusText == "OK") {
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


                <Button type="submit" disabled={!(formik.isValid && formik.dirty)} outline gradientDuoTone="pinkToOrange" className='my-4 m-auto'>Edit</Button>
            </form>
            <Toaster position='top-right' />

        </>
    )
}
