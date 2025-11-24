import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useGlobalReducer();
  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}`;


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Failed to fetch product data", err));
  }, [productId]);

  if (!product) {
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

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }
    const response = await fetch(`${apiUrl}api/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    if (!response.ok) {
      alert("Failed to add item to cart. Please try again.");
      return;
    }
    const cartResponse = await fetch(`${apiUrl}api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (cartResponse.ok) {
      const cartData = await cartResponse.json()
      const totalQuantity = cartData.cart?.reduce((total, item) => {
        return total + item.quantity;
      }, 0) || 0;

      dispatch({ type: "update_cart_count", payload: totalQuantity })
    }
    dispatch({ type: "open_cart_dropdown" })
  }

  return (
    <div className="container d-flex p-0 border border-danger" style={{margin: "50px", marginTop: "120px"}}>
      <div
        className="product-image border border-success m-5 d-flex justify-content-center align-items-center"
        style={{ height: "500px", width: "40%", backgroundColor: "lightgrey" }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{ height: "500px", width: "500px", objectFit: "contain" }}
        />
      </div>
      <div className="product-details m-5">
        <div className="title border border-warning mb-3">{product.title}</div>
        <div className="category border border-warning mb-3">
          {product.category}
        </div>
        <div className="price border border-warning mb-3">${product.price}</div>
        <div className="description border border-warning">
          {product.description}
        </div>
        <div className="button-container d-flex justify-content-center">
          <button className="btn btn-primary text-center mt-5" style={{ width: "120px" }} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};
