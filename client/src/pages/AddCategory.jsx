import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Axios from "axios";
import Spinner from "../components/Spinner";
import AlertComp from "../components/AlertComp";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const addCategoryHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/category/add-category", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({
        categoryName,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.error) {
          setSuccess(false);
          return setError(result.error);
        }
        setError(null);
        setSuccess("Category created");
      })
      .catch((error) => {
        setLoading(false);
        setSuccess(false);

        console.log(error);
      });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-9">
            <Container className="mt-5">
              <Paper className="p-4 ">
                <form onSubmit={addCategoryHandler}>
                  <Typography variant="h5" className="text-center py-4">
                    Add Category
                  </Typography>
                  <div className="text-center mb-3">
                    {error ? (
                      <AlertComp text={error} alert_info="alert-danger" />
                    ) : null}
                    {success ? (
                      <AlertComp text={success} alert_info="alert-success" />
                    ) : null}
                    {loading && <Spinner />}
                  </div>

                  <TextField
                    onChange={(e) => setCategoryName(e.target.value)}
                    fullWidth
                    id="outlined-basic"
                    label="Category"
                    variant="outlined"
                    placeholder="Add Category"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="mt-4"
                  >
                    Add Category
                  </Button>
                </form>
              </Paper>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
