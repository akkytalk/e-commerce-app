import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../firebase";
import { useStateValue } from "../store/StateProvider";

import "./Login.css";

function Login() {
  const [{ basket, path }, dispatch] = useStateValue();

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (basket && path !== "/") {
          dispatch({
            type: "SET_AUTH_REDIRECT_PATH",
            path: "/",
          });
          history.push(path);
        } else {
          history.push("/");
        }
        Swal.fire({
          title: "Welcome",
          text: "You are logged in",
          icon: "success",
          confirmButtonText: "Continue",
          showCancelButton: false,
          showConfirmButton: true,
          cancelButtonColor: "red",
          confirmButtonColor: "green",
          timer: 3000,
        });
      })
      .catch((error) =>
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          timer: 3000,
        })
      );
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login-container">
        <center>
          <h1>Sign In</h1>
        </center>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={signIn} className="login-signinbutton">
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
      </div>
    </div>
  );
}

export default Login;
