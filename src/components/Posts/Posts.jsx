import React, { useContext, useEffect, useState } from 'react'
import Style from './Posts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { authContext } from '../../context/AuthContext';
import { Button } from 'flowbite-react';


export default function Posts() {
    const [posts, setPosts] = useState([])
    let { userToken } = useContext(authContext)

    useEffect(() => {
        axios.get('https://first-posts-backend.onrender.com/api/v1/posts').then(res => {
            setPosts(res.data)
        })
            .catch(err => {
                console.log(err);
            })
    }, [])

    function handleDelete(postId) {
        axios.delete(`https://first-posts-backend.onrender.com/api/v1/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }).then(res => {
            const updatedPosts = posts.filter(post => post.id !== postId);
            toast.success('Post deleted successfully!');
            setPosts(updatedPosts)
        }).catch(err => {
            console.log(err);
            toast.error('Failed to delete post!');

        })
    }

    return (
        <>
            {posts.map(p => (
                <div key={p.id} className="card md:card-side bg-base-100 shadow-xl sm:flex-col flex md:flex-row my-10">
                    <figure className="w-fit md:w-2/6 h-fit aspect-w-16 aspect-h-9"><img src={p.image} className='object-cover w-full h-full' alt={p.title} /></figure>
                    <div className="card-body">
                        <h2 className="card-title m-auto">{p.title}</h2>
                        <p>{p.description}</p>

                        {userToken ?
                            <div className="card-actions justify-end">
                                <Link to={`/editpost/${p.id}`} > <Button gradientMonochrome="info">Edit</Button></Link>
                                <Button onClick={() => handleDelete(p.id)} gradientMonochrome="failure">Delete</Button>
                            </div>
                            : ''}

                    </div>
                </div>
            ))}
            {userToken ?
                <Link className='fixed bottom-10 right-10 rounded-full' to="/addpost"><Button pill gradientMonochrome="cyan" >+</Button></Link>
                : ''
            }

            <Toaster position='top-right' />
        </>
    )
}
