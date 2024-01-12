import { createContext, useState } from "react";

export const BasketContext = createContext()

const BasketProvider = ({children}) => {
    const [basketArr, setBasketArr] = useState(localStorage.getItem("Basket") ? JSON.parse(localStorage.getItem("Basket")) : [])

    localStorage.setItem("Basket", JSON.stringify(basketArr))

    let subtotal = 0

    basketArr.map((e) => {
        subtotal += e.total
    })

    const addToBasket = (item) => {
        const find = basketArr.find((x) => x._id === item._id)
        if(find) {
            find.count++
            find.total = find.count * find.price
            setBasketArr([...basketArr])
        }

        const total = item.price
        setBasketArr([...basketArr, {...item, count: 1, total}])
    }

    const modifyCount = (increment, item) => {
        const find = basketArr.find((x) => x._id === item._id) 
        if(increment) {
            find.count++
            find.total = find.count * find.price
            setBasketArr([...basketArr])
        } else {
            if(find.count === 1) {
                removeFromBasket(item._id)
                return
            }
            find.count--
            find.total = find.count * find.price
            setBasketArr([...basketArr])
        }
    }

    const removeFromBasket = (id) => {
        setBasketArr(basketArr.filter(item => item._id !== id))
    }

    const data = {basketArr, setBasketArr, addToBasket, modifyCount, removeFromBasket, subtotal}

    return (
        <BasketContext.Provider value={data}>{children}</BasketContext.Provider>
    )
}

export default BasketProvider