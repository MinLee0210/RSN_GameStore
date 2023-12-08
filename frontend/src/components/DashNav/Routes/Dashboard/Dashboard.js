import React from 'react'
import './dashboard.scss'
import Card from './Card/Card'
import CardWide from '../Dashboard/CardWide/CardWide'

function Dashboard() {
  return (
    <div className='dashboard-overview-container'>
      <div className='dashboard-level'>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
      <div className='dashboard-level'>
        <CardWide></CardWide>
        <CardWide></CardWide>
      </div>
    </div>
  )
}

export default Dashboard