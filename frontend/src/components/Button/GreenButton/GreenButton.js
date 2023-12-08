import './green.scss'
import { Link } from 'react-router-dom';

function GreenButton(prop){
    const title = prop.title
    const link = prop.link
    const getLink = (link) => {
        if(link === 'payment'){
            return '/cart/payment'
        }
    }
    return(
        <Link to = {getLink(link)} className={link === 'payment-none' ? "green-button none" : 'green-button'} onClick={prop.event}>{title}</Link>
    );
}

export default GreenButton;