import React, {useState} from 'react'
import './gallery.scss'
import {MdCancel} from 'react-icons/md'
function Gallery(props) {
  const [active, setActive] = useState(props.img1)
  const [clicked, setIsClicked] = useState('img1')
  const handleClick = (e) => {
    setActive(e.target.src)
    setIsClicked(e.target.alt)
  }
  return (
    <div className={props.action ? 'gallery-container' : 'gallery-container disabled'}>
        <div className='cancel'>
            <MdCancel className='icon' onClick={props.event}></MdCancel>
        </div>
        <div className='slideshow-container'>
          <div className='preview-container'>
            <img src={active} className={clicked}></img>
          </div>
          <div className='sub-preview'>
            {/* <div className='preview'>
              <img src={props.cover} alt='cover' onClick={handleClick}></img>
            </div> */}
            <div className={clicked === 'img1' ? 'preview active' : 'preview'}>
              <img src={props.img1} alt='img1' onClick={handleClick}></img>
            </div>
            <div className={clicked === 'img2' ? 'preview active' : 'preview'}>
              <img src={props.img2} alt='img2' onClick={handleClick}></img>
            </div>
            <div className={clicked === 'img3' ? 'preview active' : 'preview'}>
              <img src={props.img3} alt='img3' onClick={handleClick}></img>
            </div>
            <div className={clicked === 'img4' ? 'preview active' : 'preview'}>
              <img src={props.img4} alt='img4' onClick={handleClick}></img>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Gallery