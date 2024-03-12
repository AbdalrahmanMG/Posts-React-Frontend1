import React, { useContext, useState } from 'react'
import Style from './AddPost.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { authContext } from '../../context/AuthContext';
import { storage } from './../../firebase/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'



export default function AddPost() {
    const [isLoading, setLoading] = useState(false)
    let { userToken } = useContext(authContext)
    let navigate = useNavigate()
    const [imageUpload, setImageUpload] = useState(null)
    const [imagePreview, setImagePreview] = useState(null);

    // form schema and validation using yup
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
        onSubmit: submitAddPost
    })


    // creating new post
    async function submitAddPost(values) {
        console.log("submitting ...");
        setLoading(true)
        try {
            if (imageUpload == null) {
                return
            }
            const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
           
            await uploadBytes(imageRef, imageUpload).then(() => {
                toast.success('Image uploaded!');
            })
            values.image = await getDownloadURL(imageRef)

            let res = await axios.post(`https://first-posts-backend.onrender.com/api/v1/posts`, values, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
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
        setImagePreview(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <>
             {imagePreview && <img className='w-5/6 sm:w-3/6 m-auto' src={imagePreview} alt="Preview" />}
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


                <Button type="submit" disabled={!imageUpload || isLoading || !(formik.isValid && formik.dirty)} outline gradientDuoTone="pinkToOrange" className='my-4 m-auto'>Add post</Button>
            </form>
            <Toaster position='top-right' />
        </>
    )
}
