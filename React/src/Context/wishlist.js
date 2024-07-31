import axios, { all } from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { tokenContext } from './token';
import Loader from '../Components/Loader/Loader';


export const wishContext = createContext();
export default function WishProvider({ children }) {

    const { token } = useContext(tokenContext);
    const [numOfWishItems, setNumOfWishItems] = useState(0)
    const [allWishProducts, setAllWishProducts] = useState([]);
    const [idProducts, setIdProducts] = useState([]);


    const extractPropertyValues = () => {
        if (allWishProducts.length > 0) {
            const newPropertyValues = allWishProducts.map(product => product.id);
            setIdProducts(newPropertyValues);
        }
    };

    function addProductToWish(id) {
        axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
            "productId": id
        }, {
            headers: { token: localStorage.getItem('token') }
        }).then((res) => {
            if (idProducts.includes(id)) {
                removeFromWish(id);
             }
            else {
                toast.success('Added to Wishlist', { duration: 2000, position: 'top-center' })
                getUserWish();
            }

                return true;
            }).catch((err) => {
                toast.error('Error occured', { duration: 2000, position: 'top-center' });

                return false;
            })
    }

    function getUserWish() {
        axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: { token: localStorage.getItem('token') }
        }).then((res) => {
            setAllWishProducts(res.data.data);
            setNumOfWishItems(res.data.count);
            extractPropertyValues();
            if (allWishProducts.length > 0) {
                extractPropertyValues();
            }
            // console.log(res.data.data);

        }).catch((err) => {
            console.log('failed', err);
            // <Loader />
        })
    }

    function removeFromWish(id) {
        const booleanFlag = axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((res) => {
            // toast.success("Item removed successfully", { duration: 2000, position: 'top-center' });
            setAllWishProducts(res.data.data);
            setNumOfWishItems(res.data.count);
            getUserWish();

            return true;
        }).catch((err) => {
            return false;
        })

        return booleanFlag;
    }

    useEffect(() => {
        getUserWish();
    }, [getUserWish]);

    return <wishContext.Provider value={{
        setNumOfWishItems,
        allWishProducts,
        addProductToWish,
        getUserWish,
        removeFromWish,
        numOfWishItems,
        idProducts,
    }}>
        {children}
    </wishContext.Provider>
}