import React, { useState } from 'react'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import { products } from './data/products'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Home from './components/reactQuery/Home'
import { BrowserRouter, Router,Routes,Link, Route } from 'react-router-dom'
import RQposts from './components/reactQuery/RQposts'
import PostDetails from './components/reactQuery/PostDetails'
import Pagination from './components/reactQuery/Pagination'
import InfiniteQueries from './components/reactQuery/InfiniteQueries'
import Countries from './components/reactQuery/Countries'
// import Form from './components/form'

const App = () => {
  const queryClient = useQueryClient()
  // const [cart, setCart] = useState([])
  /**
   * useQuery to fetch data from the API
   * it handles the data, error, loading status by itself(no need to create seperate state for everthing)
   * unique query key will distinguish from all other query keys, (will be useful in cacheing)
   * we can pass multiple query keys inisde array
   * isFetching -> when the data was update in the db. then the backrground refetching of query will 
   * automatically happen and UI was updated. isFetching will be true or false during refetching 
   */

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json()),
    staleTime:2000,
    refetchOnWindowFocus: false, // will not refetch query when the window was focused (ex: tab switching)
    // refetchInterval: 3000 //will refetch the query ever 4 scnds
    retry:3 //will try 3 times when the fetching was failure(initlila fetch + 3 times trying)
  })

  /**Use mutation used to mutate data */
  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: (newPost) => fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify(newPost)
    }).then((res) => res.json()),
    //when the mutation was succesfful, then again call the fetch query to get the updated data
    onSuccess:(newPost)=>{
      // queryClient.invalidateQueries({queryKey:['todos']})
     /** 
      * useing queryClient to set the Query with newData manually
      * 1st arg-> list of query keys that we want to edit the cache
      * 2nd cb fun -> will have the current state of data
      * onSucess will have the return(result) of fetch query above*/ 
      queryClient.setQueryData(['todos'], (oldPost)=>[...oldPost,newPost])
    }

  })
  if (error || isError) return <h1>error</h1>
  if (isLoading) return <h1>Loading...</h1>
  return (
    <BrowserRouter>
    <div>
      <nav>
        <ul>
          <li> <Link to="/">Home</Link> </li>
          <li> <Link to="/posts">RQposts</Link> </li>
        </ul>
      </nav>
      <Routes>
 
        <Route exact path='/posts' element={<RQposts/>} />
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/posts/:postId' element={<PostDetails />} />
        <Route exact path='/fruits' element={<Pagination />} />
        <Route exact path='/infinite-fruits' element={<InfiniteQueries />} />
      </Routes>
      
      {/* {
        isPending && <h1>Data being Added!</h1>
      }
      {/* <ProductList products={products} />
      <Cart /> 
      <button onClick={() => mutate({
        "userId": 1000,
        "id": 1000,
        "title": "Hello World",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      })}>Add post</button>
      <ul>
        {data.map((item, i) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul> */}
      <Countries />
    </div>
    </BrowserRouter>
  )
}

export default App

/**
 * If you have a query depends on other
 * makes the fisrt query fisrt -> get the data -> add that data as part of enabled in second query
 * ex
 */
//  const { data } = useQuery({ some query })
// const id = data.id

// const {data} = useQUery({

// enabled: !!id  id is not null and also true-> then only this query will execute
// })