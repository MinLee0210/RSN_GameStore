import React from 'react'
import './wallet.scss'
import {BsFillCreditCard2FrontFill} from 'react-icons/bs'
import {AiFillCreditCard} from 'react-icons/ai'
import { useTranslation } from 'react-i18next';
function Wallet() {
  const {t} = useTranslation();
  return (
    <div className='wallet-card'>
        <AiFillCreditCard className='icon'></AiFillCreditCard>
        <label className='header'>{t("wallet")}</label>
        <div className='stats-container'>
            <div className='separator'></div>
            <div className='numbers-container'>
                <div className='sub-stat'>
                    <div className='number'>$0</div>
                    <div className='title'>{t("wallet-amount")}</div>
                </div>                
            </div>
        </div>
    </div>
  )
}

export default Wallet