import './Login.css';
import useLoginForm from "./useLoginForm";
import validate from './LoginFormValidationRules';
import Card from '../../card/Card';
import Button from '../../layouts/Button';

function Login() {

    const handleLogin = () => {
        console.log("No error, Login successful");
    }

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useLoginForm(handleLogin, validate);


    const handleRegister = () => {
        console.log("HELLP");
    }

    return (
        <main class="login-form">
            <Card title="Login">
                <form onSubmit={handleSubmit} noValidate>
                    <div class="form-group row">
                        <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                        <div class="col-md-6">
                            <input autoComplete="off" type="email" id="email" name="email" class="form-control" className={`input ${errors.email && 'is-danger'}`} onChange={handleChange} value={values.email || ''} required autofocus />
                            {errors.email && (
                                <p className='help is-danger'>{errors.email}</p>
                            )
                            }
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                        <div class="col-md-6">
                            <input type="password" id="password" name="password" class="form-control" className={`input ${errors.password && 'is-danger'}`} onChange={handleChange} value={values.password || ''} required />
                            {errors.password && (
                                <p className='help is-danger'>{errors.password}</p>
                            )
                            }

                        </div>
                    </div>

                    <div class="col-md-6 offset-md-4">
                        <Button buttonName = "Login" buttonType = "submit"/>
                        <Button buttonName = "Register" buttonType = "button" onClick={handleRegister} />
                    </div>
                </form>
            </Card>
        </main>
    );
}

export default Login;