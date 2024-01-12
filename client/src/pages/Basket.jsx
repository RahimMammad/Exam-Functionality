import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { BasketContext } from '../context/BasketCoontext'

const Basket = () => {
  const {basketArr, removeFromBasket, modifyCount, subtotal} = useContext(BasketContext)
  return (
    <div>
        <Helmet>
            <title>Basket</title>
        </Helmet>
        {
          basketArr.length === 0 ? <h1>Basket Is Empty</h1> : 
          <div>
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
              basketArr && basketArr.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className='w-[80px] h-[80px]'><img src={item.image} alt="" /></td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <div>
                        <button onClick={() => modifyCount(true, item)}>+</button>
                        <span>{item.count}</span>
                        <button onClick={() => modifyCount(false, item)}>-</button>
                      </div>
                    </td>
                    <td>{item.price}</td>
                    <td><button onClick={() => removeFromBasket(item._id)}>Remove</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        </div>
        }
        <span>${subtotal}.00</span>
    </div>
  )
}

export default Basket