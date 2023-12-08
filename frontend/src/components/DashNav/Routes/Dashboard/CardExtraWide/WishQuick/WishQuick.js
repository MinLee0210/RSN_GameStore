import React, {useContext} from 'react'
import './wishQuick.scss'
import {TbComet} from 'react-icons/tb'
import { CartContext } from '../../../../../../Context/CartContext'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function WishQuick() {
    const {t} = useTranslation();
    const {wishDetails} = useContext(CartContext)
  return (
    <div className='latest-wish-container'>
        <TbComet className='icon starstrike'></TbComet>
        <label className='header'>{t("latest-wishlist")}</label>
        <div className='latest-container'>
            <div className='space'></div>
            <div className='latest-inner-container'>
                {
                    wishDetails && wishDetails.map((wish, index) => {
                        return(
                            <div className='latest-product' key={wish.productid}>
                                <Link to = {{pathname: `/${wish.productid}-buy-${(wish.title)?.replace(/\s/g, '-').toLowerCase()}/`}} className='image'>
                                    <img src={wish.filecover1}></img>
                                </Link>
                                <div className='info'>
                                    <label className='title'>{wish.title}</label>
                                    <label className='price'>${wish.price}</label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default WishQuick