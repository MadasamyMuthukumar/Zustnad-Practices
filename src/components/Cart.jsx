import React from 'react'
import { useCartStore, useCartStoreSelectors } from '../store/cartStore'
// import { removeSelector, clearSelector, cartSelector } from '../store/cartStore'

const Cart = () => {

    //OPTION:1 const { cart, clearCart,removeFromCart } = useCartStore((state) => ({
    //     cart: state.cart,
    //     clearCart: state.clearCart,
    //     removeFromCart: state.removeFromCart
    // })) //inside of hook we need to explain what we want by creating instances

    //OPTION 2 : we can also use like below
    // const cart = useCartStore(cartSelector)
    // const clearCart = useCartStore(clearSelector)
    // const removeFromCart = useCartStore(removeSelector)

    //OPTION:3 
    const cart = useCartStoreSelectors.use.cart()
    const clearCart = useCartStoreSelectors.use.clearCart()
    const removeFromCart = useCartStoreSelectors.use.removeFromCart()

  return (
    <div>
        <h2>Cart</h2>
        {
            cart.map((item,i)=>(
                <div key={item.id}>
                    <span>{item.name}</span>
                    {/* <button onClick={()=>setCart((cart)=> 
                    cart.filter((product)=> product.id!==item.id))}
                    >Remove</button> */}
                    <button onClick={()=>removeFromCart(item.id)}>Remove</button> 
                </div>
            ))

        }
        {
            cart.length > 0 && (
                // <button onClick={()=>setCart([])}>Clear Cart</button>
                <button onClick={clearCart}>Clear Cart</button>
            )
        }
    </div>
  )
}

export default Cart