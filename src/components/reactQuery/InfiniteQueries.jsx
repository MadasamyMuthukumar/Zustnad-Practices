import React from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
const InfiniteQueries = () => {
    

    const { ref, inView } = useInView() //inView going to change when the ref enters the viewport
    const fetchGames = ({ pageParam }) => {  //whenever we are using infinitequery the queryFn will have pageParam 
        return axios.get(`http://localhost:5000/games?_limit=10&_page=${pageParam}`)

    }

    // console.log(postId)
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage,isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['games'],
        queryFn: fetchGames,
        initialPageParam: 1, //information about the starting page (pageParam will be 1 initially)
        getNextPageParam: (_lastPage, allPage) => { //used to calc next page number
            /**
             * laspage -> contains entire api repsonse of  last data fecth
             * allPage -> contains entire api response of all pages (all past data fetches)
             */
            //total 20 items and 5 pages
            //if fetched pages was less than 5 then return next page number(allpage length +1)
            //if all pages are already fetched then return undefined
            if (allPage.length < 5) return allPage.length + 1
            else return undefined

        }

    })
//whenever the empty div enters the viewport, going to call the 
    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView])

    if (isError) return <h2>{error.message}</h2>
    if (isLoading) return <h2>Loading...</h2>

    return (
        <div>
            {
                data?.pages?.map((page) => {
                    return page?.data?.map((game, i) => (
                        <li key={game.id}>{game.title}</li>
                    ))
                })
            }
            {/* <button onClick={fetchNextPage} disabled={!hasNextPage}>Load more</button> */}
            <div ref={ref}>
                {
                    isFetchingNextPage && "Loading...."
                }
            </div>
        </div>
    )

}

export default InfiniteQueries
