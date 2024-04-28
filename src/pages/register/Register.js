import useRegisterForm from "../../hooks/useRegisterForm";
import validate from './RegisterFormValidationRules';
import Card from '../../components/cards/Card';
import Button from '../../components/layouts/Button';
import Header from '../../components/header/Header'
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/Toaster/ToastContext';
import bcrypt from 'bcryptjs';

function Register() {

    const { addToast } = useToast();

    function getLastUserId(){
        if(localStorage.getItem('users')){
            let highestId = 0;
            let jsonUsers = JSON.parse(localStorage.getItem('users'));
            for(let user in jsonUsers){
                if(user['id'] > highestId){
                    highestId = user.get('id');
                }
            }
            return highestId;
        }
        return -1;
    }

    async function hashPassword(password){
        // try {
        //     // const salt = await bcrypt.genSalt(10);
        //     let hashPassword = null;
        //     // const bcrypt = require('bcrypt');
        //     const saltRounds = 10;
        //     bcrypt.hash(password, saltRounds, function(err, hash) {
        //         hashPassword = hash;
        //     });
        //     return hashPassword;
        // } catch (error) {
        //     console.error('Error hashing password:', error);
        // }

        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (error) {
            console.error('Error hashing password:', error);
        }
    }

    function getCurrentDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        const currentDate = `${day}/${month}/${year}`;
        return currentDate;
    }

    const handleRegister = async() => {
        const hashedPassword = await hashPassword(values.password);
        let lastUserId = getLastUserId() + 1;
        const newUser = { 
            "id": lastUserId, 
            "name": values.name,
            "emailId": values.email,
            "password": hashedPassword,
            "cartId": lastUserId,
            "joiningDate": getCurrentDate()
        };

        const newCart = {
            "cartId": lastUserId,
            "items": []
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        const carts = JSON.parse(localStorage.getItem('carts') || '[]');
        carts.push(newCart);
        localStorage.setItem('carts', JSON.stringify(carts));

        addToast('Registration successful');
        navigate('/login');
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
            <Header />
            <main className="Register-form" style={{ padding: "2rem" }}>
                <Card title="Register">
                    <form onSubmit={handleSubmit} style={{ padding: "2rem" }} noValidate>

                        <div className="form-group" style={{ padding: "6px" }}>
                            <label>Full Name:</label>
                            <input autoComplete="off" type="name" id="name" name="name" className={`input ${errors.name && 'is-danger'} form-control`} onChange={handleChange} value={values.name || ''} required />
                            {errors.name && (
                                <p className='help is-danger' style={{ color: 'red' }}>{errors.name}</p>
                            )
                            }
                        </div>

                        <div className="form-group" style={{ padding: "6px" }}>
                            <label>E-Mail Address:</label>
                            <input autoComplete="off" type="email" id="email" name="email" className={`input ${errors.email && 'is-danger'} form-control`} onChange={handleChange} value={values.email || ''} required  />
                            {errors.email && (
                                <p className='help is-danger' style={{ color: 'red' }}>{errors.email}</p>
                            )
                            }
                        </div>

                        <div className="form-group" style={{ padding: "6px" }}>
                            <label>Password:</label>
                            <input type="password" id="password" name="password" className={`input ${errors.password && 'is-danger'} form-control`} onChange={handleChange} value={values.password || ''} required />
                            {errors.password && (
                                <p className='help is-danger' style={{ color: 'red' }}>{errors.password}</p>
                            )
                            }
                        </div>

                        <div className="form-group" style={{ padding: "6px" }}>
                            <label>Confirm Password:</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" className={`input ${errors.confirmPassword && 'is-danger'} form-control`} onChange={handleChange} value={values.confirmPassword || ''} required />
                            {errors.confirmPassword && (
                                <p className='help is-danger' style={{ color: 'red' }}>{errors.confirmPassword}</p>
                            )
                            }
                        </div>

                        <div className="d-flex flex-row" style={{ padding: "1rem" }}>
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