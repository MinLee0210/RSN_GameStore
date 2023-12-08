import React, { useState } from 'react'
import './cardExtraWide.scss'
import WishQuick from './WishQuick/WishQuick'

function CardExtraWide(props) {
    const [context, setContext] = useState(props.context)
  return (
    <div className='card-extra-wide-container'>
      {context === 'userLatestWish' && <WishQuick></WishQuick>}
    </div>
  )
}

export default CardExtraWide