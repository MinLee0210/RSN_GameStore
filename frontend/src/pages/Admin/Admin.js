import React, { useEffect, useState } from 'react'
import {Route, Routes, Navigate } from 'react-router-dom';
import { RiAccountCircleFill } from 'react-icons/ri';
import './admin.scss'
import Separator from '../../components/Separator/Separator';
import Dashboard from '../../components/DashNav/Routes/Dashboard/Dashboard';
import DashNav from '../../components/DashNav/DashNav';
import logoMascot from '../../images/logo/mascot-green.png'
import { useTranslation } from 'react-i18next';
function Admin() {

  const handleClick = async () =>{
    window.localStorage.removeItem("accessToken")
    window.localStorage.removeItem("authenticated")
    window.location = '/admin'
  }

  useEffect(() => {
    const url = window.location.href
    const getAdmin = async () => {
      try{
        const token = window.localStorage.getItem("accessToken")
        const response = await fetch(url, {
          method: 'POST',
          headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token}
        })
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data)
        })
      }
      catch (error){
        console.log(error)
      }
    }
    
    getAdmin()
  }, [])

  const [admin, setAdmin] = useState([])
 
  const {t} = useTranslation();
  return (
    <div className='admin-container'>
    {/* <Separator status ='2'></Separator> */}
    <Separator></Separator>

      <div className='admin-profile-container'>
        <div className='admin-avatar'>
            {/* <RiAccountCircleFill className='icon'></RiAccountCircleFill> */}
            <img src = {logoMascot}></img>
        </div>
        {/* <Separator></Separator> */}
        <h1>{t("admin-welcomeback")}<span>{admin.firstname} {admin.lastname}</span>!</h1>
        <DashNav id = {admin.adid} fname = {admin.firstname} mname = {admin.middlename} 
        lname = {admin.lastname} age = {admin.age} email = {admin.email}
        ></DashNav>
        
      </div>
      <button onClick={handleClick}>{t("signout")}</button>
      <Separator></Separator>
    </div>
  )
}

export default Admin