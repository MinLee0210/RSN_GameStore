import React from 'react'
import { useState, useEffect } from 'react'
import './login.scss'
import logoVertical from '../../images/logo/vertical-green.png'
import { Link ,useNavigate } from 'react-router-dom'
import {FaFacebookF} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import {MdCancel} from 'react-icons/md'
import {LoginSocialFacebook, LoginSocialGoogle} from 'reactjs-social-login'
import {FacebookLoginButton, GoogleLoginButton} from 'react-social-login-buttons'
//import facebook from '../../../../backend/config/facebook'

import { useTranslation } from 'react-i18next';

const google_id = '532561413058-8qpv07ph95olatbv8tdjlkk5vgpo686a.apps.googleusercontent.com'
const facebook_id = '1301099490620364'

function Login(prop) {
    const {t} = useTranslation();
    const [user, setUser] = useState([{
        email: "",
        password: "",
  }])

  const [isAuthenticated, setAuthenticated] = useState(false)

  const handleChange = (e) =>{
        const {name, value} = e.target
        setUser({...user, [name] : value})
    }

    
    const storeTokenData = (token, refreshTime, expirationTime, email) => {
        window.localStorage.setItem("accessUserToken", token);
        window.localStorage.setItem("refreshUserToken", refreshTime);
        // window.localStorage.setItem("expirationTime", expirationTime);
        // window.localStorage.setItem("email", email);
        window.localStorage.setItem("userAuthenticated", true);
        window.location = '/'
        setAuthenticated(true);
    };

    const onSubmitForm = async (e) =>{
        e.preventDefault()
        console.log('Click')
        try {
            const body = {
                email: user.email,
                password: user.password
            }
            const url = window.location.href;

            const response = await fetch(url, {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body),
            })
            .then((res) => res.json())
            .then((data) => {
                window.localStorage.setItem("userAuthenticated", data.isAuthenticated)
                const apiAuth = window.localStorage.getItem("userAuthenticated")
                setAuthenticated(apiAuth)
                if(data.isAuthenticated){
                    window.localStorage.setItem("accessUserToken", data.accessUserToken)                    
                    window.localStorage.setItem("refreshUserToken", data.refreshUserToken)                    
                    window.location = '/'
                    setAuthenticated(data.isAuthenticated)
                }
            })
        
            
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const navigate = useNavigate()

    const handleSSOFB = () => {
        const id = localStorage.getItem('editID')
        try {
            const body = {
                editID : id
            }

            const handleRequest = async () =>{
                const response  =  await fetch('/sso', {
                    method: 'POST',
                    headers: {"Content-type" : "application/json"},
                    body: JSON.stringify(body)
                })
                .then((res) => res.json())
                .then((data) => {
                    if(data.status === 'fetched'){
                        window.location = '/'
                    }
                })

            }
            handleRequest()
        } catch (error) {
            console.log("Failed to fetch")
        }

    }

    /**
     * check whether the user's information, such as user email and user id, is in the db or not, 
     * if there is not, create one. 
     */
    const checkExist = async (type, user) => {
        try {
            const body = {
                email: user
            }
            // const url = `http://localhost:5000/auth/${type}/checkExist`
            const url = `/auth/${type}/checkExist`
            const response = await fetch(url, {
                method: 'POST', 
                headers: {'Content-type': 'application/json'}, 
                body: JSON.stringify(body)
            })
            .then(res => console.log(res.json()))
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className= 'login-container'>
        <div className='top-container'>
            <Link to = '/'>
                <MdCancel className='cancel' onClick={() => navigate(-1)}></MdCancel>
            </Link>
            
        </div>
        <div className='login-container-inner'>
            <img src={logoVertical} alt = ''></img>
            <span className='header'>{t("signin")}</span>
            <div className='sso-container'>
                {/* <div className='social-method face' onClick={handleSSOFB}>
                    <FaFacebookF className='icon'></FaFacebookF>
                </div> */}

                <LoginSocialFacebook
                    appId={facebook_id}
                    onResolve={(res) => {
                        const result = res.data
                        // console.log(res.data)
                        checkExist('facebook', result.email)
                        storeTokenData(res.data.accessToken, res.data.data_access_expiration_time,
                                                                res.data.expiresIn, res.data.email)
                    }}
                    onReject={(err) => console.log(err)}
                    >
                    <FacebookLoginButton/>
                </LoginSocialFacebook>


                <LoginSocialGoogle
                    client_id={google_id}
                    onResolve={(res) => {
                        // console.log(typeof(res.data))
                        console.log(res.data)
                        // const result  = res.data.json()
                        // console.log(result.data)
                        checkExist('google', res.data)
                        storeTokenData(res.data.access_token, res.data.data_access_expiration_time,
                                                                res.data.expires_in, res.data.name)
                    }}
                    onReject={(err) => console.log(err)}
                >
                    <GoogleLoginButton/>
                </LoginSocialGoogle>
            </div>

            <div className='login-separator'>
                <div className='space'></div>
                <span>{t("or")}</span>
                <div className='space'></div>
            </div>

            {/* {(isAuthenticated == true || isAuthenticated == undefined) ? <label className='alert inactive'></label> 
                : <label className='alert'>Your email or password is invalid! Please try again!</label>}
                 */}
                

            <form className='form-container' onSubmit={onSubmitForm}>
                <input className='opacity' type='email' name='email' onChange={handleChange} placeholder='Email' required ></input>
                <input className='opacity' type='password' name='password' onChange={handleChange} placeholder='***********' ></input>
                <button className='submit-button' type='submit'> {t("submit")} </button>
            </form>

            {/* <div className='forgot-container'>
                <Link to={{pathname: `/${prop.title}/signup`}} onClick={prop.updateState}>No account yet?</Link>
                <Link to=''>Lost password?</Link>
            </div> */}
            <div className='forgot-container'>
                <Link to={{pathname: `/${prop.title}/signup`}} onClick={prop.updateState}>{t("noaccount")}</Link>
                <Link to='/user/forget-password'>{t("forgetpassword")}</Link>
            </div>


        </div>

    </div>
  )
}

export default Login