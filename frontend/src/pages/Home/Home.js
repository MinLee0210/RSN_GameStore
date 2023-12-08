import './home.scss'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import axios from 'axios'
import LogoWord from '../../images/logo/logo-word.png';
import noIMG from '../../images/img-placeholder.png'
import levi from '../../images/levi.png';
// import keria from '../../images/keria.png'

import Headline from '../../components/Headline/Headline';
import ProductList from '../../components/ProductList/ProductList';
import Separator from '../../components/Separator/Separator';
import TrustPanel from '../../components/TrustPanel/TrustPanel';
import GreenButton from '../../components/Button/GreenButton/GreenButton';
import Categories from '../../components/Categories/Categories';

import { BsStarFill } from 'react-icons/bs'
import { BsFillEnvelopeFill} from 'react-icons/bs'

import { useTranslation } from 'react-i18next';

function Home(){
    const [newProduct, setNewProduct] = useState([])
    const [url, setURL] = useState('')
    const {t} = useTranslation();
    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch('/newest', {
                    method: "GET"
                })
                .then((res) => res.json())
                .then((data) => {
                    setNewProduct(data)
                })
            } catch(err){
                console.log("Fail")
            }
        }
        
        getProduct();
    }, [])

    useEffect(() => {
        var getUrl = async () => {
        if(newProduct == undefined){
            return
        }
        else{
            var titleUrl = newProduct.title
            var newTitleUrl = titleUrl?.replace(/\s/g, '-').toLowerCase()
            var itemUrl = `${newProduct.productid}-buy-${newTitleUrl}`
            setURL(itemUrl)
        }
    }
    getUrl()
    })
    

    return(
        <div className="home-container">
            <div className="main-content">
                <div className='top-banner'>
                    <div className='parallax'>
                        <div className='top-banner-gradient'></div>
                            {(newProduct.filecover2 === undefined) ? (
                                <img src= {noIMG} alt = ''></img>
                            ) : (
                                <img src = {newProduct.filecover2} alt=''></img>
                            )}

                            {/* {console.log(products.filebanner)} */}
                        <div className='bottom-banner-gradient'></div>
                    </div>
                    
                    <div className='content'>
                        <Link to = {{pathname: `/${url}/`}}  className='banner-product'>
                        
                            <div className='banner-product-wrapper'>
                                <div className='newest-trending'>New</div>
                                {(newProduct.title === undefined) ? (
                                    <div className='title'>...</div>
                                ): (
                                    <div className='title'>{newProduct.title}</div>
                                )}
                                
                                
                                {(newProduct.price === undefined)? (
                                    <div className='price'>...</div>
                                ): (
                                    <div className='price'>{`$${newProduct.price}`}</div>
                                )}
                            </div>                          
                        </Link>  
                    </div>    
                </div>   
                
                <div className='trend-container'>
                    <Headline title={t("trending")}></Headline>
                    <ProductList></ProductList>
                </div>

                <Separator></Separator>
                <TrustPanel></TrustPanel>
                <Separator status = '0'></Separator>

                <div className='preorder-container'>
                    <Headline title={t("userchoice")}></Headline>
                    <ProductList type = 'top-wish'></ProductList>
                </div>
                <Separator status = '2'></Separator>

                <div className='review-container'>
                    <div className='pseudo-container'></div>
                    <div className='review-content-container'>
                        <div className='review-actor'>
                            <img src={levi} alt='levi' loading='lazy'></img>
                        </div>
                        <div className='review-content'>
                            <div className='rating'>
                                <BsStarFill></BsStarFill>
                                <BsStarFill></BsStarFill>
                                <BsStarFill></BsStarFill>
                                <BsStarFill></BsStarFill>
                                <BsStarFill></BsStarFill>
                            </div>
                            <p><span>RISEN GAMING</span> {t("levireview1")} <br></br><br></br>
                            {t("levireview2")}
                            </p>
                        </div>
                     </div>

                     {/* <div className='sub-review-container'>
                        <div className='sub-review-container-pseudo'>
                            <div className='sub-review-item'>
                                <div className='sub-review-actor'>
                                    <img src={keria} alt=''></img>
                                </div>
                                <div className='rating'>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                </div>
                            </div>
                            <div className='sub-review-item'>
                            <div className='sub-review-actor'>
                                <img src={keria} alt=''></img>
                                </div>
                                <div className='rating'>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                </div>
                            </div>
                            <div className='sub-review-item'>
                            <div className='sub-review-actor'>
                                <img src={keria} alt=''></img>
                                </div>
                                <div className='rating'>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                </div>
                            </div>
                            <div className='sub-review-item'>
                                <div className='sub-review-actor'>
                                    <img src={keria} alt=''></img>
                                </div>
                                <div className='rating'>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                    <BsStarFill></BsStarFill>
                                </div>
                            </div>
                        </div>
                     </div> */}
                </div>
                <Separator></Separator>

                <div className='bestsellers-container'>
                    <Headline title={t("bestsellers")}></Headline>
                    <ProductList type = 'top-sellers'></ProductList>
                </div>
                <Separator></Separator>

                <div className='banner-container'>
                    <div className='banner-container-filter'></div>
                    <div className='banner-content-container'>
                        <div className='logo'>
                            <img src = {LogoWord} alt='logoWord' loading='lazy'></img>
                        </div>
                        <h1>{t("bannercontainer1")}</h1>
                        <h2>{t("bannercontainer2")}</h2>
                        <GreenButton title={t("follow")}></GreenButton>
                        
                    </div>
                    
                </div>
                <Separator></Separator>

                <div className='categories-outer-container'>
                    <Headline title={t("categories")}></Headline>
                    <Categories></Categories>
                </div>
                <Separator status ='2'></Separator>

                <div className='news-container'>
                    <BsFillEnvelopeFill className='icon'></BsFillEnvelopeFill>
                    <h1>{t("newscontainer1")}</h1>
                    <h2>{t("newscontainer2")}</h2>
                    <GreenButton title={t("signup")}></GreenButton>
                </div>
            </div>
        </div>
    )
}

export default Home;