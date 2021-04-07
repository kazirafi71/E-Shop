import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Axios from "axios";
import {useSelector,useDispatch} from 'react-redux'
import {productAction} from '../redux'


const Test = () => {

  //const data = useSelector(state => console.log(state.product))
  


  const dispatch=useDispatch()

  const [search, setSearch] = useState("");
  const [result,setResult]=useState([])

  useEffect(()=>{

    dispatch(productAction())

  },[])

  useEffect(() => {
    //console.log(search);
    Axios.post("/product/search-product", {
      query: search,
    })
      .then((res) => {
        console.log(res.data.pro);
        setResult(res.data.pro)
        dispatch({type: 'GET_PRODUCT', payload:res.data.pro })
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        options={result}
        
        getOptionLabel={(option) => (
          
          option.product_name
          
          )}
        //style={{ width: 200 }}
        renderInput={(params) => (
          <TextField
          color='primary'
          className='mx-2'
            onChange={(e) => setSearch(e.target.value)}
            {...params}
            label="Search for product"
            variant='standard'
          />
        )}
      />
    </div>
  );
};

export default Test;
