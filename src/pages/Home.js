import { Link } from "react-router-dom"


export default function Home() {
    return (
        <div >
            <div>
                <h2><Link to='/recipes'>All Recipes</Link></h2>
            </div>
        </div>
    )
}