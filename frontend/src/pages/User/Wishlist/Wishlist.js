import React from 'react'
import './wishlist.scss'
import ProductList from '../../../components/ProductList/ProductList'
function Wishlist(props) {
  return (
    <div className='wishlist-container'>
        <ProductList type = 'wishlist' id = {props.id}></ProductList>
    </div>
  )
}

export default Wishlist