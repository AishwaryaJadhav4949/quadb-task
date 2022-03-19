import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HTMLReactParser from 'html-react-parser';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectedProduct
} from "../redux/actions/productsActions";
const ProductDetails = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.allProducts.product);
  const { name, summary, image} = product;
  
  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://api.tvmaze.com/shows/${id}`)

      .catch((err) => {
        console.log("Err: ", err);
      });
    // console.log(response.data)
    dispatch(selectedProduct(response.data));
  };
 

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);

  }, [productId]);
 
  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <>
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center" >
              <div className="col-md-5 text-center">
                <img src={image.medium} className='img-fluid' />
              </div>
              <div className="col-md-7">
                <h1 className="py-4">{name}</h1>
                <p>
                  {HTMLReactParser(summary)}
                </p>
                <Link to="/form">
                  <button type="button" class="btn btn-outline-secondary">
                    Book Now</button>

                </Link>
             
              </div>

            </div>
          </div>
       

        </>
      )}
    </div>
  );
};

export default ProductDetails;
