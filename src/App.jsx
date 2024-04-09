import axios from 'axios'

import { useEffect, useState } from 'react'

function App() {
  const [search,setSearch]=useState('wood')
  //const [loading,products,error]=customReactQuery('/api/products?search='+search)
  const [products,setProducts]=useState([])
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    const controller=new AbortController() 
    //Use this semicolon before writing an IIFE function otherwise it will give
    //error 
    ;(async()=>{
      try {
        setLoading(true)
        setError(false)
        const response=await axios.get('/api/products?search='+search
        ,{signal:controller.signal})
        console.log(response.data)
        setProducts(response.data)
        setLoading(false)
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('Request cancelled ',error.message)
          return
        }
        setError(true)
        setLoading(false)
      }
    })()

    return ()=>{
      controller.abort()
    }
  },[search])

  if(error){
    return <h2>Error occured</h2>
  }

  if(loading){
    return <h1>Loading...</h1>
  }
  return (
    <>
     <h1>Welcome to our site</h1>
     <input type='text' placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
     <h2>Number of products are: {products.length}</h2>
     
    </>
  )
}

export default App

// const customReactQuery=(urlpath)=>{
  
 

//   return [loading,products,error]
// }