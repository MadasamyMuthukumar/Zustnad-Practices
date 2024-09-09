import React, { useState } from 'react'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import { products } from './data/products'

const App = () => {
  const [cart , setCart] = useState([])
  return (
    <div>
      <ProductList products={products} />
      <Cart />
    </div>
  )
}

export default App