import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { WishlistContext } from '../context/WishlistContext'

const Wishlist = () => {
  const {favs, removeFromWishlist} = useContext(WishlistContext)
  return (
    <div>
        <Helmet>
            <title>Wishlist</title>
        </Helmet>

        {
          favs.length === 0 ? <h1>Wishlist is Empty</h1> : <div>
          <table>
            <thead>
              <tr>
                <td>Image</td>
                <td>Name</td>
                <td>Description</td>
                <td>Price</td>
                <td></td>
              </tr>
            </thead>  
            <tbody>
              {
                favs && favs.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td className='w-[80px] h-[80px]'><img src={item.image} alt="" /></td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td><button onClick={() => removeFromWishlist(item._id)}>Remove</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          </div>
        }
    </div>
  )
}

export default Wishlist