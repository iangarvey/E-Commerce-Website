import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "../components/Carousel";

export const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}`;
  const navigate = useNavigate();

  useEffect(() => {
    const getCategoryProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        console.error("Failed to fetch products");
        setLoading(false);
        return;
      }
      const allProducts = await response.json();
      const categoryProducts = allProducts.filter(
        (product) =>
          product.category.toLowerCase().replace(/[^a-z0-9]/g, "") ===
          category.toLowerCase()
      );
      setProducts(categoryProducts);
      setLoading(false);
    };
    getCategoryProducts();
  }, [category]);

  const handleProductDetailsClick = (productId, productTitle) => {
    const formattedProduct = productTitle.toLowerCase().replace(/[^a-z0-9]/g, "");
    navigate(`/product/${productId}/${formattedProduct}`);
  };

  const handleAddToCart = async (productId, productTitle) => {
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
    console.log("Dispatching cartUpdate event...");
    window.dispatchEvent(new Event("cartUpdate"));
    alert(`${productTitle} has been added to your cart!`);

    return (
      // < !--Example split danger button-- >
      <div class="btn-group">
        <button type="button" class="btn btn-danger">Danger</button>
        <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
          <li><hr class="dropdown-divider"></hr></li>
          <li><a class="dropdown-item" href="#">Separated link</a></li>
        </ul>
      </div>
    )
  }

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
      className="banner d-flex border border-danger mt-4 mb-5"
      style={{ maxHeight: "600px", overflow: "hidden", width: "100%" }}
    >
      <Carousel specificCategory={category} />
    </div>

    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
      {products.map((product) => (
        <div key={product.id} className="col m-3">
          <div
            className="card h-100 shadow-sm"
            style={{ cursor: "pointer" }}
          // onClick={() => handleCategoryClick(product.category)}
          >
            <img
              src={product.image}
              className="card-img-top p-3"
              alt={`${product.title} title`}
              style={{
                height: "200px",
                objectFit: "contain",
                backgroundColor: "#f8f9fa",
              }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-capitalize">${product.price}</h5>
              <p className="card-price text-muted small">{product.title}</p>
              <div className="buttons d-flex mt-auto">
                <button
                  className="btn btn-success w-100 me-2"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    handleAddToCart(product.id, product.title);
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-warning w-100"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    handleProductDetailsClick(product.id, product.title);
                  }}
                >
                  Product Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};
