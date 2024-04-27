import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthProvider';

const Header = () => {

    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const logout = (path) => {
        setUser(null);
        localStorage.removeItem("user");
        handleNavigation(path);
    }

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <header className="header">

            <a className="navbar-brand logo" style={{ cursor: 'pointer' }} onClick={() => handleNavigation('/')}>SOIL</a>

            {user !== null ? (
                <>
                    <p>Welcome {user.name}</p>

                    <ul className="navbar-nav d-flex flex-row">
                        <li className="nav-item me-5">
                            <a className="nav-link" onClick={() => handleNavigation('/deals')} href="#">Organic product specials</a>
                        </li>
                        <li className="nav-item me-5">
                            <a className="nav-link" onClick={() => handleNavigation('/farming')} href="#">small-scale farming</a>
                        </li>
                        <li className="nav-item me-5">
                            <a className="nav-link" onClick={() => handleNavigation('/cart')} href="#">Cart</a>
                        </li>
                        <li className="nav-item me-5">
                            <a className="nav-link" onClick={() => handleNavigation('/profile')} href="#">Profile</a>
                        </li>
                        <li className="nav-item me-5">
                            <a className="nav-link" onClick={() => logout('/')} href="#">Logout</a>
                        </li>
                    </ ul>
                </>
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