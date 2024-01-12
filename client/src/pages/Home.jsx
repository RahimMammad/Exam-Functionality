import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import UseFetchData from '../hooks/UseFetchData'
import { useNavigate } from 'react-router-dom'
import { WishlistContext } from '../context/WishlistContext'
import { BasketContext } from '../context/BasketCoontext'

const Home = () => {
    const {data} = UseFetchData()
    const navigate = useNavigate()
    const [inpValue, setInpValue] = useState("")
    const [sortedData, setSortedData] = useState("default")
    const {addToWishlist} = useContext(WishlistContext)
    const {addToBasket} = useContext(BasketContext)

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(inpValue)
    )
    data.sort((a, b) => {
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()

        if(sortedData === "asc") {
            return nameA.localeCompare(nameB)
        } else if(sortedData === "desc"){
            return nameB.localeCompare(nameA)
        } else {
            return 0
        }
    })

    const handleSort = (selectedOrder) => {
        setSortedData(selectedOrder)
    }
    
  return (
    <div>
        <Helmet>
            <title>Home</title>
        </Helmet>
        <div>
            <div>
                <input type="text" placeholder='Search' onChange={(e) => setInpValue(e.target.value.toLowerCase())} value={inpValue} />
                <select value={sortedData} onChange={(e) => setSortedData(e.target.value)}>
                    <option value="default">Default</option>
                    <option value="asc">A-Z</option> 
                    <option value="desc">Z-A</option>
                </select>
            </div>
            <div className='max-w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {
                    filteredData.map((item) => {
                        return (
                            <div key={item._id} className='max-w-[400px]'>
                                <img src={item.image} alt="" />
                                <h2>{item.name}</h2>
                                <p>{item.description}</p>
                                <span>{item.price}</span><br />
                                <button className='bg-red-600' onClick={() => navigate(`${item._id}`)}>Detail</button>
                                <button onClick={() => addToWishlist(item)}>Add To Wishlist</button>
                                <button onClick={() => addToBasket(item)}>Add To Basket</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Home