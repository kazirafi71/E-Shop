import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AlertComp from "../components/AlertComp";
import Spinner from "../components/Spinner";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const EditProduct = () => {
  const classes = useStyles();
  const [pic, setPic] = useState("");
  const [product_name, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [product_category, setProductCategory] = useState("");
  const [getCtg, setGetCtg] = useState([]);

  const formData = new FormData();
  formData.append("img", pic);
  formData.append("price", price);
  formData.append("product_name", product_name);
  formData.append("quantity", quantity);
  formData.append("product_category", product_category);
  formData.append("description", description);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const {postId}=useParams()
  console.log(postId)

  const updateProductHandler = (e) => {
    e.preventDefault();
    setLoading(true)

    Axios.put(`/admin/product/update-product/${postId}`, formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
    
      .then((result) => {
        console.log(result)
        setLoading(false)
        setError(false)
        setSuccess('Your product created')
      })
      .catch((err) => {
       //console.log(err)
        setLoading(false)
        setSuccess(null)
        setError(err.response.data.error)
      });
  };

  useEffect(() => {
    Axios.get("/category/get-category", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
   
      .then((result) => {
        console.log(result.data.getCategory);
        setGetCtg(result.data.getCategory);
      })
      .catch((error) => {
        console.log(error.response);
      })

      fetch(`/admin/product/edit-product/${postId}`,{
          method:'get',
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
      })
      .then(res=>res.json())
      .then(result=>{
          console.log(result.result)
          setPrice(result.result.price)
          setQuantity(result.result.quantity)
          setDescription(result.result.description)
          setProductName(result.result.product_name)
          
      })
      .catch(err=>{
          console.log(err)
      })

      
  }, [])

  return (
    <div>
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-9">
              <Container className="mt-5">
                <Paper className="p-4 ">
                  <form
                    autoComplete="off"
                    enctype="multipart/form-data"
                    onSubmit={updateProductHandler}
                  >
                    <Typography variant="h5" className="text-center py-3">
                      Add Your Product
                    </Typography>
                    {error ? (
                      <AlertComp text={error} alert_info="alert-danger" />
                    ) : null}
                    {success ? (
                      <AlertComp text={success} alert_info="alert-success" />
                    ) : null}
                    {loading && <Spinner />}
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Add Product Name
                      </label>
                      <input
                      value={product_name}
                      maxLength='50'
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Add Product Name"
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Add Product Quantity
                      </label>
                      <input
                      value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Add Product Quantity"
                        min="0"
                        type="number"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Add Product Price
                      </label>
                      <input
                      value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Add Product Price"
                        min="0"
                        type="number"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div class="form-group mb-3">
                      <label for="exampleFormControlSelect1">
                        Choose Category
                      </label>
                      <select
                      value={product_category}
                        onChange={(e) => setProductCategory(e.target.value)}
                        class="form-control"
                        id="exampleFormControlSelect1"
                      >
                        {getCtg.map((val) => {
                          return (
                            <option key={val._id} value={val._id}>
                              {val.categoryName}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="form-floating mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Add Product Description
                      </label>
                      <textarea
                      value={description}
                      maxlength="200"
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        placeholder="Add your product description"
                        id="floatingTextarea2"
                      ></textarea>
                    </div>
                    <label htmlFor="">Upload your product image</label>
                    <input
                   
                      filename="img"
                      onChange={(e) => setPic(e.target.files[0])}
                      className="form-control form-control-sm"
                      id="formFileSm"
                      type="file"
                    />

                    <button className="btn btn-primary mt-3">
                      Update Product
                    </button>
                  </form>
                </Paper>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
