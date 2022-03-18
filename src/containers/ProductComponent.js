import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product) => {
    const { score, show} = product;
    return (
      <div className="four wide column" key={show.id}>
        <Link to={`/product/${show.id}`}>
          <div className="ui link cards">
            <div className="card">
              <div className="image">
                <img src={show.image.original} alt={show.name} />
              </div>
              <div className="content">
                <div className="header">{show.name}</div>
                <div className="meta price"> {show.premiered}</div>
                <div className="meta">{show.language}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });
  return <>{renderList}</>;
};

export default ProductComponent;
