import './userDash.scss'
import React from 'react'
import Card from '../../../components/DashNav/Routes/Dashboard/Card/Card'
import CardWide from '../../../components/DashNav/Routes/Dashboard/CardWide/CardWide'
import CardExtraWide from '../../../components/DashNav/Routes/Dashboard/CardExtraWide/CardExtraWide'
function UserDash(props) {
  return (
    <div className='user-dash-container'>
        <div className='level one'>
            <CardWide role = 'user' wish = {props.wish}></CardWide>
            <Card context = 'wallet'></Card>
            <Card context = 'achievement'></Card>
        </div>
        <div className='level two'>
            <CardExtraWide context = 'userLatestWish'></CardExtraWide>
            <CardExtraWide context = 'userLatestWish'></CardExtraWide>
        </div>
    </div>
  )
}

export default UserDash