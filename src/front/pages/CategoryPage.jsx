import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "../components/Carousel";

export const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category } = useParams();

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
            const categoryProducts = allProducts.filter(product =>
                product.category.toLowerCase().replace(/[^a-z0-9]/g, '') === category.toLowerCase()
            );
            setProducts(categoryProducts);
            setLoading(false);
        }
        getCategoryProducts();
    }, [category]);

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
                <Carousel />
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
                                <h5 className="card-title text-capitalize">
                                    ${product.price}
                                </h5>
                                <p className="card-price text-muted small">
                                    {product.title}
                                </p>
                                <div className="buttons d-flex mt-auto">
                                    <button
                                        className="btn btn-success w-100 me-2"
                                    //   onClick={(e) => {
                                    //     e.stopPropagation(); // Prevent card click
                                    //     handleCategoryClick(product.category);
                                    //   }}
                                    >
                                        Buy Now!
                                    </button>
                                    <button
                                        className="btn btn-warning w-100"
                                    //   onClick={(e) => {
                                    //     e.stopPropagation(); // Prevent card click
                                    //     handleCategoryClick(product.category);
                                    //   }}
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
    )
}