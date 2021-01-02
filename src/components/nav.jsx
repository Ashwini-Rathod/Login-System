import {Link} from "react-router-dom";
import "./nav.css"
function Nav (){
    return(
        <nav className="nav-container"> 
        <div >
            <h2 className="title">CodersWorld</h2>
        </div>
        <div>
            <Link to="/" className="home">
                <p className="home-p">Home</p>
            </Link>
        </div>
        </nav>
    )
}

export default Nav;