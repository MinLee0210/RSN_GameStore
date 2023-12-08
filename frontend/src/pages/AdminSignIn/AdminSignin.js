import React from 'react'
import './adminsignin.scss'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {FaFacebookF} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import { useTranslation } from 'react-i18next';

import poster from '../../images/controller-poster.png'
import logoHorizontal from '../../images/logo/horizontal-green.png'
// import Separator from '../../components/Separator/Separator'

function AdminSignin(prop) {
    const {t} = useTranslation();
    const [admin, setAdmin] = useState([{
        email: "",
        password: "",
  }])

  const [isAuth, setAuth] = useState(undefined)

    const handleChange = (e) =>{
        const {name, value} = e.target
        setAdmin({...admin, [name] : value})
        console.log(admin)
    }

    const onSubmitForm = async (e) =>{
        e.preventDefault()

        try {
            const body = {
                email: admin.email,
                password: admin.password
            }
            const url = window.location.href;

            const response = await fetch(url, {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body),
            })
            .then((res) => res.json())
            .then((data) => {
                window.localStorage.setItem("authenticated", data.isAuthenticated)
                const apiAuth = window.localStorage.getItem("authenticated")
                setAuth(apiAuth)
                if(data.isAuthenticated){
                    window.localStorage.setItem("accessToken", data.accessToken)                    
                    window.location = '/admin'
                    setAuth(data.isAuthenticated)
                }
            })
        
            
            
        } catch (error) {
            console.log(error.message)
        }
    }

    
    
  return (
    <div className='admin-login-container'>
        <img src={poster} alt='' className='poster'></img>
        <div className='login-container-outer'>
            <div className='login-container-inner'>
                <img src={logoHorizontal} alt=''></img>
                <span className='header'>{t("admin-signin")}</span>

                <div className='sso-container'>
                    <Link to='/' className='social-method face'>
                        <FaFacebookF className='icon'></FaFacebookF>
                    </Link>
                    <Link to='/' className='social-method google'>
                        <FcGoogle className='icon'></FcGoogle>
                    </Link>
                </div>

                <div className='login-separator'>
                    <div className='space'></div>
                    <span>{t("or")}</span>
                    <div className='space'></div>
                </div>
                
                {(isAuth == true || isAuth == undefined) ? <label className='alert inactive'></label> 
                : <label className='alert'>{t("admin-signin-invalid")}</label>}
                
                
                
                <form className='form-container' onSubmit={onSubmitForm}>
                    <input className='opacity' type='email' name='email' onChange={handleChange} placeholder='Email' required></input>
                    <input className='opacity' type='password' name='password' onChange={handleChange} placeholder='***********'></input>
                    <button className='submit-button' type='submit'> {t("submit")} </button>
                </form>

                <div className='forgot-container'>
                    <Link to = {{pathname: `/${prop.title}/signup`}}>{t("noaccount")}</Link>
                    <Link to=''>{t("forgetpassword")}</Link>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default AdminSignin