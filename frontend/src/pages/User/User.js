import './user.scss'

import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import {TiUser} from 'react-icons/ti'
import Separator from '../../components/Separator/Separator'
import UserNav from './UserNav/UserNav'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios'
import { useTranslation } from 'react-i18next';
function User() {
  const {t} = useTranslation();
  const { setWishDetails, setLibrary, setLibraryNumb} = useContext(CartContext)
  const [status, setStatus] = useState("")
  const [user, setUser] = useState([])
  const [wishNumb, setWishNumb] = useState(0)
  useEffect(() => {
    const url = window.location.href
    const getUser = async () => {
      try{
        const token = localStorage.getItem('accessUserToken')
        const response = await fetch(url, {
          method: 'POST',
          headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token}
        })
        .then((res) => res.json())
        .then((data) => {
          // setStatus(data)
          // window.localStorage.setItem("status", data)
          setUser(data[0])
          setWishNumb(data[1].count)
          setWishDetails(data[2])
          setLibrary(data[3])
          setLibraryNumb(data[3].length)
        })
      }
      catch (error){
        console.log(error)
      }
    }
    getUser()
    
  }, [])
    

  // useEffect(() => {
  //   const status = localStorage.getItem("status")
  //   if(status === 'invalid'){
  //     // console.log(status)
  //     const refresh = async () =>{
  //       try {
  //         const token = localStorage.getItem('refreshUserToken')
  //         const response = await fetch('/refresh', {
  //           method: 'POST',
  //           headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token},
  //         })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           window.localStorage.setItem("accessUserToken", data.accessUserToken)                    
  //           window.localStorage.setItem("refreshUserToken", data.refreshUserToken)  
  //         })
  //       } catch (error) {
  //           console.log(error)
  //       }
  //     }

  //     refresh()
  //   }
  // }, [status, user.email, user.userid])


  // useEffect(() => {
  //   const getLibrary = async () => {
  //     try{
  //       const token = localStorage.getItem('accessUserToken')
  //       const response = await fetch('/get/purchased', {
  //         method: 'POST',
  //         headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token}
  //       })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data)
  //       })
  //     }
  //     catch (error){
  //       console.log(error)
  //     }
  //   }
    
  //   getLibrary()
  // }, [])



  const dayCovertion = (date) => {
    const getDate = new Date(date)
    return getDate.toLocaleString([] , {
        year : "numeric",
        day : "2-digit",
        month : "short"
    })
  }

  return (
    <div className='user-container'>
      <div className='user-inner-container'>
      <Separator></Separator>
      <Separator status= '1'></Separator>
        <div className='user-top'>
            <Link to = '/user' className='avatar-container'>
              <TiUser className='icon'></TiUser>
            </Link>
            <div className='title-container'>
              <label className='title'>{user.firstname}{user.lastname}#{user.userid}</label>
              <label className='date'>{t("member-since")}: {dayCovertion(user.registered_at)}</label>
            </div>
        </div>  

        <Separator status='1'></Separator>
  
        <UserNav id = {user.userid} fname = {user.firstname} mname = {user.middlename} 
        lname = {user.lastname} age = {user.age} email = {user.email} wish = {wishNumb}
        ></UserNav> 
      </div>
      
    </div>
  )
}

export default User
