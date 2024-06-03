import { useState, useEffect } from 'react';
import { useAuth } from "../components/auth/AuthProvider";
import { login } from '../services/user.services'

const useLoginForm = (callback, validate) => {

    const[values, setValues] = useState({});
    const[errors, setErrors] = useState({});
    const[isSubmitting, setIsSubmitting] = useState(false);

    const { setUser } = useAuth();
    
    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting){
            callback();
        }
    }, [errors, isSubmitting]);

    const handleSubmit = async (event) => {
        if (event) event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
            const user = {
                emailId: values.email,
                password: values.password
            };
    
            try {
                const savedUser = await login(user);
                setUser(savedUser.data);
                localStorage.setItem("user", JSON.stringify(savedUser.data));
                setIsSubmitting(true);
            } catch (error) {
                const newErrors = { ...validationErrors };
                let errorMessage = error.message;

                if (errorMessage.includes(':')) {
                    errorMessage = errorMessage.split(': ')[1];
                }
                
                if (errorMessage.startsWith('"') && errorMessage.endsWith('"')) {
                    errorMessage = errorMessage.slice(1, -1);
                }
                if(errorMessage == "Wrong password"){
                    newErrors.password = errorMessage;
                }
                else{
                    newErrors.email = errorMessage;
                }
                
                setErrors(newErrors);
            }
        }
        
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
    }
};

export default useLoginForm;