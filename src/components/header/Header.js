import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <header className="header">

            <a className="navbar-brand logo" style={{ cursor: 'pointer' }} onClick={() => handleNavigation('/')}>SOIL</a>


            {props.isLoggedIn ? (
                    <ul className="navbar-nav d-flex flex-row">
                        <li className="nav-item me-5">
                            <a className="nav-link" onClick={() => handleNavigation('/login')} href="#">Special Offer</a>
                        </li>
                        <li className="nav-item me-5">
                            <a className="nav-link" onClick={() => handleNavigation('/register')} href="#">Cart</a>
                        </li>
                        <li className="nav-item me-5">
                            <a className="nav-link" onClick={() => handleNavigation('/register')} href="#">Profile</a>
                        </li>
                        <li className="nav-item me-5">
                            <a className="nav-link" onClick={() => handleNavigation('/')} href="#">Logout</a>
                        </li>
                    </ ul>
            ) : (
                <ul className="navbar-nav d-flex flex-row">
                    <li className="nav-item me-5">
                        <a className="nav-link" onClick={() => handleNavigation('/login')} href="#">Login</a>
                    </li>
                    <li className="nav-item me-5">
                        <a className="nav-link" onClick={() => handleNavigation('/register')} href="#">Register</a>
                    </li>
                </ul>
            )}


        </header>
    );
}

export default Header;