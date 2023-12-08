import React, { useContext, useEffect } from 'react'
import './orders.scss'
import { CartContext } from '../../../Context/CartContext'
import OrderMini from './OrderMini/OrderMini'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function Orders(props) {
    const {t} = useTranslation();
    const {orders, setOrders} = useContext(CartContext)  
    useEffect(() =>{
        const token = window.localStorage.getItem("accessUserToken")
        const body = {userID : props.id}
        const getOrders = async () => {
            const response = await fetch('/get/orders', {
                method: 'POST',
                headers: {"Content-type" : "application/json", "Authorization" : "Bearer " + token},
                body: JSON.stringify(body)
            })
            .then((res) => res.json())
            .then((data) => setOrders(data))
        }
        getOrders()
    }, [])

    const dayCovertion = (date) => {
        const getDate = new Date(date)
        return getDate.toLocaleString("en-GB" , {
            year : "numeric",
            day : "2-digit",
            month : "2-digit",
            hour : "2-digit",
            minute : "2-digit"
        })
    }


  return (
    <div className='order-container'>
        {
            orders && orders.map((order, index) => {
                return (
                    <Link to = {{pathname: `/order/${order.orderid}/`}} className='order-item-outer' key={order.orderid}>
                        
                        <div className='order-item-inner' value = {order.orderid}>
                            <div className='status'>{t("completed")}</div>
                            {
                                <OrderMini id = {order.orderid}></OrderMini>
                            }
                            <div className='order-info'>
                                <label className='total'>{t("total")}</label>
                                <label className='total-price'>${order.totalprice}</label>
                            </div>
                        </div>
                        <div className='order-bottom'>
                            <label className='order-id'>Order #{order.orderid}</label>
                            <label className='order-id'>&#8226;</label>
                            <label className='order-id'>Visa</label>
                            <label className='order-id'>&#8226;</label>
                            <label className='order-id'>{dayCovertion(order.ordered_at)}</label>
                        </div>
                    </Link>
                )
            })
        }
    </div>
  )
}

export default Orders