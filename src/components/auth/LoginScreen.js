import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../features/auth/thunks";
import { useForm } from "../../hooks/useForm";
import "./login.css";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "alejandro@gmail.com",
    lPassword: "123456",
  });

  const { lEmail, lPassword } = formLoginValues;

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: "Alejandro Prieto León",
    rEmail: "aprietoleon97@gmail.com",
    rPassword1: "1234567",
    rPassword2: "1234567",
  });

  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (rPassword1 !== rPassword2) {
      return Swal.fire("Error", "Different passwords", "error");
    }
    dispatch(startRegister(rName, rEmail, rPassword1));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="rPassword1"
                value={rPassword1}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                name="rPassword2"
                value={rPassword2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Create account"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
