import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, {useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const RQposts = () => {

    const queryClient = useQueryClient()
    //unique query keys
    // 1. /posts -> ['posts']
    // 2./posts/1 -> ['posts',post.id]
    // 3./posts/1/comments -> ['posts',post.id,'comments']
    // State variables for title and body
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    //posting data
    const postData =(data)=>{
        return axios.post('http://localhost:5000/posts',data)
    }


    const { data, isLoading, isError, error, refetch } = useQuery({ //isError -> boolean error->error msg
        queryKey: ['posts'],
        queryFn: () => {
            return axios.get('http://localhost:5000/posts')  //returning promise to queryFn
        },
        staleTime: 20000, //will not make same request query(backgroud refetch) again for next 30 sec and always pull from cache
        // refetchInterval: 1000, //each 1 sec the fethcing going to happen
        // refetchIntervalInBackground: true, //even we moved to other tabs, polling continues
        enabled: true //disabling this query on component mounts, only we can manually call this query

    })

    const {mutate: addData} = useMutation({
        mutationFn:postData,
        // onSuccess:(newData)=>{  //will take response of mutationFn
        //     // console.log(newData+"ghjkj")
        //     // queryClient.invalidateQueries({queryKey:['posts']}) //will work when enabled true in queryKey of posts
        //     // invalidate queries will make anothher get request to take just one created object. the efficient method will be
        //     queryClient.setQueryData(['posts'],(oldData)=>{ //taking cached data from posts(queryKey)
        //         return {  //modifying only the data part
        //             ...oldData,
        //             data:[...oldData.data, newData.data]
        //         }
        //     })
        // }

                    /**
             * OPTIMISTIC UPDATE
             * update the state before performing mutation, under the assumption that nothing goes wrong
             * onmutate->is called before the mutation fn is fired, and receives the exact paylaod (user input) as mutationFn
             */
            onMutate:async (data)=>{
                //cancelling all outgoing refetches before mutation in posts, so they do not override anyting
                //while mutating if any outgoing refetch was happened then any bug may arise, so cancelling all
                await queryClient.cancelQueries(['posts'])

                //taking the current cached data, so we can display it if there is any error while fetching
                const previousData = queryClient.getQueryData(['posts'])

                //now going to update the internal cache list with new data item receiving as params
                queryClient.setQueryData(['posts'], (oldData)=>{
                    /**data will resemble the exact payload(user input)
                     * hence we have to add along with id 
                     */
                    return {
                        ...oldData,
                        data:[...oldData.data, {...data, id:oldData?.data?.length + 1}]
                    }
                    //we have now updated the list of posts even before making post api request
                })
                
                    //now returning the fallback return, to return the previousdata.
                    //this will happen when there is an error in the updation of posts
                return {
                    previousData
                }
            },
           /**post-> will be the exact payload recieved by mutationFn
            * context -> provides access to previousData from onMutate */ 
            onError:(_error, _post, context)=>{
                /**on the event of errors we can reset the list with previous data usign setQuerydata mthd */   
                queryClient.setQueryData(['posts'], context.previousData)
            },
            /**triggered when mutation was successful or also after error */
            onSettled:()=>{
                //fetch all the posts so that server data is in sync with post data
                queryClient.invalidateQueries(["posts"])
            }
    })

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addData({title,body})
        console.log('Title:', title);
        console.log('Body:', body);
        setTitle('')
        setBody('')
    };

    if (isError) return <h1>{error.message}</h1>
    if (isLoading) return <h1>Loading...</h1>
    // console.log(data);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <button onClick={refetch}>Fetch list</button>
            <ul>
                {
                    data?.data.map((item, i) => (
                        <Link to={`/posts/${item.id}`} key={item.id}>
                            <li key={item.id}>{item.title}</li>
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}

export default RQposts
