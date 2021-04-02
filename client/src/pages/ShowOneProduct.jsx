import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductHead from "../components/ProductHead";
import Axios from "axios";

const ShowOneProduct = () => {
  const {postId} = useParams();
  
  return (
    <div>
      <ProductHead 
     
      />
    </div>
  );
};

export default ShowOneProduct;
