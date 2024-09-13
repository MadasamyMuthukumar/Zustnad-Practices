import React, { useEffect } from 'react'
import { useCountries } from '../../hooks'

const Countries = () => {
    const { data , isLoading , isError, error, isFetching} = useCountries()
    console.log(data);
    if (isError){
        return <h1>{error.message}</h1>
    }
    if(isLoading || isFetching){
        return <h3>Loading...</h3>
    }
    // if(data){
    //     return <div>{data.toString()}</div>
    // }else{
    //     return <h4>NOt</h4>
    // }
    return (
        <div>
            {
            data.map((country,index)=>{
            if(index >10) return null
            
            return (
                <div>{country.name.common}</div>
            )
        })}
        </div>
    )

}

export default Countries
