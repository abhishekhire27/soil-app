import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
                <div className="d-inline">
                    <i className="fas fa-copyright m-1"></i>
                    <p style={{ display: 'inline' }}>SOIL-{new Date().getFullYear()}. All rights reserved.</p>
                </div>
        </footer>

    )
}

export default Footer;