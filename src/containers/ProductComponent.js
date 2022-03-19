import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product) => {
    const { score, show} = product;
    return (
      <div className="four wide column" key={show.id}>
       
<div className="ui link cards d-flex align-items-center 
justify-content-center">
            <div className="card">
              <div className="image">
                <img src={show.image.original} alt={show.name} />
              </div>
              <div className="pt-4 pb-3 px-4 d-flex align-items-center
              justify-content-between">
                <div className="header">{show.name}</div>
                
                <div className="meta">{show.language}</div>
              </div>
              <div  className="pt-2 pb-3 px-4 d-flex align-items-center
              justify-content-between">
 <div className="meta price"> {show.premiered}</div>
              <Link to={`/product/${show.id}`}>
              <button type="button" class="btn btn-outline-secondary">
               Summary</button>
             </Link>
              </div>
              
            </div>
        
           </div>
          
      
      </div>
    );
  });
  return <>{renderList}</>;
};

export default ProductComponent;
