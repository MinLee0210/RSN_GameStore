import './viewbutton.scss'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

function ViewButton(){
    const {t} = useTranslation();
    return(
        <Link className="button">{t("viewall")}</Link>
    );
}

export default ViewButton;