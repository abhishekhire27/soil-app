import './Header.css';
import { FaShoppingCart, FaUser, FaUserCircle, FaSignOutAlt, FaBreadSlice } from 'react-icons/fa';
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
            <a className="navbar-brand logo" style={{ cursor: 'pointer' }} onClick={() => handleNavigation('/')}>
                <span className="logo-icon"></span> SOIL
            </a>

            {user !== null ? (
                <>
                    <p className="welcome-message">Welcome, {user.name}</p>

                    <ul className="navbar-links">
                        <li className="nav-item ms-4 me-4">
                            <a className="nav-link" onClick={() => handleNavigation('/deals')} href="#"><FaShoppingCart /> &nbsp; Specials Deals</a>
                        </li>
                        <li className="nav-item ms-4 me-4">
                            <a className="nav-link" onClick={() => handleNavigation('/cart')} href="#"><FaShoppingCart /> &nbsp;Cart</a>
                        </li>
                        <li className="nav-item ms-4 me-4">
                            <a className="nav-link" onClick={() => handleNavigation('/diet-plan')} href="#"><FaBreadSlice /> &nbsp;Diet Plan</a>
                        </li>
                        <li className="nav-item ms-4 me-4">
                            <a className="nav-link" onClick={() => handleNavigation('/profile')} href="#"><FaUser /> &nbsp;Profile</a>
                        </li>
                        <li className="nav-item ms-4">
                            <a className="nav-link" onClick={() => logout('/')} href="#"><FaSignOutAlt /> &nbsp;Logout</a>
                        </li>
                        
                    </ul>
                    <div className='me-4'style={{fontSize: "2rem"}}>
                            <FaUserCircle />
                        </div>
                </>
            ) : (
                <ul className="navbar-links">
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => handleNavigation('/login')} href="#">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => handleNavigation('/register')} href="#">Register</a>
                    </li>
                </ul>
            )}
        </header>
    );
}

export default Header;
