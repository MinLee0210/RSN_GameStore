import './trustpanel.scss';
import {AiOutlineCloudDownload} from 'react-icons/ai';
import {BiSupport} from 'react-icons/bi';
import {BsShieldCheck} from 'react-icons/bs'
import { useTranslation } from 'react-i18next';

import mascot from '../../images/logo/mascot-green.png'
function TrustPanel(){
    const {t} = useTranslation();
    return (
        <div className='trust-panel-container'>
            <div className='trust-panel-content-container'>
                <div className='feature'>
                    <AiOutlineCloudDownload className='icon'></AiOutlineCloudDownload>
                    <div className='content'>
                        <h1>{t("trustpanel1")}</h1>
                        <span>{t("trustpanel2")}</span>
                    </div>
                    
                </div>
                <div className='space'></div>
                <div className='feature'>
                    <BsShieldCheck className='icon'></BsShieldCheck>
                    <div className='content'>
                        <h1>{t("trustpanel3")}</h1>
                        <span>{t("trustpanel4")}</span>
                    </div>
                    
                </div>
                <div className='space'></div>
                <div className='feature'>
                    <BiSupport className='icon'></BiSupport>
                    <div className='content'>
                        <h1>{t("trustpanel5")}</h1>
                        <span>{t("trustpanel6")}</span>
                    </div>
                    
                </div>
                <div className='space'></div>
                <div className='feature'>
                    <div className='icon-logo'>
                        <img src={mascot} alt=''></img>
                    </div>
                    <div className='content'>
                        <h1>{t("trustpanel7")}</h1>
                        <span>{t("trustpanel8")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrustPanel;