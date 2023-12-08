import './userNav.scss'
import React, {useState, useContext} from 'react'
import Separator from '../../../components/Separator/Separator'
import {MdOutlineSpaceDashboard} from 'react-icons/md'
import {RxGear} from 'react-icons/rx'
import UserDash from '../UserDash/UserDash'
import Wishlist from '../Wishlist/Wishlist'
import { CartContext } from '../../../Context/CartContext'
import Library from '../UserDash/Library/Library'
import Orders from '../Orders/Orders'
import { useTranslation } from 'react-i18next';
function UserNav(props) {
    const {t} = useTranslation();
    const {isClicked, setIsClicked} = useContext(CartContext)
  return (
    <div className='dashboard-container'>
        <div className='dashboard-header-container'>
            {isClicked === 'dashboard'
            ? <div className= 'link dashboard' onClick={() => {setIsClicked("dashboard")}}> <MdOutlineSpaceDashboard className='icon'></MdOutlineSpaceDashboard>{t("dashnav-dashboard")}</div>
            : <div className= 'link' onClick={() => {setIsClicked("dashboard")}}><MdOutlineSpaceDashboard className='icon'></MdOutlineSpaceDashboard>{t("dashnav-dashboard")}</div>
            }
            {isClicked === 'orders'
            ? <div className= 'link orders' onClick={() => {setIsClicked("orders")}}>{t("my-orders")}</div>
            : <div className= 'link' onClick={() => {setIsClicked("orders")}}>{t("my-orders")}</div>
            }

            {isClicked === 'wishlist'
            ? <div className= 'link wishlist' onClick={() => {setIsClicked("wishlist")}}>{t("userdash-wishlist")}</div>
            : <div className= 'link' onClick={() => {setIsClicked("wishlist")}}>{t("userdash-wishlist")}</div>
            }

            {isClicked === 'library'
            ? <div className= 'link library' onClick={() => {setIsClicked("library")}}>{t("userdash-library")}</div>
            : <div className= 'link' onClick={() => {setIsClicked("library")}}>{t("userdash-library")}</div>
            }
            

            {isClicked === 'settings'
            ? <div className= 'link settings' id='settings' onClick={() => {setIsClicked("settings")}}><RxGear className='icon settings'></RxGear>{t("dashnav-settings")}</div>
            : <div className= 'link' id='settings' onClick={() => {setIsClicked("settings")}}><RxGear className='icon settings'></RxGear>{t("dashnav-settings")}</div>
            }
            
        </div>
        <Separator></Separator>
        {isClicked === 'dashboard' && <UserDash wish = {props.wish}></UserDash>}
        {isClicked === 'orders' && <Orders id = {props.id}></Orders>}
        {isClicked === 'wishlist' && <Wishlist id = {props.id}></Wishlist>}
        {isClicked === 'library' && <Library id = {props.id}></Library>}
        <Separator status = '2'></Separator>
    </div>
  )
}

export default UserNav