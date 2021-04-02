import React from "react";
import Product from "../components/Product";
import Slider from "../components/Slider";
import "./Product.css";

const Home = () => {
  return (
    <div>
      <Slider />
      <h2 className="text-center py-3  all__products mb-5">All Products</h2>
      <Product />
    </div>
  );
};

export default Home;
