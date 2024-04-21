import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <nav className="header">
            <div>
                <p className="logo">SOIL</p>
            </div>

            {props.isLoggedIn ? (
                <div className="navbar-links">
                    <a onClick={() => handleNavigation('/Home')} href="#">Home</a>
                    <a onClick={() => handleNavigation('/SpecialOffer')} href="#">Special Offer</a>
                    <a onClick={() => handleNavigation('/Cart')} href="#">Cart</a>
                    <a onClick={() => handleNavigation('/Profile')} href="#">Profile</a>
                    <a onClick={() => handleNavigation('/Logout')} href="#">Logout</a>
                </div>
            ) : null}

        </nav>
    );
}

export default Header;