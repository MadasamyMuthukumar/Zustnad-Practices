import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

// const queryClient = new QueryClient({
//   defaultOptions :{
//     queries : {
//       staleTime: 3000,
//       gcTime: 10 * (6000)
//     }
//   }
// })  //instantiating query client
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* passing queryClinet means we are telling that all component can access cache of react query */}
    <QueryClientProvider client={queryClient}> 
    <App />
    <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </StrictMode>,
)

/** STALE TIME
 * Suppose you are fetching user data from an API, and you want to avoid refetching the data too frequently if it doesn't change often. 
 * You might set a staleTime of 10 minutes (600,000 milliseconds). 
 * This means the data will be considered fresh for 10 minutes, and React Query won't refetch it during this period.
 * Once the data becomes stale (after the staleTime has passed), the next time a component queries for that data,
 *  React Query will refetch it to ensure it's up-to-date.
 * it blocks the background fetching when the data was updated for a provided period of time
 * CACHE TIME
 * Let's say you have a cacheTime of 5 minutes (300,000 milliseconds). This means that even after a component using the data has unmounted or stopped using it, 
 * the data will remain in the cache for 5 minutes before being removed.
 */