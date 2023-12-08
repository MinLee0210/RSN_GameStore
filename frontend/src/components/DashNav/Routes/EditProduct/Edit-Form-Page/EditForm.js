import './editform.scss'

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Add from '../../AddProduct/Add'
import Separator from '../../../../Separator/Separator'
import Headings from '../../../../ProductList/ProductPages/Headings/Headings'
import {MdOutlineArrowBack} from 'react-icons/md'
import { useTranslation } from 'react-i18next';
function EditForm() {
  const {t} = useTranslation();
  const id = window.localStorage.getItem("editID")
  const [editData, setEditData] = useState([])


  useEffect(() => {
    const url = '/api/' + id
    const getProduct = async () =>{
      try {
        const response = await fetch(url)
        .then((res) => res.json())
        .then((data) => setEditData(data[0]))
      } catch (error) {
        console.log("Error")
      }
    }
    getProduct()
  },[])


  const navigate = useNavigate()

  const handleBack = () => { navigate(-1) }


  return (
    <div className='edit-form-container'>
        <Separator></Separator>
        <Separator></Separator>
        <div className='header-container'>
          {/* <label className='back' onClick={handleBack}>Back to admin</label> */}
          <MdOutlineArrowBack className='back' onClick={handleBack}></MdOutlineArrowBack>
          <Headings text = {t("product-info")}></Headings>
        </div>
        
        <Separator status = '3'></Separator>
        <div className='product-container'>
          <div className='product-left-container'>
              <div className='product-image'>
                <img src={editData.filecover1}></img>
              </div>
          </div>
          <div className='product-right-container'>
              <div className='product-info-level-one'>
                <label>{t("product-id")}: <span>#{editData.productid}</span></label>
                <h1>{editData.title}</h1>
              </div>
              <div className='space'></div>

              <div className='product-info-level-two'>
                <div className='cell'>
                  <label>{t("genre")}:</label>
                  <span>{editData.genre}</span>
                </div>
                <div className='cell'>
                  <label>{t("developer")}:</label>
                  <span>{editData.developer}</span>
                </div>
                <div className='cell'>
                  <label>{t("publisher")}:</label>
                  <span>{editData.publisher}</span>
                </div>
                <div className='cell'>
                  <label>{t("release-date")}:</label>
                  <span>{editData.date}</span>
                </div>
                <div className='cell'>
                  <label>{t("price")}:</label>
                  <span>${editData.price}</span>
                </div>
                <div className='cell'>
                  <label>{t("created-at")}:</label>
                  <span>{editData.created_at}</span>
                </div>
              </div>

              <div className='product-container-level-three'>
                  <button className='button view'>{t("view-details")}</button>
                  <button className='button delete'>{t("delete-product")}</button>
              </div>
          </div>
        </div>
        <Separator></Separator>
        <Headings text = {t("edit-product")}></Headings>
        <Separator status = '3'></Separator>
        <Add id = {editData.productid} title = {editData.title} genre = {editData.genre} price = {editData.price} developer = {editData.developer} 
        publisher = {editData.publisher} date = {editData.date} method = 'update'></Add>
        <Separator></Separator>
    </div>
  )
}

export default EditForm