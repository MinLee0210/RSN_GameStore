import React from 'react'
import './parallax.scss'
import noIMG from '../../../images/img-placeholder.png'

function Parallax(prop) {
  return (
    <div className='parallax-container'>
        <div className='parallax-inner-container'>
            <div className='top-banner-gradient'></div>
            {
              prop.banner === undefined ? <img src={noIMG}></img> :
              <img src={prop.banner}></img>
            }
            
            <div className='bottom-banner-gradient'></div>
        </div>
       
    </div>
  )
}

export default Parallax
