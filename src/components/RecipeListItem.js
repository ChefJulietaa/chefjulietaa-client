import { useNavigate } from 'react-router-dom';

export default function RecipeListItem({ data }) {
    const navigate = useNavigate();
    let { title } = data;
    return (
        <div className="card" onClick={() => navigate(`/${_id}`)} >
            <div>
                <div>{title}</div>
            </div>
        </div>
    )
}