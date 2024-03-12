import React, { useContext, useEffect, useState } from 'react'
import Style from './EditPost.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Button } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { authContext } from '../../context/AuthContext';
import { storage } from './../../firebase/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'


export default function EditPost() {
    const [isLoading, setLoading] = useState(false)
    const { id } = useParams()
    const [post, setPost] = useState(null)
    let { userToken } = useContext(authContext)
    let navigate = useNavigate()
    const [imageUpload, setImageUpload] = useState(null)

    useEffect(() => {
        axios.get(`https://first-posts-backend.onrender.com/api/v1/posts/${id}`).then(res => {
            setPost(res.data)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    let validationSchema = Yup.object({
        title: Yup.string().max(20, 'Must be 20 characters or less')
            .required("This field Required"),
        description: Yup.string().required("This field Required"),
        image: Yup.mixed()
    })

    let formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            image: '',
        }, validationSchema,
        onSubmit: submitEditPost
    })

    useEffect(() => {
        if (post) {
            formik.setValues({
                title: post.title || '',
                description: post.description || '',
                image: post.image || '',
            });
        }
    }, [post, formik.setValues]);

    async function submitEditPost(values) {
        console.log("submitting ...");
        setLoading(true)
        try {
            if (imageUpload == null) {
                toast.error('Please select an image!');
                return
            }
            const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)

            await uploadBytes(imageRef, imageUpload).then(() => {
                toast.success('Image uploaded!');
            }).catch(err => {
                console.log(err);
                toast.error('Faild to created Post!');
            })

            values.image = await getDownloadURL(imageRef)

            let res = await axios.put(`https://first-posts-backend.onrender.com/api/v1/posts/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })

            toast.success('Post created successfully!');
            if (res.status == 201) {
                setTimeout(() => {
                    navigate('/')
                }, 0);
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            toast.error('Faild to created Post!');
            setLoading(false)
        }
    }

    const handleFileChange = event => {
        setImageUpload(event.target.files[0])
        formik.setFieldValue('image', event.currentTarget.files[0]); // Set the value of the image field
    };


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                {imageUpload != null ?
                    <img className='w-5/6 sm:w-3/6 m-auto' src={URL.createObjectURL(imageUpload)} alt="" />
                    : post && post.image && post.image !== '' ?
                        <img className='w-5/6 sm:w-3/6 m-auto' src={post.image} alt="" />
                        : null
                }

                <label htmlFor="postTitle">Title:</label>
                <input type="text"
                    id="postTitle"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    name='title' className='block w-5/6 sm:w-3/6 my-2 p-2 border border-gray-300 rounded-md m-auto focus:ring-red-500 focus:border-orange-300' />
                {formik.errors.title && formik.touched.title ? <div className='w-2/6 m-auto py-1 rounded-md text-white text-center justify-center grid-cols-none alert alert-error'>{formik.errors.title}</div> : null}

                <label htmlFor="postDescription">Description:</label>
                <textarea
                    id="postDescription"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    rows={4}
                    name='description' className='block w-5/6 sm:w-3/6 my-2 p-2 border border-gray-300 rounded-md m-auto focus:ring-red-500 focus:border-orange-300' />
                {formik.errors.description && formik.touched.description ? <div className='w-2/6 m-auto py-1 rounded-md text-white text-center justify-center grid-cols-none alert alert-error'>{formik.errors.description}</div> : null}

                <label htmlFor="postImage">Image:</label>
                <input type="file"
                    id="postImage"
                    onBlur={formik.handleBlur}
                    onChange={handleFileChange}
                    name='image' className='block w-3/6 my-2 p-2 border border-gray-300 rounded-md m-auto focus:ring-red-500 focus:border-orange-300' />
                {formik.errors.description && formik.touched.description ? <div className='w-2/6 m-auto py-1 rounded-md text-white text-center justify-center grid-cols-none alert alert-error'>{formik.errors.description}</div> : null}

                <Button type="submit" disabled={!imageUpload || isLoading || !(formik.isValid && formik.dirty)} outline gradientDuoTone="pinkToOrange" className='my-4 m-auto'>Edit</Button>
            </form>
            <Toaster position='top-right' />
        </>
    )
}
