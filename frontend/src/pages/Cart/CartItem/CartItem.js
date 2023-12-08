import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './cartItem.scss'
import {FaRegTrashAlt} from 'react-icons/fa'
import { CartContext } from '../../../Context/CartContext'

import { useTranslation } from 'react-i18next';

function CartItem(props) {
    const {cart, setCart, quantity, setQuantity, total, setTotal, payment, setPayment} = useContext(CartContext)
    const [isDeleted , setIsDeleted] = useState(false)

    const titleUrl = props.title
    const newTitleUrl = titleUrl.replace(/\s/g, '-').toLowerCase()
    const itemUrl = `${props.proid}-buy-${newTitleUrl}`

    const {t} = useTranslation();

    useEffect(() => {
        const token = localStorage.getItem('accessUserToken')
        const getCartDetails = async () => {
            try {
                const response = await fetch("/cart/info",{
                method: 'POST',
                headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token}
                })
                .then((res) => res.json())
                .then((data) => setCart(data))
            } catch (error) {
                
            }
        }
        getCartDetails()
    },[])

    const handleDelete = async () => {
        const token = window.localStorage.getItem('accessToken')
        setQuantity(quantity - 1)
        const body = {
            inventid : props.id,
            price : props.price,
            cartid : cart.cartid,
            quantity: quantity - 1
        }
        const res = await fetch('/cart/remove', {
            method: "DELETE",
            headers: {"Authorization" : "Bearer " + token, "Content-type": "application/json"},
            body: JSON.stringify(body)
        })
        .then((res) => res.json)
        .then(() => {
            setIsDeleted(true)
            setTotal(parseFloat(parseFloat(total - props.price).toFixed(2)))
            const newArr = payment?.filter(object => {
                return object.inventid !== props.id
            })
            setPayment(newArr)
            console.log(payment)
        })
    } 
  return (
    <div className={isDeleted ? 'cart-item deleted' : 'cart-item'}>
        <div className='left'>
            <div className='thumb'>
                <Link to = {{pathname: `/${itemUrl}/`}}>
                    <img src={props.thumb}></img>
                </Link>
                
            </div>
            <div className='info'>
                <h1>{props.title}</h1>
                <span>Steam</span>
                <div className='bottom'>
                    <FaRegTrashAlt className='icon' onClick={handleDelete}></FaRegTrashAlt>
                    <div className='spacer'></div>
                    <div className='wishlist'>{t("move-to-wishlist")}</div>
                </div>
            </div>
        </div>
        
        <div className='right'>
            <span>${props.price}</span>
        </div>
    </div>
  )
}

export default CartItem