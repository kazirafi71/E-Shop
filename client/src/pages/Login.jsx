import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

export default function Login() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [user, setUser] = "";

  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  console.log(state.user);

  const loginData = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result)
        setLoading(false);

        if (result.errors) {
          console.log(result.errors);
          return setError(result.errors);
        }
        dispatch({ type: "SET_USER", payload: result.user });
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("auth_token", result.token);
        // console.log(state)
        history.push("/");
      });
  };

  useEffect(() => {
    let token = localStorage.getItem("auth_token");

    let userInfo = JSON.parse(localStorage.getItem("user"));

    if (token) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <div>
      <div className="row ">
        <Typography variant="h6" className="text-center bg-warning text-light">
          For Admin Login: <br />
          Email: admin@gmail.com <br />
          pass: 123456
        </Typography>

        <div className="col-md-6 mx-auto card p-5 my-5">
          <form onSubmit={loginData}>
            <h2 className="text-center">Login Here</h2>
            {error.exist_user ? (
              <div class="alert alert-danger" role="alert">
                {error.exist_user}
              </div>
            ) : null}

            <div className="form-group">
              <label>Email address</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
              />
              {error.email ? (
                <div className="alert alert-danger" role="alert">
                  {error.email}
                </div>
              ) : null}
            </div>
            <br />
            <div className="form-group">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
              />
            </div>
            {error.password ? (
              <div className="alert alert-danger" role="alert">
                {error.password}
              </div>
            ) : null}

            <br />

            <button type="submit" className="btn btn-primary">
              Login
            </button>
            {loading ? (
              <div
                className="spinner-border text-warning text-center"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : null}

            <br />
            <br />

            <Link to="/register">Don't have an account? Register here</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
