import { createContext, useState } from "react";

export const WishlistContext = createContext()

const WishlistProvider = ({children}) => {
    const [favs, setFavs] = useState(
        localStorage.getItem("Wishlist") ? JSON.parse(localStorage.getItem("Wishlist")): []
    )

    localStorage.setItem("Wishlist", JSON.stringify(favs))
    
    const addToWishlist = (item) => {
        const find = favs.find((x) => x._id === item._id)
        if(!find) {
            setFavs([...favs, item])
        }
    }

    const removeFromWishlist = (id) => {
        setFavs(favs.filter(item => item._id !== id))
    }

    const data = { favs, setFavs, addToWishlist, removeFromWishlist }

    return (
        <WishlistContext.Provider value={data}>{children}</WishlistContext.Provider>
    )
} 

export default WishlistProvider