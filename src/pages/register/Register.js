import useRegisterForm from "./useRegisterForm";
import validate from './RegisterFormValidationRules';
import Card from '../../components/cards/Card';
import Button from '../../components/layouts/Button';
import Header from '../../components/header/Header'
import { useNavigate } from 'react-router-dom';

function Register() {

    const handleRegister = () => {
        console.log("No error, Register successful");
    }

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useRegisterForm(handleRegister, validate);


    return (
        <>
            <Header isLoggedIn={false} />
            <main className="Register-form" style={{ padding: "2rem" }}>
                <Card title="Register">
                    <form onSubmit={handleSubmit} style={{ padding: "2rem" }} noValidate>

                        <div className="form-group" style={{ padding: "6px" }}>
                            <label for="name">Full Name:</label>
                            <input autoComplete="off" type="name" id="name" name="name" className={`input ${errors.name && 'is-danger'} form-control`} onChange={handleChange} value={values.name || ''} required autofocus />
                            {errors.name && (
                                <p className='help is-danger' style={{ color: 'red' }}>{errors.name}</p>
                            )
                            }
                        </div>

                        <div className="form-group" style={{ padding: "6px" }}>
                            <label for="email">E-Mail Address:</label>
                            <input autoComplete="off" type="email" id="email" name="email" className={`input ${errors.email && 'is-danger'} form-control`} onChange={handleChange} value={values.email || ''} required autofocus />
                            {errors.email && (
                                <p className='help is-danger' style={{ color: 'red' }}>{errors.email}</p>
                            )
                            }
                        </div>

                        <div className="form-group" style={{ padding: "6px" }}>
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" className={`input ${errors.password && 'is-danger'} form-control`} onChange={handleChange} value={values.password || ''} required />
                            {errors.password && (
                                <p className='help is-danger' style={{ color: 'red' }}>{errors.password}</p>
                            )
                            }
                        </div>

                        <div class="d-flex flex-row" style={{ padding: "1rem" }}>
                            <Button buttonName="Register" buttonType="submit" />
                            <a className="form-text ms-5" style={{ cursor: 'pointer', paddingTop: "1rem" }} onClick={handleLogin}>Have Account? Login</a>
                        </div>
                    </form>
                </Card>
            </main>
        </>
    );
}

export default Register;