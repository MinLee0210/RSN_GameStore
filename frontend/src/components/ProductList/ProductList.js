import './productlist.scss';
import Product from './Product';
import { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
// import Items from '../../data/products.json'

function ProductList(props){
    const {library, setLibrary, search, genre} = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [wishlist, setWishList] = useState([])
    const [topWish, setTopWish] = useState([])
    const [topSellers, setTopSellers] = useState([])
    const [type, setType] = useState(props.type)
    useEffect(() => {

        const getData = async () => {
            try {
                const response = await fetch('/api')
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data)
                })
            } catch(err){
                console.log("Fail")
            }
        }

        const getTopWish = async () => {
            try {
                const response = await fetch('/api/top/wishlist')
                .then((res) => res.json())
                .then((data) => {
                    setTopWish(data)
                })
            } catch(err){
                console.log("Fail")
            }
        }
        const getTopSellers = async () => {
            try {
                const response = await fetch('/api/top/sellers')
                .then((res) => res.json())
                .then((data) => {
                    setTopSellers(data)
                })
            } catch(err){
                console.log("Fail")
            }
        }

        const getWishlist = async () => {
            const token = window.localStorage.getItem("accessUserToken")
            const body = {userID : props.id}
            try {
                const response = await fetch('/api/wishlist',{
                    method: "POST",
                    headers: {"Content-type": "application/json", "Authorization" : "Bearer " + token},
                    body: JSON.stringify(body)
                })
                .then((res) => res.json())
                .then((data) => {
                    setWishList(data)
                })
            } catch(err){
                console.log("Fail")
            }
        }

        if(type === undefined){
            getData()
        }
        else if(type === 'all'){
            getData()
        }
        else if(type === 'wishlist'){
            getWishlist()
        }
        else if(type === 'top-wish'){
            getTopWish()
        }
        else if(type === 'top-sellers'){
            getTopSellers()
        }

    },[type, props.id])


    // products.map((product) => {
    //     console.log(product)
    // })
    // console.log(products)

    return(
        <div className='product-container'> 
            {
                type === undefined && products && products.map((product, index) => {
                    if(index > 8){
                        return
                    }

                    return(
                        <Product key={ product.productid } id = { product.productid } title={product.title} price = {product.price} thumb = {product.filecover1}></Product>
                    )
                })
            }
            {
                type === 'all' && products && products.filter((product) => 
                    {
                        return product.title.toLowerCase().includes(search) && product.genre.toLowerCase().includes(genre)
                    }
                
                ).map((product, index) => {
                    return(
                        <Product key={ product.productid } id = { product.productid } title={product.title} price = {product.price} thumb = {product.filecover1}></Product>
                    )
                })
            }

            {
                type === 'wishlist' && wishlist && wishlist.map((product, index) => {
                    return(
                        <Product key={ product.productid } id = { product.productid } title={product.title} price = {product.price} thumb = {product.filecover1}></Product>
                    )
                })
            }

            {
                type === 'library' && library && library.map((product, index) => {
                    return(
                        <Product key={ product.productid } id = { product.productid } title={product.title} thumb = {product.filecover1}></Product>
                    )
                })
            }

            {
                type === 'top-wish' && topWish && topWish.map((product, index) => {
                    if(index > 8){
                        return
                    }

                    return(
                        <Product key={ product.productid } id = { product.productid } title={product.title} price = {product.price} thumb = {product.filecover1}></Product>
                    )
                })
            }
            {
                type === 'top-sellers' && topSellers && topSellers.map((product, index) => {
                    if(index > 8){
                        return
                    }

                    return(
                        <Product key={ product.productid } id = { product.productid } title={product.title} price = {product.price} thumb = {product.filecover1}></Product>
                    )
                })
            }
        </div>

    );
}

export default ProductList;