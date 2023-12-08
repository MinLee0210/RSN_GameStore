import React from 'react'
import { useState, useRef } from 'react'
import './add.scss'
import Separator from '../../../Separator/Separator'
import {MdGamepad} from 'react-icons/md'
import {MdUploadFile} from 'react-icons/md'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useTranslation } from 'react-i18next';

function Add(props) {
  const {t} = useTranslation();
  const [data, setData] = useState({
    title: "",
    genre: "",
    price: 0,
    developer: "",
    publisher: "",
    date: '',
    descriptions: "",
    fileCover1: [],
    fileCover2: [],
    fileBanner: [],
    fileImg1: [],
    fileImg2: [],
    fileImg3: [],
    fileImg4: []
  })




  const handleChange = (e) =>{
    const {name, value} = e.target
    
    setData((prev) => {
      return {...prev, [name]: value}
    })
    // console.log(data)
  }

   const [descriptions, setDescriptions] = useState('')

  const handleEditor = (e, editor) => {
      setDescriptions(editor.getData())
      setData({...data, descriptions: editor.getData()})
  }



  const handleUpload = (e) => {
      const id = e.target.id
      // console.log(id)
      // console.log(id, value.replace('C:\\fakepath\\', ' '))
      // const trim = value.replace('C:\\fakepath\\', ' ')
      // const fileName = trim.replace(/\s+/g, '')
      // const file = e.target.files[0]
      setData({...data, [id] : e.target.files[0]})
      // console.log(data)
  }

  // console.log(current.current.value.replace('C:\\fakepath\\', ' '))

  const onSubmitForm = async (e) =>{
    e.preventDefault()

    const formData = new FormData()

    formData.append('title' , data.title)
    formData.append('genre' , data.genre)
    formData.append('price', data.price)
    formData.append('developer', data.developer)
    formData.append('publisher', data.publisher)
    formData.append('date', data.date)
    formData.append('descriptions', data.descriptions)
    formData.append('fileCover1', data.fileCover1)
    formData.append('fileCover2', data.fileCover2)
    formData.append('fileBanner', data.fileBanner)
    formData.append('fileImg1', data.fileImg1)
    formData.append('fileImg2', data.fileImg2)
    formData.append('fileImg3', data.fileImg3)
    formData.append('fileImg4', data.fileImg4)
    

    if(props.method === undefined){
      console.log("Add")
        try {
          // const token = window.localStorage.getItem('accessToken')
          const response = await fetch("/admin/addProduct", {
            method: "POST",
            // headers: {"Authorization" : "Bearer " + token},
            body: formData
          })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            window.location = '/'
          })
      } catch (error) {
        console.log(error.message)
      }
    }
    else{
      console.log("Edit")
        try {
        // const token = window.localStorage.getItem('accessToken')
        const url = `/admin/${props.id}`
        // console.log(url)
        const response = await fetch(url, {
          method: "PUT",
          // headers: {"Authorization" : "Bearer " + token},
          body: formData
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          window.location = '/'
        })
        
      } catch (error) {
        console.log(error.message)
      }
    }


    
  }


  
  return (
    <div className='add-container'>
      <form className='form-container' onSubmit={onSubmitForm}>
        <div className='form-container-level'>
          <div className='field-container'>
            <label>{t("product-title")}</label>
            <input type='text' name='title' value={data.title} placeholder = {props.title} onChange = {handleChange}></input>
          </div>
          <div className='field-container'>
            <label>{t("product-genre")}</label>
            <select id='genre' name='genre' value={data.genre} onChange = {handleChange}>
              <option className='default' value={props.genre} disabled></option>
              <option value="Action">{t("action")}</option>
              <option value="Adventure">{t("adventure")}</option>
              <option value="Single-player">{t("singleplayer")}</option>
              <option value="Survival">{t("survival")}</option>
              <option value="First Person Shooter">{t("fps")}</option>
              <option value="Role-play">{t("rpg")}</option>
              <option value="Fighting">{t("fighting")}</option>
              <option value="Sports">{t("sports")}</option>
              <option value="Arcade">{t("arcade")}</option>
            </select>
          </div>
          <div className='field-container'>
            <label>{t("price")}</label>
            <input type='number' name='price' value={data.price} onChange= {handleChange} placeholder = {props.price}></input>
          </div>
        </div>

        <div className='form-container-level'>
          <div className='field-container'>
            <label>{t("developer")}</label>
            <input type='text' name='developer' value={data.developer} onChange= {handleChange} placeholder = {props.developer}></input>
          </div>
          <div className='field-container'>
            <label>{t("publisher")}</label>
            <input type='text' name='publisher' value={data.publisher} onChange= {handleChange} placeholder = {props.publisher}></input>
          </div>
          <div className='field-container'>
            <label>{t("release-date")}</label>
            <input type = 'date' name='date' value={data.date} onChange= {handleChange} placeholder = {props.date}></input>
          </div>
        </div>

        <div className='form-container-level'>
          <div className='field-container three'>
            <label>{t("product-desc")}</label>
            
            <CKEditor editor = {ClassicEditor}
            data={data.descriptions} onChange={handleEditor}></CKEditor>
            {/* {data.descriptions} */}
          </div>
        </div>

        <div className='form-container-level'>
          <div className='field-container four'>
            <label>{t("product-img")}</label>

            <div className='image-container'>
              <div className='image-cover'  onClick={() => document.querySelector("#fileCover1").click()}>
                <MdUploadFile className='icon'></MdUploadFile>
                <input type='file' id='fileCover1' name='fileCover1' accept='image/*' className='upload' hidden 
                onChange={handleUpload}></input>
                {/* onChange={e => {setData({...data, cover1 : e.target.files[0].name})}}></input> */}
                {data.fileCover1.name ? <label>{data.fileCover1.name}</label>: <label>{t("upload-img")}</label>}
              </div>
              <div className='image-showcase'>
                <div className='image-showcase-item' onClick={() => document.querySelector("#fileCover2").click()}>
                  <MdUploadFile className='icon'></MdUploadFile>
                  <input type='file' id='fileCover2' accept='image/*' className='upload' hidden 
                  onChange={handleUpload}></input>
                  {data.fileCover2.name ? <label>{data.fileCover2.name}</label>: <label>{t("upload-img")}</label>}
                </div>
                <div className='image-showcase-item' onClick={() => document.querySelector("#fileBanner").click()}>
                  <MdUploadFile className='icon'></MdUploadFile>
                  <input type='file' id='fileBanner' accept='image/*' className='upload' hidden 
                  onChange={handleUpload}></input>
                  {data.fileBanner.name ? <label>{data.fileBanner.name}</label>: <label>{t("upload-img")}</label>}
                </div>
                <div className='image-showcase-item' onClick={() => document.querySelector("#fileImg1").click()}>
                  <MdUploadFile className='icon'></MdUploadFile>
                  <input type='file' id='fileImg1' accept='image/*' className='upload' hidden 
                  onChange={handleUpload}></input>
                  {data.fileImg1.name ? <label>{data.fileImg1.name}</label>: <label>{t("upload-img")}</label>}
                </div>
                <div className='image-showcase-item' onClick={() => document.querySelector("#fileImg2").click()}>
                  <MdUploadFile className='icon'></MdUploadFile>
                  <input type='file' id='fileImg2' accept='image/*' className='upload' hidden 
                  onChange={handleUpload}></input>
                  {data.fileImg2.name ? <label>{data.fileImg2.name}</label>: <label>{t("upload-img")}</label>}
                </div>
                <div className='image-showcase-item' onClick={() => document.querySelector("#fileImg3").click()}>
                  <MdUploadFile className='icon'></MdUploadFile>
                  <input type='file' id='fileImg3' accept='image/*' className='upload' hidden 
                  onChange={handleUpload}></input>
                  {data.fileImg3.name ? <label>{data.fileImg3.name}</label>: <label>{t("upload-img")}</label>}
                </div>
                <div className='image-showcase-item' onClick={() => document.querySelector("#fileImg4").click()}>
                  <MdUploadFile className='icon'></MdUploadFile>
                  <input type='file' id='fileImg4' accept='image/*' className='upload' hidden 
                  onChange={handleUpload}></input>
                  {data.fileImg4.name ? <label>{data.fileImg4.name}</label>: <label>{t("upload-img")}</label>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bottom-container'>
            <label>{t("check-carefully")}</label>
            <button type='submit' className='submit-button'>{t("submit")}</button>
        </div>
        
      </form>
    </div>
  )
}

export default Add