import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <ul>
            <Link to={"/"}>Home</Link>
            <Link to={"/add"}>Add</Link>
            <Link to={"/basket"}>Basket</Link>
            <Link to={"/wishlist"}>Wishlist</Link>
        </ul>
    </div>
  )
}

export default Header