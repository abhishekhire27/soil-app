import useLoginForm from "./useLoginForm";
import validate from './LoginFormValidationRules';
import Card from '../../components/cards/Card';
import Button from '../../components/layouts/Button';
import Header from '../../components/header/Header'
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const handleLogin = () => {
        if(localStorage.getItem('users')){
            for(let user in localStorage.getItem('users')){
                const jsonUser = JSON.parse(user);
                if(jsonUser.get('emailId') === values.email){
                    navigate('/home', { state: { isLoggedIn: true } });
                }
            }
        }
        errors.password = 'Email Id and password does not match';
    }

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useLoginForm(handleLogin, validate);

    const handleRegister = () => {
        navigate('/register');
    }

    return (
        <>
        <Header isLoggedIn={false} />
        <main className="login-form" style={{padding: "4rem"}}>
            <Card title="Login">
                <form onSubmit={handleSubmit} style={{padding: "2rem"}} noValidate>
                    
                    <div className="form-group" style={{padding: "0.5rem"}}>
                        <label for="email">E-Mail Address:</label>
                        <input autoComplete="off" type="email" id="email" name="email" className={`input ${errors.email && 'is-danger'} form-control`} onChange={handleChange} value={values.email || ''} required autofocus />
                        {errors.email && (
                            <p className='help is-danger' style={{color: 'red'}}>{errors.email}</p>
                        )
                        }
                    </div>

                    <div className="form-group" style={{padding: "0.5rem"}}>
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" className={`input ${errors.password && 'is-danger'} form-control`} onChange={handleChange} value={values.password || ''} required />
                        {errors.password && (
                            <p className='help is-danger' style={{color: 'red'}}>{errors.password}</p>
                        )
                        }

                    </div>

                    <div class="d-flex flex-row" style={{padding: "1rem"}}>
                        <Button buttonName = "Login" buttonType = "submit"/>
                        <a className="form-text ms-5" style={{ cursor: 'pointer', paddingTop: "1rem" }} onClick={handleRegister}>Haven't registered yet? Register</a>
                    </div>
                </form>
            </Card>
        </main>
        </>
    );
}

export default Login;