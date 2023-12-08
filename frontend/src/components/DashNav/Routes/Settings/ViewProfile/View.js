import React from 'react'
import './view.scss'
import { useTranslation } from 'react-i18next';
function View(props) {
    const {t} = useTranslation();
    return (
    <div className='view-container'>
        <h1 className='headline'>{t("admin-profile")}</h1>
        <div className='table'>
            <div className='row'>
                <div className='cell left'>
                    <label>Admin ID</label>
                </div>
                <div className='cell'>
                    <label>#{props.id}</label>
                </div>
            </div>
            <div className='row'>
                <div className='cell left'>
                    <label>{t("first-name")} </label>
                </div>
                <div className='cell'>
                    <label>{props.fname}</label>
                </div>
            </div>
            <div className='row'>
                <div className='cell left'>
                    <label>{t("middle-name-adminview")} </label>
                </div>
                <div className='cell'>
                    <label>{props.mname}</label>
                </div>
            </div>
            <div className='row'>
                <div className='cell left'>
                    <label>{t("last-name")} </label>
                </div>
                <div className='cell'>
                    <label>{props.lname}</label>
                </div>
            </div>
            <div className='row'>
                <div className='cell left'>
                    <label>{t("age")} </label>
                </div>
                <div className='cell'>
                    <label>{props.age}</label>
                </div>
            </div>
            <div className='row'>
                <div className='cell left'>
                    <label>Email </label>
                </div>
                <div className='cell'>
                    <label>{props.email}</label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default View