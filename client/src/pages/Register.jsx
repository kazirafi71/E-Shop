import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const history = useHistory();

  const registerData = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLoading(false);
        if (result.errors) {
          console.log(result.errors);
          return setError(result.errors);
        }
        setError("");
        setSuccess("Registration success, Please login");
      });
  };

  useEffect(()=>{
    let token=localStorage.getItem('auth_token')
    if(token){
      history.push('/')
    }
    else{
      history.push('/register')
    }

  },[])
  return (
    <div>
      <div className="row ">
        <div className="col-md-6 mx-auto card p-5 my-5">
          <form onSubmit={registerData}>
            <h2 className="text-center">Register Here</h2>
            {success ? (
              <div class="alert alert-success" role="alert">
                {success}
              </div>
            ) : null}
            {error.exist_user ? (
                <div class="alert alert-danger" role="alert">
                  {error.exist_user}
                </div>
              ) : null}

            <div className="form-group">
              <label for="validationServer03">First Name</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              {error.firstName ? (
                <div class="alert alert-danger" role="alert">
                  {error.firstName}
                </div>
              ) : null}
            </div>
            <br />

            <div className="form-group">
              <label for="validationServer03">Last Name</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              {error.lastName ? (
                <div class="alert alert-danger" role="alert">
                  {error.lastName}
                </div>
              ) : null}
            </div>
            <br />

            <div className="form-group">
              <label>Email address</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            {error.email ? (
              <div class="alert alert-danger" role="alert">
                {error.email}
              </div>
            ) : null}
            <br />
            <div className="form-group">
              <label>Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
              />
            </div>
            {error.password ? (
              <div class="alert alert-danger" role="alert">
                {error.password}
              </div>
            ) : null}
            <br />
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                type="password"
                className="form-control"
              />
            </div>
            {error.confirmPassword ? (
              <div class="alert alert-danger" role="alert">
                {error.confirmPassword}
              </div>
            ) : null}
            <br />

            <button type="submit" className="btn btn-primary">
              Register
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

            <Link to="/login">Already have an account? Login here</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
