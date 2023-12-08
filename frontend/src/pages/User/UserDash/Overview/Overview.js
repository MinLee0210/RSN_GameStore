import React, {useContext} from 'react'
import './overview.scss'
import {RiNumbersFill} from 'react-icons/ri'
import { CartContext } from '../../../../Context/CartContext'
import { useTranslation } from 'react-i18next';

function Overview(props) {
    const {t} = useTranslation();
    const {libraryNumb} = useContext(CartContext)
  return (
    <div className='overview-container'>
        <RiNumbersFill className='icon'></RiNumbersFill>
        <label className='header'>{t("userdash-overview")}</label>
        <div className='stats-container'>
            <div className='space'></div>
            <div className='numbers-container'>
                <div className='sub-stat'>
                    <div className='number'>{libraryNumb}</div>
                    <div className='title'>{t("userdash-games")}</div>
                </div>
                <div className='sub-stat'>
                    <div className='number'>{props.wish}</div>
                    <div className='title'>{t("userdash-wishlist")}</div>
                </div>
                <div className='sub-stat'>
                    <div className='number'>0</div>
                    <div className='title'>{t("userdash-likes")}</div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Overview