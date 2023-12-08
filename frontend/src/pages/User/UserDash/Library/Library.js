import React from 'react'
import ProductList from '../../../../components/ProductList/ProductList'
function Library(props) {
  return (
    <div className='library-container'>
        <ProductList type = 'library' id = {props.id}></ProductList>
    </div>
  )
}

export default Library