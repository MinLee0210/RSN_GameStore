import React, { useEffect } from 'react'
import './loading.scss'
import logoVertical from '../../images/logo/vertical-green.png'
import { useState } from 'react'
import { motion } from 'framer-motion'

function Loading(prop) {
  const [width, setWidth] = useState(0)
  const [isRunning, setIsRunning] = useState(prop.status)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() =>{
    if(width < 100 && isRunning === 'true'){
      setTimeout(() => setWidth(prev => prev+=3.5 ), 40)      
    }
    else{
      setIsDisabled(true)
    }
  }, [width, isRunning])

  return (
    <div className= {isDisabled ? 'loading-container disabled' : 'loading-container'}>
        <motion.div className='loading-logo' 
          initial={{opacity: 0, scale: 0.5}}
          animate={{opacity: 1, scale: 1}}
          transition={{ duration: 0.4}}
        >
            <img src={logoVertical} alt=''></img>
        </motion.div>
        <div className='loading-bar'>
          <motion.div className='loading-bar-inner' 
            style={{
                width: `${width}%`,
                height: '100%',
                transition: 'width 0.5s',
                backgroundColor: '#01D47A',
                zIndex: '20000'
            }}
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{ duration: 0.4}}

          >

          </motion.div>
        </div>
    </div>
  )
}

export default Loading