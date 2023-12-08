import './navbar.scss';

import logoWord from '../../images/logo/logo-word.png';
import { Link, useNavigate } from "react-router-dom";
import { useState, createContext, useEffect, useRef, useContext } from 'react';

import { MdAccountCircle } from 'react-icons/md';
import {IoIosClose} from 'react-icons/io'
import { BiSearch } from 'react-icons/bi';
import { BsFillCartFill } from 'react-icons/bs';
import {FaGlobe} from 'react-icons/fa'
import {RiAdminFill} from 'react-icons/ri'
import Login from '../Login/Login';
import Cart from '../../pages/Cart/Cart';

import { CartContext } from '../../Context/CartContext';
import { useTranslation } from 'react-i18next';

function Navbar(){
    const {t} = useTranslation();
    const {quantity, setIsClicked, setSearch} = useContext(CartContext)
    const [navbar, setNavbar] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isActive, setIsActive] = useState(false)
    const [state, setState] = useState(undefined)
    const [signedIn, setSignedIn] = useState(undefined)
    const [expanded, setExpanded] = useState(false)
    const navigate = useNavigate()
    // useEffect(() => {
    //     ref.current = localStorage.getItem('cartNumb')
    //     setQuantity(ref.current)
        
    // })
   

    const handleSignOut = () => {
        window.localStorage.removeItem("accessUserToken")
        window.localStorage.removeItem("userAuthenticated")

        setSignedIn(!signedIn)
        window.location = '/'
    }


    const changeBackground = () => {
        if(window.scrollY >= 100){
            setNavbar(true);
        }
        else{
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', changeBackground);

 
    useEffect(() => {
        const status = window.localStorage.getItem('authenticated')
        if(status === 'true'){
            setState(true)
        }
        else{
            setState(false)
        }
    }, [state])

    useEffect(() => {
        const userStatus = window.localStorage.getItem('userAuthenticated')
        if(userStatus === 'true'){
            setSignedIn(true)
        }
        else{
            setSignedIn(false)
        }
    }, [signedIn])

    const handleClick = () =>{
        navigate('/search')
    }



    return (
        <div className='pseudo-nav-container'>
            {/* <Login clicked = {isClicked} updateState={updateState}></Login> */}
            <Link to = "/" className='logo-container-one'>
                    <img src={logoWord} alt='' id='logo'></img>
            </Link>
            <div className={isSelected ? 'shadow active' : 'shadow'} onClick={() => setIsSelected(!isSelected)}></div>
            <div className={navbar ? "nav-container active" : 'nav-container'}>
                {/* <div className='language-container'>
                    <FaGlobe className='icon globe'></FaGlobe>

                    <div className='dropdown-menu'>
                        <h3>ENGLISH</h3>
                        <h3>TIẾNG VIỆT</h3>
                    </div>
                </div> */}
                <div className='left-nav'>
                    <FaGlobe className='icon globe'></FaGlobe>
                    {
                        
                        state ?
                        <Link to = '/admin' className='admin active'><RiAdminFill className='adminIcon'></RiAdminFill></Link>:
                        <Link to = '/admin' className='admin'><RiAdminFill></RiAdminFill></Link>
                        
                    }
                    
                </div>
                
                <div className='right-nav'>
                    {/* <Link to = '/'> */}
                    <div className='search-bar' >
                        <BiSearch className='icon' onClick={handleClick}></BiSearch>
                    </div>
                        
                    {/* </Link> */}

                    {
                        signedIn ? 
                        <Link to = '/cart'>
                            {quantity > 0 ? <div className='indicator'>
                                <label>{quantity}</label>
                            </div> : null}
                            <BsFillCartFill className={ isActive ? 'icon active' : 'icon' } onClick={() => setIsActive(!isActive)}></BsFillCartFill>
                        </Link>
                         :

                        <Link to = '/user/signin'>
                            <BsFillCartFill className='icon'></BsFillCartFill>
                        </Link>
                    }
                    

                    
                    {/* <Link to='/user/signin' onClick={() => setIsClicked(!isClicked)}> */}
                    
                    {
                        signedIn ? 
                        <div className='profile-container'>
                            <MdAccountCircle className={ isSelected ? 'icon active' : 'icon' } onClick={() => setIsSelected(!isSelected)}></MdAccountCircle>
                            <div className={isSelected ? 'profile-dropdown-container active' : 'profile-dropdown-container'}>
                                <Link to = '/user' className='dropdown-button' onClick={() => {
                                    setIsSelected(!isSelected)
                                    setIsClicked('dashboard')
                                    }}>{t("dashnav-dashboard")}</Link>
                                <Link to = '/user' className='dropdown-button' onClick={() => {
                                    setIsSelected(!isSelected)
                                    setIsClicked('orders')
                                    }}>{t("my-orders")}</Link>
                                <Link to = '/user' className='dropdown-button' onClick={() => {
                                    setIsSelected(!isSelected)
                                    setIsClicked('wishlist')
                                    }}>{t("userdash-wishlist")}</Link>
                                <Link to = '/activate-code' className='dropdown-button' onClick={() => setIsSelected(!isSelected)}>{t("userdash-activatecode")}</Link>
                                <Link to = '/user' className='dropdown-button' onClick={() => {
                                    setIsSelected(!isSelected)
                                    setIsClicked('settings')
                                    }}>{t("dashnav-settings")}</Link>
                                <div className='space'></div>
                                <button onClick={handleSignOut} className='signout-button'>{t("signout")}</button>
                            </div>
                            
                        </div>

                        :
                        <Link to= '/user/signin'>
                            <MdAccountCircle className='icon'></MdAccountCircle>
                        </Link> 
                    }
                    
                    
                </div>

                
            </div>
            
        </div>
    )
}

export default Navbar;