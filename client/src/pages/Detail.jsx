import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

const Detail = () => {
    const {id} = useParams()
    const [productData, setProductData] = useState({})

    useEffect(() => {
       const fetchData = async () => {
            const res = await axios.get(`http://localhost:8000/${id}`)
            setProductData(res.data)
       } 
       fetchData()
    }, [])
  return (
    <div>
        <Helmet>
            <title>Detail</title>
        </Helmet>
        <div>
        <div key={productData._id}>
            <img src={productData.image} alt="" />
            <div>
                <h2>{productData.name}</h2>
                <p>{productData.description}</p>
                <span>{productData.price}</span>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Detail