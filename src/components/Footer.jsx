import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import footerstyle from "./Footer.module.css";
import {Component} from "react";

class Footer extends Component{
    render(){
    return (
        <footer>
            <div className={footerstyle["footer-heading"]}>
                <h2>Follow CodersWorld on social media to stay updated with the latest technology.</h2>
            </div>
            <div className={footerstyle["icons"]}>
                <FontAwesomeIcon
                    icon={["fab", "facebook"]}
                    className={footerstyle["facebook-icon"]}
                />
                <FontAwesomeIcon
                    icon={["fab", "twitter"]}
                    className={footerstyle["twitter-icon"]}
                />
                <FontAwesomeIcon
                    icon={["fab", "linkedin"]}
                    className={footerstyle["linkedin-icon"]}
                />
            </div>

        </footer>
    )
    }
}

export default Footer;