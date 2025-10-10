import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Carousel } from "../components/Carousel.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getFirstProductPerCategory = (products) => {
    const categoryMap = new Map();

    products.forEach((product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, {
          image: product.image,
          category: product.category,
          title: product.title,
          id: product.id,
          price: product.price,
        });
      }
      console.log(product.category);
    });

    return Array.from(categoryMap.values());
  };

  const fetchCategoryImages = async () => {
    setLoading(true);

    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    const firstProductsByCategory = getFirstProductPerCategory(data);

    setCategoryProducts(firstProductsByCategory);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryImages();
  }, []);

  const handleShopCategoryClick = (category) => {
    const formattedCategory = category.toLowerCase().replace(/[^a-z0-9]/g, '');
    navigate(`/${formattedCategory}`);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="banner d-flex border border-danger mt-4"
        style={{ maxHeight: "600px", overflow: "hidden", width: "100%" }}
      >
        <Carousel />
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4">Shop by Category</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
          {categoryProducts.map((product) => (
            <div key={product.category} className="col">
              <div
                className="card h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => handleShopCategoryClick(product.category)}
              >
                <img
                  src={product.image}
                  className="card-img-top p-3"
                  alt={`${product.category} category`}
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    backgroundColor: "#f8f9fa",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-capitalize">
                    {product.category}
                  </h5>
                  <p className="card-text text-muted small">
                    Featured: {product.title}
                  </p>
                  <div className="mt-auto">
                    <button
                      className="btn btn-primary w-100"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        handleShopCategoryClick(product.category);
                      }}
                    >
                      shop {product.category}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
