import useLoginForm from "../../hooks/useLoginForm";
import validate from "./LoginFormValidationRules";
import Card from "../../components/cards/Card";
import Button from "../../components/layouts/Button";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthProvider";
import { useToast } from "../../components/Toaster/ToastContext";
import bcrypt from "bcryptjs-react";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { addToast } = useToast();

  async function comparePasswords(enteredPassword, storedHashedPassword) {
    try {
      // const match = await bcrypt.compare(enteredPassword, storedHashedPassword);
      // return match;
      //   let match = false;
      let match = await bcrypt.compare(enteredPassword, storedHashedPassword);
      console.log(match);
      return match;
    } catch (error) {
      return false;
    }
  }

  const handleLogin = async () => {
    let user = null;
    let jsonUsers = JSON.parse(localStorage.getItem("users"));
    jsonUsers.forEach(async (localStorageUser) => {
      if (localStorageUser["emailId"] === values.email) {
        let passwordMatch = await comparePasswords(
          values.password,
          localStorageUser["password"]
        );
        if (passwordMatch) {
          user = localStorageUser;
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
          return;
        } else {
          addToast("Email Id and password does not match");
        }
      }
    });
  };

  const { values, errors, handleChange, handleSubmit } = useLoginForm(
    handleLogin,
    validate
  );

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Header />

      <main className="slogin-form" style={{ padding: "4rem" }}>
        <Card title="Login">
          <form onSubmit={handleSubmit} style={{ padding: "2rem" }} noValidate>
            <div className="form-group" style={{ padding: "0.5rem" }}>
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

            <div className="form-group" style={{ padding: "0.5rem" }}>
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

            <div className="d-flex flex-row" style={{ padding: "1rem" }}>
              <Button buttonName="Login" buttonType="submit" />
              <a
                className="form-text ms-5"
                style={{ cursor: "pointer", paddingTop: "1rem" }}
                onClick={handleRegister}
              >
                Haven't registered yet? Register
              </a>
            </div>
          </form>
        </Card>
      </main>
    </>
  );
}

export default Login;
