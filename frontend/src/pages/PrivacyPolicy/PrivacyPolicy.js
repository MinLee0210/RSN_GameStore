import React from 'react'
import './privacyPolicy.scss'
import Separator from '../../components/Separator/Separator'
import { useTranslation } from 'react-i18next';
function PrivacyPolicy() {
  const {t} = useTranslation();
  return (
    <div className='pp-container'>
      {/* <Separator></Separator>
      <Separator></Separator> */}
        <ol className='paragraph-container'>
          <div className='paragraph-item paragraph-policy'>
          <h1>{t("privacy-policy-page-text-1")}</h1>
              <p>{t("privacy-policy-page-text-2")} <br></br> <br></br>
              {t("privacy-policy-page-text-3")}</p>
          </div>
          <div className='paragraph-item paragraph-risen'>
            <h2>{t("privacy-policy-page-text-4")}</h2>
          </div>
          <div className="paragraph-item paragraph-notice">
            <h3>{t("privacy-policy-page-text-5")}</h3>
          </div>
          <li className='paragraph-item p-list'>
            <h3 className='p-header'>{t("privacy-policy-page-text-6")}</h3>
                <p>{t("privacy-policy-page-text-7")}</p>
                    <br />
                <p>{t("privacy-policy-page-text-8")}</p>
          </li>
          <li className='paragraph-item p-list'>
            <h3 className='p-header'>{t("privacy-policy-page-text-9")}</h3>
                <p>{t("privacy-policy-page-text-10")}</p>
                  <p>{t("privacy-policy-page-text-11")}</p>
                  <p>{t("privacy-policy-page-text-12")}</p>
          </li> 
          <li className='paragraph-item p-list'>
            <h3 className='p-header'>{t("privacy-policy-page-text-13")}</h3>
                <p>{t("privacy-policy-page-text-14")}</p>
                <br />
                <p>{t("privacy-policy-page-text-15")}</p>
          </li>  
          <li className='paragraph-item p-list'>
            <h3 className='p-header'>{t("privacy-policy-page-text-16")}</h3>
                <p>{t("privacy-policy-page-text-17")}</p>
                    <br />
                <p>{t("privacy-policy-page-text-18")}</p>
                  <br />
                <p>{t("privacy-policy-page-text-19")}</p>
                  <p>
                  <ul>
                    <li>{t("privacy-policy-page-text-20")}</li>
                    <li>{t("privacy-policy-page-text-21")}</li>
                    <li>{t("privacy-policy-page-text-22")}</li>
                    <li>{t("privacy-policy-page-text-23")}</li>
                    <li>{t("privacy-policy-page-text-24")}</li>
                  </ul>
                  </p>
                  <p>{t("privacy-policy-page-text-25")}</p>
                    <p>{t("privacy-policy-page-text-26")}</p>
                    <p>{t("privacy-policy-page-text-27")}</p>
          </li>  
          <li className='paragraph-item p-list'>
            <h3 className='p-header'>{t("privacy-policy-page-text-28")}</h3>
                <p>{t("privacy-policy-page-text-29")}
                <ul>
                    <li>{t("privacy-policy-page-text-30")}</li>
                    <li>{t("privacy-policy-page-text-31")}</li>
                    <li>{t("privacy-policy-page-text-32")}
                    <ul>
                      <li>{t("privacy-policy-page-text-33")}</li>
                      <li>{t("privacy-policy-page-text-34")}</li>
                      <li>{t("privacy-policy-page-text-35")}</li>
                      <li>{t("privacy-policy-page-text-36")}</li>
                      <li>{t("privacy-policy-page-text-37")}</li>
                      <li>{t("privacy-policy-page-text-38")}</li>
                    </ul>
                    </li>
                  </ul>
                </p>
          </li>  
          <li className='paragraph-item p-list paragraph-how'>
            <h3 className='p-header'>{t("privacy-policy-page-text-39")}</h3>
                <p>{t("privacy-policy-page-text-40")}</p>
                    <br />
          </li>  
          <div className = "table">
            <div className = "table-flex">
                    <h2 className='table-flex-item'>{t("privacy-policy-page-text-41")}</h2>
                    <h2 className='table-flex-item'>{t("privacy-policy-page-text-42")}	</h2>
                    <h2 className='table-flex-item'>{t("privacy-policy-page-text-43")}</h2>
            </div>
            <div className='table-grid'>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-44")}</p>
                      <p className='table-grid-item'>
                        {t("privacy-policy-page-text-45")}
                        <br /> 
                        {t("privacy-policy-page-text-46")}
                      </p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-47")} <br /> {t("privacy-policy-page-text-48")} </p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-49")}</p>
                      <p className='table-grid-item'>
                      {t("privacy-policy-page-text-50")}
                        <br />
                        {t("privacy-policy-page-text-51")} 
                        <br />
                        {t("privacy-policy-page-text-52")}
                        <br />
                        {t("privacy-policy-page-text-53")}
                      </p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-54")} <br /> {t("privacy-policy-page-text-55")} <br /> {t("privacy-policy-page-text-56")}</p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-57")}</p>
                      <p className='table-grid-item'>
                        {t("privacy-policy-page-text-58")}
                        <br />
                        {t("privacy-policy-page-text-59")}
                        <br />
                        {t("privacy-policy-page-text-60")}
                        <br />
                        {t("privacy-policy-page-text-61")}
                        <br />
                        {t("privacy-policy-page-text-62")}
                        <br />
                        {t("privacy-policy-page-text-63")} 
                        <br />
                        {t("privacy-policy-page-text-64")}
                      </p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-65")} <br /> {t("privacy-policy-page-text-66")} <br /> {t("privacy-policy-page-text-67")}</p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-68")}</p>
                      <p className='table-grid-item'>
                      {t("privacy-policy-page-text-69")}
                        <br />
                        {t("privacy-policy-page-text-70")} 
                        <br />
                        {t("privacy-policy-page-text-71")}
                        <br />
                        {t("privacy-policy-page-text-72")}
                        <br />
                        {t("privacy-policy-page-text-73")}
                        <br />
                        {t("privacy-policy-page-text-74")}
                        <br />
                        {t("privacy-policy-page-text-75")}
                      </p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-76")} <br/> {t("privacy-policy-page-text-77")} <br /> {t("privacy-policy-page-text-78")}</p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-79")}</p>
                      <p className='table-grid-item'>
                      {t("privacy-policy-page-text-80")}
                        <br />
                        {t("privacy-policy-page-text-81")}
                        <br />
                        {t("privacy-policy-page-text-82")}
                        <br />
                        {t("privacy-policy-page-text-83")}
                      </p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-84")}</p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-85")}</p>
                      <p className='table-grid-item'>
                      {t("privacy-policy-page-text-86")}
                        <br />
                        {t("privacy-policy-page-text-87")}
                      </p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-88")}</p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-89")}</p>
                      <p className='table-grid-item'>
                      {t("privacy-policy-page-text-90")}
                        <br />
                        {t("privacy-policy-page-text-91")}
                        <br />
                        {t("privacy-policy-page-text-92")}
                        <br />
                        {t("privacy-policy-page-text-93")}
                      </p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-94")}</p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-95")}</p>
                      <p className='table-grid-item'>
                      {t("privacy-policy-page-text-96")}
                        <br />
                        {t("privacy-policy-page-text-97")}
                        <br />
                        {t("privacy-policy-page-text-98")}
                        <br />
                        {t("privacy-policy-page-text-99")}
                        <br />
                        {t("privacy-policy-page-text-100")}
                        <br />
                        {t("privacy-policy-page-text-101")}
                        <br />
                        {t("privacy-policy-page-text-102")}
                      </p>
                      <p className='table-grid-item'>{t("privacy-policy-page-text-103")} <br /> {t("privacy-policy-page-text-104")} <br /> {t("privacy-policy-page-text-105")}</p>
            </div>
        </div>
          <li className='paragraph-item p-list'>
                <p>{t("privacy-policy-page-text-106")}</p>
                    <br />
                <p>{t("privacy-policy-page-text-107")}</p>
                  <br />
                <p>{t("privacy-policy-page-text-108")}</p>
                  <p>{t("privacy-policy-page-text-109")}</p>
          </li>  
          <li className='paragraph-item p-list'>
            <h3 className='p-header'>{t("privacy-policy-page-text-110")}</h3>
                <p>{t("privacy-policy-page-text-111")}
                  <ul>
                    <li>{t("privacy-policy-page-text-112")}</li>
                    <li>{t("privacy-policy-page-text-113")}</li>
                    <li>{t("privacy-policy-page-text-114")}</li>
                    <li>{t("privacy-policy-page-text-115")}</li>
                  </ul>
                  </p>
                  <p>
                  {t("privacy-policy-page-text-116")}
                  </p>
          </li>  
          <li className='paragraph-item p-list'>
            <h3 className='p-header'>{t("privacy-policy-page-text-117")}</h3>
                <p>{t("privacy-policy-page-text-118")}</p>
          </li>  
          <li className='paragraph-item p-list'>
            <h3  className='p-header'>{t("privacy-policy-page-text-119")}</h3>
                <p>{t("privacy-policy-page-text-120")}</p>
          </li>  
          <li className='paragraph-item p-list'>
            <h3  className='p-header'>{t("privacy-policy-page-text-121")}</h3>
                <p>{t("privacy-policy-page-text-122")}</p>
          </li>  
          <li className='paragraph-item p-list'>
            <h3 className='p-header'>{t("privacy-policy-page-text-123")}</h3>
                <p>{t("privacy-policy-page-text-124")}
                  </p>
          </li>  
          <li className='paragraph-item p-list'>
            <h3 className='p-header'>{t("privacy-policy-page-text-125")}</h3>
                <p>{t("privacy-policy-page-text-126")}
                <ul>
                    <li>{t("privacy-policy-page-text-127")}</li>
                    <li>{t("privacy-policy-page-text-128")}</li>
                    <li>{t("privacy-policy-page-text-129")}</li>
                    <li>{t("privacy-policy-page-text-130")}</li>
                    <li>{t("privacy-policy-page-text-131")}</li>
                      <li>{t("privacy-policy-page-text-132")}</li>
                    <li>{t("privacy-policy-page-text-133")}</li>
                  </ul>
                </p>
                    <br />
                <p>{t("privacy-policy-page-text-134")}</p>
                  <br />
                <p>{t("privacy-policy-page-text-135")}</p>
                  <p>{t("privacy-policy-page-text-136")}</p>
          </li>  
          <li className='paragraph-item p-list'>
            <h3 className='p-header'>{t("privacy-policy-page-text-137")}</h3>
                <p>{t("privacy-policy-page-text-138")}</p>
          </li>  
          <li className='paragraph-item p-list'>
            <h3  className='p-header'>{t("privacy-policy-page-text-139")}</h3>
                <p>{t("privacy-policy-page-text-140")}</p>
          </li>  
        </ol>
    </div>
  )
}

export default PrivacyPolicy
