import React , {useState} from 'react'
import './card.scss'
import Wallet from '../../../../../pages/User/UserDash/Wallet/Wallet'
import Achievement from '../../../../Achievement/Achievement'
function Card(props) {
  const [context, setContext] = useState(props.context)
  return (
    <div className='card-container'>
      {context === 'wallet' && <Wallet></Wallet>}
      {context === 'achievement' && <Achievement></Achievement>}
    </div>
  )
}

export default Card