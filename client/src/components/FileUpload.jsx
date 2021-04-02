import React, { useEffect, useState } from "react";
import Axios from "axios";


const FileUpload = () => {
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [res,setRes]=useState([])

  console.log(pic);
  console.log(res)

  const formData = new FormData();

  formData.append("name", name);
  formData.append("img", pic);

  const onFormData = (e) => {
    e.preventDefault();
    Axios.post("/file-upload", formData)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  useEffect(()=>{

    Axios.get("http://localhost:5000/file")
    .then((result) => setRes(result.data.result))
    .catch((err) => console.log(err));

  },[])
  return (
    <div>
      <h2 className="mb-5">File upload</h2>

      <form  onSubmit={onFormData} enctype="multipart/form-data">
       
        <div className="mb-3">
          <label for="formFileSm" className="form-label">
            Small file input example
          </label>
          <input
            filename="img"
            onChange={(e) => setPic(e.target.files[0])}
            className="form-control form-control-sm"
            id="formFileSm"
            type="file"
          />
        </div>
        <button  className="btn btn-primary mb-3">
          Submit
        </button>
      </form>

      {
          res &&
          res.map(val=>{
              console.log(val)
              return(<img className='w-25 h-25' src={val.image} alt="" srcset=""/>)
          })
      }

     
    </div>
  );
};

export default FileUpload;