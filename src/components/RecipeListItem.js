import { useNavigate } from 'react-router-dom';

export default function RecipeListItem({ data }) {
    const navigate = useNavigate();
    let { title,  imageUrl,  description, author, totalTime, servings, ingredients, _id } = data;
    return (
        <div className="card" onClick={() => navigate(`/${_id}`)} >
            <img src={imageUrl} alt={title} width='100px'/>
            <div>
                <div>{title}</div>
                <div>{description}</div>
                <div>{author}</div>
                <div>{totalTime}</div>
                <div>{servings}</div>
                <div>{ingredients}</div>
            </div>

        </div>
    )
    
}