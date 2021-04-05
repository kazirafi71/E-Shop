import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Axios from "axios";

const UpdateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const history = useHistory();

  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
     Axios.get(`/auth/user/${userId}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
    .then(result=>{
       
        const {firstName,
            lastName,
            email,
            role}=result.data.user
           setFirstName(firstName)
           setLastName(lastName)
           setEmail(email)
           setRole(role)
    })
    .catch(err=>{
        console.log(err)
    })

    //console.log(userInfo);
  }, []);

  const updateData = (e) => {
    e.preventDefault()
    setLoading(true)
    let info= {
        firstName,
        lastName,
        email,
        role

    }
    Axios.put(`/auth/user/${userId}`,info,
    {
        headers: {
          authorization: "Bearer " + localStorage.getItem("auth_token"),
        },

    }
    )
    .then(result=>{
        setLoading(false)
        setSuccess('Updated Success')
       console.log(result.data)
    })
    .catch(err=>{
        console.log(err)
    })
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-9">
            <div className="container">
              <div className="row ">
                <div className="mx-auto card p-5 my-5">
                  <form onSubmit={updateData}>
                    <h2 className="text-center">
                      Update User Information Here
                    </h2>
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
                      value={firstName}
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
                      value={lastName}
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
                      value={email}
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
                      <label>Role</label>
                      <input
                      value={role}
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <br />

                    <button type="submit" className="btn btn-primary">
                      Update
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
