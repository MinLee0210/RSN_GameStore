import React from 'react'
import './headings.scss'

function Headings(prop) {
  return (
    <div className='heading-container'>
        <h1>{prop.text}</h1>
    </div>
  )
}

export default Headings