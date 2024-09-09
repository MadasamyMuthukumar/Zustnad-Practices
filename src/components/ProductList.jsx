import React from 'react'
import { useCartStore, useCartStoreSelectors } from '../store/cartStore'
// import { addSelector } from '../store/cartStore'

const ProductList = ({products}) => {
    // const addToCart = useCartStore(addSelector)
    const addToCart = useCartStoreSelectors.use.addToCart();
  return (
    <div>
        {
            products.map((item,i)=>(
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    {/* <button onClick={()=>setCart((cart)=> [...cart , item])}>Add to Cart</button> */}
                    <button onClick={()=>addToCart(item)}>Add to Cart</button> 
                </div>
            ))
        }
    </div>
  )
}

export default ProductList