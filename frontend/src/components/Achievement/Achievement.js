import React from 'react'
import './achieve.scss'
import {TbMedal2} from 'react-icons/tb'
import { useTranslation } from 'react-i18next';
function Achievement() {
    const {t} = useTranslation();
    return (
    <div className='achievement-container'>
        <TbMedal2 className='icon'></TbMedal2>
        <label className='header'>{t("achievement")}</label>
        <div className='achieve-details-container'>
            <div className='spacer'></div>
            <div className='numbers-container'>
                <div className='sub-stat'>
                    <div className='number'>{t("achievement-text")}</div>
                    <div className='bar'>
                        <div className='bar-inner'></div>
                    </div>
                </div>                
            </div>
        </div>
    </div>
  )
}

export default Achievement