import './headline.scss'
import ViewButton from '../Button/ViewButton';

const Headline = (prop) =>{
    const title = prop.title;
    return(
        <div className="headline-container">
            <h1 className="title">{title}</h1>
            <ViewButton></ViewButton>
        </div>  
    )
}

export default Headline
