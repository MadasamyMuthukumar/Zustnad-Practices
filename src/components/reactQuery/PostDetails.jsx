import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

const PostDetails = () => {
    const {postId}= useParams()
    const fetchUniqueDetails =(id)=>{
    return axios.get(`http://localhost:5000/posts/${id}`)
        
    }
    // console.log(postId)
    const {data, isLoading, isError, error,}= useQuery({
        queryKey:['posts',postId],
        queryFn:()=>fetchUniqueDetails(postId)
    })
    const {title, body} = data?.data || {}
    if(isError) return <h2>{error.message}</h2>
    if(isLoading) return <h2>Loadingn...</h2>
  return (
    <div>
    <h1>{title}</h1>
    <p>{body}</p>
    </div>
  )
}

export default PostDetails
