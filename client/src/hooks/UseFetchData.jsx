import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UseFetchData = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:8000/`)
            setData(res.data)
       } 
       fetchData()
    }, [])
  return {data}
}

export default UseFetchData