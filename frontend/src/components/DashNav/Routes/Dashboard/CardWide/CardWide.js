import React , {useState} from 'react'
import Overview from '../../../../../pages/User/UserDash/Overview/Overview'
import './cardwide.scss'

function CardWide(props) {
  const [role, setRole] = useState(props.role)
  return (
    <div className='card-wide-container'>
        {role === 'user' && <Overview wish = {props.wish}></Overview>}
    </div>
  )
}

export default CardWide