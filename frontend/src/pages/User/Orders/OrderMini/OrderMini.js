import React, { useEffect, useState } from 'react'
import './orderMini.scss'
import { useTranslation } from 'react-i18next';

function OrderMini(props) {
    const {t} = useTranslation();
    const [items, setItems] = useState([])

    useEffect(() => {   
        const getItems = async () => {
            const token = localStorage.getItem("accessUserToken")
            const body = { orderID : props.id}
            const response = await fetch('/get/orders/details',{
                method: "POST",
                headers: {"Content-type" : "application/json", "Authorization" : "Bearer " + token},
                body: JSON.stringify(body)
            })
            .then((res) => res.json())
            .then((data) => setItems(data))
        }
        getItems()
    },[])

  return (
    <div className='order-mini-container'>
        {
            items && items.map((product, index) => {
                return(
                    <div className='order-mini' key = {product.productid}>
                        <div className='order-content'>
                            <div className='order-info'>
                                <div className='order-image'>
                                    <img src = {product.filecover1} alt=''/>
                                </div>
                                <div className='order-details'>
                                    <label className='title'>{product.title}</label>
                                    <div className='order-specs'>
                                        <label className='system'>{t("system-pc")}</label>
                                        <label className='system'>{t("platform-steam")}</label>
                                    </div>
                                </div>
                            </div>
                            <label className='price'>${product.price}</label>
                        </div>
                        <div className='spacer'></div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default OrderMini