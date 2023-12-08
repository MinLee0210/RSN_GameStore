import './productpage.scss'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import { useTranslation } from 'react-i18next';

import noIMG from '../../../images/img-placeholder.png'

//Icons
import {RiSteamFill} from 'react-icons/ri'
import {BsCheckCircle} from 'react-icons/bs'
import { BsFillCartFill } from 'react-icons/bs';
import{AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import {BiBarcode} from 'react-icons/bi'

//Components
import Separator from '../../Separator/Separator'
import GreenButton from '../../Button/GreenButton/GreenButton'
import Parallax from '../Parallax/Parallax'
import Headings from './Headings/Headings'
import Login from '../../Login/Login'
import ProductList from '../ProductList'
import Gallery from './Gallery/Gallery'
import { CartContext } from '../../../Context/CartContext'
import Cart from '../../../pages/Cart/Cart'

function ProductPage() {
    const {t} = useTranslation();
    const params = useParams()
    const filteredID = params.id.substring(0, params.id.indexOf('-'))
    const [productDetails, setProductDetails] = useState([])
    const [wishlist, setWishList] = useState(false)
    const [number, setNumber] = useState(0)
    const ref = useRef()
    // const {cart, setCart} = useContext(CartContext)
    const {quantity, setQuantity, total, setTotal} = useContext(CartContext)

    useEffect(() => {
        const url = '/api/' + filteredID
        // console.log(url)
        const getDetails = async () => {
            try {
                const response = await fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setProductDetails(data[0])
                    setNumber(data[1].count)
                })
            } catch (error) {
                console.log("Fail")
            }
        }

        getDetails()
    }, [])


    useEffect(() => {
        const token = window.localStorage.getItem("accessUserToken")
        if(token !== undefined){
            const getWishStatus = async () => {
                try{
                    const body = {
                        productid : filteredID
                    }
                    const res = await fetch('/get/wishlist',{
                        method: 'POST',
                        headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token},
                        body: JSON.stringify(body)
                    })
                    .then((res) => res.json())
                    // .then((data) => setWishList(data.status))
                    .then((data) => setWishList(data.status))
                }
                catch(err){
                    setWishList(wishlist)
                }
            }
            getWishStatus()
            
        }
        setWishList(wishlist)
        ref.current = !wishlist
    },[wishlist])
    
    const navigate = useNavigate()
    const handleClick = async () => {
        const authUser = window.localStorage.getItem("userAuthenticated")
        if(!authUser){
            navigate('/user/signin')
        }
        else{
                const token = window.localStorage.getItem("accessUserToken")
                setWishList(!wishlist)
                const body = {
                    productid : productDetails.productid
                }

                try {
                    if(ref.current === false){   
                        const response = await fetch('/unwishlist', {
                            method: 'POST',
                            headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token},
                            body: JSON.stringify(body)
                        }).then((res) => res.json())

                    }
                    else if(ref.current === true){
                        const response = await fetch('/wishlist', {
                            method: 'POST',
                            headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token},
                            body: JSON.stringify(body)
                        }).then((res) => res.json())
                    }
                } catch (error) {
                    
                }
        }
        
    }

    const [action, setAction] = useState(false)
    const handleToggle = () => {
        setAction(!action)
    }

    const handleBuy = async () => {
        const token = window.localStorage.getItem("accessUserToken")
        if(!token){
            navigate('/user')
        }
        else{
            setQuantity(quantity + 1)
            setTotal((total + parseFloat(parseFloat(productDetails.price).toFixed(2))))
            const body = {
                productid : productDetails.productid,
                title: productDetails.title,
                price: productDetails.price,
                thumb: productDetails.filecover1,
                total: total + parseFloat(parseFloat(productDetails.price).toFixed(2)),
                quantity: quantity + 1
            }
            const response = await fetch('/cart', {
                method: 'POST',
                headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token},
                body: JSON.stringify(body)
            }).then((res) => res.json())
            .then(() => navigate('/cart'))
            
        }
        
    }

    

    const handleAdd = async () => {
        // let cartMini = []
        // if(window.localStorage.getItem('cart')){
        //     cartMini = JSON.parse(localStorage.getItem('cart'))
        // }
        // cartMini.push({'productID' : productDetails.productid , 'price' : productDetails.price})
        // localStorage.setItem('cart', JSON.stringify(cartMini))
        // localStorage.setItem('cartNumb', JSON.parse(window.localStorage.getItem('cart'))?.length)
        // // console.log(cart)
        // setCart({'ID' : productDetails.productid})
        
            // setCart(cartMini.push({'productID' : productDetails.productid}))
        // setCart({...cart, productList : [...cart.productList, {'ID' : productDetails.productid, 'Title': productDetails.title, 'Price' : productDetails.price, 'Thumb' : productDetails.filecover1}}}])
        
        setQuantity(quantity + 1)
        setTotal((total + parseFloat(parseFloat(productDetails.price).toFixed(2))))
        const token = window.localStorage.getItem("accessUserToken")
        const body = {
            productid : productDetails.productid,
            title: productDetails.title,
            price: productDetails.price,
            thumb: productDetails.filecover1,
            total: total + parseFloat(parseFloat(productDetails.price).toFixed(2)),
            quantity: quantity + 1
        }

        const response = await fetch('/cart', {
            method: 'POST',
            headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token},
            body: JSON.stringify(body)
        }).then((res) => res.json())
    }

    const dayCovertion = (date) => {
        const getDate = new Date(date)
        return getDate.toLocaleString('en-GB' , {
            year : "numeric",
            day : "2-digit",
            month : "long"
        })
    }

    return (
        <div className='product-outer-container'>
            <Parallax banner = {productDetails.filebanner}></Parallax>
            {
                action && 
                <Gallery action = {action} event = {handleToggle}
                    cover = {productDetails.filecover2}
                    banner = {productDetails.filebanner}
                    img1 = {productDetails.fileimg1}
                    img2 = {productDetails.fileimg2}
                    img3 = {productDetails.fileimg3}
                    img4 = {productDetails.fileimg4}
                ></Gallery>
            }
            
            <div className='product-main-container'>
                <div className='top-data-container'>
                    <div className='cover-container'>
                        {
                            productDetails.filecover1 === undefined ? <img src={noIMG}></img> :
                            <img src = {productDetails.filecover1} alt={productDetails.title}></img> 
                        }
                        
                    </div>
                    <div className='main-data-container'>
                        {
                            wishlist ? <AiFillHeart className='wishlist active' onClick={() => handleClick()}></AiFillHeart>
                            : <AiOutlineHeart className='wishlist' onClick={() => handleClick()}></AiOutlineHeart>
                        }
                        {
                            productDetails.title === undefined ? <h1 className='title'>...</h1> :
                            <h1 className='title'>{productDetails.title}</h1>
                        }

                        <div className='sub-info'>
                            <div className='steam-container'>
                                <RiSteamFill className='icon'></RiSteamFill>
                                <label>Steam</label>
                                <div className='vertical'></div>
                                <BsCheckCircle className='check-icon'></BsCheckCircle>
                                <label>{t("in-stock")}</label>
                                <div className='vertical'></div>
                                <BsCheckCircle className='check-icon'></BsCheckCircle>
                                <label>{t("digital-download")}</label>    
                            </div>
                        </div>
                        <label className='wishlist-tracker'><AiFillHeart className='icon'></AiFillHeart>{number} {t("wishlisted-users")}</label>

                        
                        {
                            productDetails.price === undefined ? <label className='price'>...</label> :
                            <label className='price'>{`$${productDetails.price}`}</label>
                        }
                        <div className='payment-container'>
                            <div className='cart-button' onClick={handleAdd}><BsFillCartFill className='cart-icon'></BsFillCartFill></div>
                            <div className='buy-button' onClick={handleBuy}>{t("buy-now")}</div>
                        </div>
                    </div>
                </div>
                <Separator></Separator>
                <Headings text = {t("about-game")}></Headings>
                <Separator status= '3'></Separator>
                <div className='about-container'>
                    <div className='about-left-container'>
                        {parse(`${productDetails.descriptions}`)}
                        <div className='read-more'>{t("read-more")}</div>
                    </div>

                    <div className='about-right-container'>
                        <div className='row one'>
                            <div className='cell-left'>{t("install")}:</div>
                            <div className='cell-right'>{t("howto-activate")}</div>
                        </div>
                        <div className='row two'>
                            <div className='cell-left'>{t("developer")}:</div>
                            <div className='cell-right'>{productDetails.developer}</div>
                        </div>
                        <div className='row three'>
                            <div className='cell-left'>{t("publisher")}:</div>
                            <div className='cell-right'>{productDetails.publisher}</div>
                        </div>
                        <div className='row four'>
                            <div className='cell-left'>{t("release-date")}:</div>
                            <div className='cell-right'>{dayCovertion(productDetails.date)}</div>
                        </div>
                        <div className='row five'>
                            <div className='cell-left'>{t("genre")}:</div>
                            <div className='cell-right'>{productDetails.genre}</div>
                        </div>
                    </div>
                    
                </div>

                <Separator></Separator>
                <Headings text = {t("visuals")}></Headings>
                <Separator status= '3'></Separator>

                <div className='visual-container' onClick={handleToggle}>
                    <div className='video-container'>
                        <img src={productDetails.filebanner} alt={productDetails.title}></img>
                    </div>
                    <div className='showcase-container'>
                        <div className='showcase-left'>
                            <img src={productDetails.filecover2} alt={productDetails.title}></img>
                        </div>
                        <div className='showcase-right'>
                            <div className='showcase-child'>
                                <img src={productDetails.fileimg1} alt={productDetails.title}></img>
                            </div>
                            <div className='showcase-child'>
                                <img src={productDetails.fileimg2} alt={productDetails.title}></img>
                            </div>
                            <div className='showcase-child'>
                                <img src={productDetails.fileimg3} alt={productDetails.title}></img>
                            </div>
                            <div className='showcase-child'>
                                <img src={productDetails.fileimg4} alt={productDetails.title}></img>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator></Separator>
                <Headings text = {t("product-desc")}></Headings>
                <Separator status= '3'></Separator>
                <div className='descriptions-container'>
                    {parse(`${productDetails.descriptions}`)}
                </div>
                <Separator></Separator>
                <Headings text = {t("config")}></Headings>
                <Separator status= '3'></Separator>
                <div className='config-container'>
                    <div className='config-left'>
                        <label>{t("config-minimum")}<span>*</span></label>
                        <div className='specs'>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-1")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>Windows 7 SP1 64 Bit</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-2")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>Intel Core i3-530 {t("or")} AMD FX-6350</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-3")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>4 GB RAM</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-4")}:</label>
                                </div>
                                <div className='cell'>
                                    <p className='sub-text'>Nvidia GeForce GTX 460 / AMD ATI Radeon HD 5870 (1GB VRAM) / AMD Radeon RX Vega 11 / Intel HD Graphics 4600</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-5")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>Version 9.0</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-6")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>{t("config-spec-min-1")}</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-7")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>{t("config-spec-min-2")}</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-8")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>{t("config-spec-min-3")}</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-9")}:</label>
                                </div>
                                <div className='cell'>
                                    <p className='sub-text'>{t("config-spec-min-4")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='config-right'>
                        <label>{t("config-recommended")}<span>*</span></label>
                        <div className='specs'>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-1")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>Windows 10 Home 64 Bit</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-2")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>Intel Core i5-3570K / AMD Ryzen 5 2400G</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-3")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>8 GB RAM</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-4")}:</label>
                                </div>
                                <div className='cell'>
                                    <p className='sub-text'>Nvidia GeForce GTX 1050 Ti / AMD Radeon R7 370 (2GB VRAM)</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-5")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>Version 9.0</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-6")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>{t("config-spec-min-1")}</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-7")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>{t("config-spec-rec")}</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-8")}:</label>
                                </div>
                                <div className='cell'>
                                    <label className='sub-text'>{t("config-spec-min-3")}</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='cell'>
                                    <label className='main-text'>{t("config-9")}:</label>
                                </div>
                                <div className='cell'>
                                    <p className='sub-text'>{t("config-spec-min-4")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator></Separator>
                <Headings text = {t("other-products")}></Headings>
                <Separator status = '3'></Separator>
                <div className= 'other-container'>
                    <ProductList></ProductList>
                </div>
            </div>
            <div className='activation-container'>
                <div className='activation-inner-container'>
                    <div className='activation-left'>
                        <BiBarcode className='barcode'></BiBarcode>
                        <div className='text-container'>
                            <label className='heads-up'>{t("dont-know-how")}</label>
                            <label className='sub-heads-up'>{t("click-the-button")}</label>
                        </div>
                    </div>
                    <div className='activation-right'>
                        <div className='activate-button'>{t("learn-how")}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage