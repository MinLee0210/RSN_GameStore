import './product.scss'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Product(props){
    const titleUrl = props.title
    const newTitleUrl = titleUrl.replace(/\s/g, '-').toLowerCase()
    const itemUrl = `${props.id}-buy-${newTitleUrl}`
    return(
        <div className='item-container'>
            <Link to = {{pathname: `/${itemUrl}/`}} className='product-link'>
                <img src={props.thumb} alt=''></img>
            </Link>
            <div className='item-description'>
                <h1 className='item-name'>{props.title}</h1>
                {
                    props.price !== undefined ?  <h1 className='item-price'>{`$` + props.price}</h1>  : null  
                }
                
            </div>
        </div>
)

}

export default Product;