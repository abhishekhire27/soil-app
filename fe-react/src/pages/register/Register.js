import useRegisterForm from "../../hooks/useRegisterForm";
import validate from "./RegisterFormValidationRules";
import Card from "../../components/cards/Card";
import Button from "../../components/layouts/Button";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/Toaster/ToastContext";
import { registerUser } from '../../services/user.services'

function Register() {
  const { addToast } = useToast();

  const handleRegister = async () => {
    const newUser = {
      name: values.name,
      emailId: values.email,
      password: values.password
    };

    try{
      await registerUser(newUser);
      addToast("Registration successful", { appearance: 'success' });
      navigate("/login");
    }
    catch(error){
      addToast(`Registration failed: ${error.error || 'Unknown error'}`, { appearance: 'error' });
    }
  };

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  const { values, errors, handleChange, handleSubmit } = useRegisterForm(
    handleRegister,
    validate
  );

  return (
    <>
      <Header />
      <main className="Register-form" style={{ padding: "2rem" }}>
        <Card title="Register">
          <form onSubmit={handleSubmit} style={{ padding: "2rem" }} noValidate>
            <div className="form-group" style={{ padding: "6px" }}>
              <label>Full Name:</label>
              <input
                autoComplete="off"
                type="name"
                id="name"
                name="name"
                className={`input ${errors.name && "is-danger"} form-control`}
                onChange={handleChange}
                value={values.name || ""}
                required
              />
              {errors.name && (
                <p className="help is-danger" style={{ color: "red" }}>
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form-group" style={{ padding: "6px" }}>
              <label>E-Mail Address:</label>
              <input
                autoComplete="off"
                type="email"
                id="email"
                name="email"
                className={`input ${errors.email && "is-danger"} form-control`}
                onChange={handleChange}
                value={values.email || ""}
                required
              />
              {errors.email && (
                <p className="help is-danger" style={{ color: "red" }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-group" style={{ padding: "6px" }}>
              <label>Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`input ${
                  errors.password && "is-danger"
                } form-control`}
                onChange={handleChange}
                value={values.password || ""}
                required
              />
              {errors.password && (
                <p className="help is-danger" style={{ color: "red" }}>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="form-group" style={{ padding: "6px" }}>
              <label>Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`input ${
                  errors.confirmPassword && "is-danger"
                } form-control`}
                onChange={handleChange}
                value={values.confirmPassword || ""}
                required
              />
              {errors.confirmPassword && (
                <p className="help is-danger" style={{ color: "red" }}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="d-flex flex-row" style={{ padding: "1rem" }}>
              <Button buttonName="Register" buttonType="submit" />
              <a
                className="form-text ms-5"
                style={{ cursor: "pointer", paddingTop: "1rem" }}
                onClick={handleLogin}
                href="#"
              >
                Have Account? Login
              </a>
            </div>
          </form>
        </Card>
      </main>
    </>
  );
}

export default Register;