import React from "react";
import { useState } from "react";

const Createpost = () => {
  const [pic, setPic] = useState();
  console.log(pic)

  const setFormData=()=>{
  const data = new FormData();
    data.append("avatar", pic);

    fetch('/product/hello',{
        method:"post",
        body: data,
    })
    .then((res) => res.json())
      .then((result) => {
          console.log(result)
      })
    }
    
  return (
    <div>
      <form enctype="multipart/form-data" onSubmit={(e)=>{
          e.preventDefault()
          setFormData()
      }}>
        <input
          onChange={(e) => {
            setPic(e.target.files[0]);
          }}
          type="file"
          name="avatar"
        />
        <input type="submit" value="submit"/>
      </form>
    </div>
  );
};

export default Createpost;
