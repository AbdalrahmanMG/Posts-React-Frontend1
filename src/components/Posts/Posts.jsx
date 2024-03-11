import React, { useEffect, useState } from 'react'
import Style from './Posts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


export default function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('https://first-posts-backend.onrender.com/api/v1/posts').then(res => {
            setPosts(res.data)
        })
            .catch(err => {
                console.log(err);
            })
    }, [])

    function handleDelete(postId) {
        axios.delete(`https://first-posts-backend.onrender.com/api/v1/posts/${postId}`).then(res => {
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
                <div key={p.id} className="card card-side bg-base-100 shadow-xl my-10">
                    <figure className="w-fit h-fit aspect-w-16 aspect-h-9"><img src={p.image} className='object-cover w-full h-full' alt={p.title} /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{p.title}</h2>
                        <p>{p.description}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/editpost/${p.id}`} className="btn btn-primary">Edit</Link>
                            <button onClick={() => handleDelete(p.id)} className="btn btn-primary">Delete</button>
                        </div>
                    </div>
                </div>
            ))}
            <Toaster position='top-right' />
        </>


    )
}
