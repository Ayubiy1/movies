import { useNavigate } from "react-router";
import "./login.css";

const Login = ({ setLogin, login }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input type="text" name="" required="" />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="" required="" />
            <label>Password</label>
          </div>
          <a onClick={() => setLogin(true)}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
      </div>{" "}
    </>
  );
};
export default Login;
