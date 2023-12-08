import React, {useState, useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom'
import './dashnav.scss'
import Dashboard from './Routes/Dashboard/Dashboard'
import {MdOutlineSpaceDashboard} from 'react-icons/md'
import {AiFillCaretRight} from 'react-icons/ai'
import {RxGear} from 'react-icons/rx'
import { useTranslation } from 'react-i18next';

import Add from './Routes/AddProduct/Add'
import Separator from '../Separator/Separator'
import Edit from './Routes/EditProduct/Edit'
import EditForm from './Routes/EditProduct/Edit-Form-Page/EditForm'
import AdminSettings from './Routes/Settings/AdminSettings'

function DashNav(props) {
  const {t} = useTranslation();
  const [isClicked, setIsClicked] = useState("dashboard")
  return (
    <div className='dashboard-container'>
        <div className='dashboard-header-container'>
            {isClicked === 'dashboard'
            ? <div className= 'link dashboard' onClick={() => {setIsClicked("dashboard")}}> <MdOutlineSpaceDashboard className='icon'></MdOutlineSpaceDashboard>{t("dashnav-dashboard")}</div>
            : <div className= 'link' onClick={() => {setIsClicked("dashboard")}}><MdOutlineSpaceDashboard className='icon'></MdOutlineSpaceDashboard>{t("dashnav-dashboard")}</div>
            }
            {isClicked === 'add'
            ? <div className= 'link add' onClick={() => {setIsClicked("add")}}>{t("dashnav-addproducts")}</div>
            : <div className= 'link' onClick={() => {setIsClicked("add")}}>{t("dashnav-addproducts")}</div>
            }

            {isClicked === 'edit'
            ? <div className= 'link edit' onClick={() => {setIsClicked("edit")}}>{t("dashnav-editproducts")}</div>
            : <div className= 'link' onClick={() => {setIsClicked("edit")}}>{t("dashnav-editproducts")}</div>
            }

            {isClicked === 'settings'
            ? <div className= 'link settings' id='settings' onClick={() => {setIsClicked("settings")}}><RxGear className='icon settings'></RxGear>{t("dashnav-settings")}</div>
            : <div className= 'link' id='settings' onClick={() => {setIsClicked("settings")}}><RxGear className='icon settings'></RxGear>{t("dashnav-settings")}</div>
            }
            
        </div>
        <Separator></Separator>
        {isClicked === 'dashboard' && <Dashboard></Dashboard>}
        {isClicked === 'add' && <Add></Add>}
        {isClicked === 'edit' && <Edit></Edit>}
        {isClicked === 'settings' && <AdminSettings id = {props.id} fname = {props.fname} mname = {props.mname} 
        lname = {props.lname} age = {props.age} email = {props.email}  
        ></AdminSettings>}
        <Separator></Separator>
    </div>
  )
}

export default DashNav