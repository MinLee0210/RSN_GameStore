import './adminSettings.scss'
import React, { useState } from 'react'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import { useTranslation } from 'react-i18next';

import View from './ViewProfile/View'
function AdminSettings(props) {
    const {t} = useTranslation();
    const [isActive, setActive] = useState('info')

  return (
    <div className='settings-container'>
        <div className='left-nav-container'>
            {isActive === 'info'
            ? <div className='section info' onClick={() => {setActive("info")}}>
                <CgProfile className='icon'></CgProfile>
                <div className='content'>
                   <h5 className='header'>{t("view-profile")}</h5> 
                   <span className='text'>{t("view-profile-placeholder")}</span> 
                </div>   
            </div>
            : <div className='section' onClick={() => {setActive("info")}}>
                <CgProfile className='icon'></CgProfile>
                <div className='content'>
                   <h5 className='header'>{t("view-profile")}</h5> 
                   <span className='text'>{t("view-profile-placeholder")}</span> 
                </div>   
            </div>
            }
        
            {isActive === 'profile'
            ? <div className='section profile' onClick={() => {setActive("profile")}}>
                <CgProfile className='icon'></CgProfile>
                <div className='content'>
                   <h5 className='header'>{t("customize-profile")}</h5> 
                   <span className='text'>{t("customize-profile-placeholder")}</span> 
                </div>   
            </div>
            : <div className='section' onClick={() => {setActive("profile")}}>
                <CgProfile className='icon'></CgProfile>
                <div className='content'>
                   <h5 className='header'>{t("customize-profile")}</h5> 
                   <span className='text'>{t("customize-profile-placeholder")}</span> 
                </div>   
            </div>
            }

            {isActive === 'privacy'
            ? <div className='section privacy' onClick={() => {setActive("privacy")}}>
                <RiLockPasswordLine className='icon'></RiLockPasswordLine>
                    <div className='content'>
                    <h5 className='header'>{t("change-mail-pass")}</h5> 
                    <span className='text'>{t("change-mail-pass-placeholder")}</span> 
                </div>
            </div>
            : <div className='section' onClick={() => {setActive("privacy")}}>
                <RiLockPasswordLine className='icon'></RiLockPasswordLine>
                    <div className='content'>
                    <h5 className='header'>{t("change-mail-pass")}</h5> 
                    <span className='text'>{t("change-mail-pass-placeholder")}</span> 
                </div>
            </div>
            }
            
            
        </div>

        <div className='right-container'>
            <div className='vertical-space'></div>
            {isActive === 'info' && <View id = {props.id} fname = {props.fname} mname = {props.mname} 
            lname = {props.lname} age = {props.age} email = {props.email}></View>} 
        </div>
    </div>
  )
}

export default AdminSettings