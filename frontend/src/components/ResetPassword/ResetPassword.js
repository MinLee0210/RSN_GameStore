import React from 'react'
import { useState, useEffect } from 'react'
import './reset_password.scss'
import logoVertical from '../../images/logo/vertical-green.png'
import { Link ,useNavigate, useParams } from 'react-router-dom'
import {FaFacebookF} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import {MdCancel} from 'react-icons/md'

import { useTranslation } from 'react-i18next';

const url_root = 'http://localhost:5000'

function Login(prop) {
    const {t} = useTranslation();
    const [user, setUser] = useState([{
        email: ""
  }])

    
    const [isAuthenticated, setAuthenticated] = useState(false)

    const handleChange = (e) =>{
        const {name, value} = e.target
        setUser({...user, [name] : value})
    }

    const params = useParams()

    const onSubmitForm = async (e) =>{
        e.preventDefault()
        try {
            const url = 'http://localhost:5000/user/reset-password/:id';
            // const url = `/user/reset-password`
            const body = {
                'password': user.email, 
                'id': params.id
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                window.location = '/'
            })
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const navigate = useNavigate()

  return (
    <div className= 'login-container'>
        <div className='top-container'>
            <Link to = '/'>
                <MdCancel className='cancel' onClick={() => navigate(-1)}></MdCancel>
            </Link>
            
        </div>
        <div className='login-container-inner'>
            <img src={logoVertical} alt=''></img>


            <form className='form-container' onSubmit={onSubmitForm}>
                <input className='opacity' name='email' onChange={handleChange} placeholder='Input change password' required ></input>
                {/* <Link to='/user/signin'className='submit-button'>
                    <button className='submit-button button' type='submit'> Submit </button>
                </Link> */}
                <button className='submit-button button' type='submit'> 
                    <a href='/user/signin' className='submit-button link'>{t("submit")}</a> 
                </button>
            </form>
            
        </div>

    </div>
  )
}

export default Login