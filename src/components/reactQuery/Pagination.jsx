import React, { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
//http://localhost:5000/games?_limit=6&_page=2
const Pagination = () => {
    const [page, setPage] = useState(1)
    const fetchFruits = (pageNo) => {
        return axios.get(`http://localhost:5000/games?_limit=4&_page=${pageNo}`)

    }
    // console.log(postId)
    const { data, isLoading, isError, error, } = useQuery({
        queryKey: ['games', page],
        queryFn: () => fetchFruits(page),
        //prevent loading text from showing on screen while changing pages by retaining previous data
        //when the network call done the new data is replaced with old data without any loading text
        placeholderData: keepPreviousData
    })
    const { title, body } = data?.data || {}
    if (isError) return <h2>{error.message}</h2>
    if (isLoading) return <h2>Loading...</h2>
    return (
        <div>
            {
                data?.data.map((item, i) => (
                    <li key={item.id}>{item.title}</li>
                ))
            }
            {/* after page updated it will rerender the component, and the useQuery will be executed whenever
       the component mounts */}
            <button onClick={() => setPage(prev => prev - 1)} disabled={page == 0}>Prev</button>
            <button onClick={() => setPage(prev => prev + 1)} disabled={page == 5}>Next</button>
        </div>
    )
}

export default Pagination
