import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { COUNTRY_QUERY_KEY } from "../constants"
import { getCountries } from "../services"

export const useCountries =()=> {
   return useQuery({
        queryKey:COUNTRY_QUERY_KEY,
        queryFn: getCountries
    })
}