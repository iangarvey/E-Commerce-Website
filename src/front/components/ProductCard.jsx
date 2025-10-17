import { useEffect, useState } from "react";

export const ProductCard = ({ productId, quantity }) => {
    const [title, setTitle] = useState("Product Title");
    const [price, setPrice] = useState("00.00");
    const [image, setImage] = useState("https://via.placeholder.com/150");
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}`;

    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            if (response.ok) {
                const data = await response.json();
                setTitle(data.title);
                setPrice(data.price);
                setImage(data.image);
            } else {
                alert("Failed to fetch product details. Please try again.");
            }
        };
        fetchProductDetails();
    }, [productId]);

    const handleRemoveFromCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to remove items from your cart.");
            return;
        }

        const response = await fetch(`${apiUrl}api/remove-from-cart`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId }),
        });

        if (response.ok) {
            alert(`${title} has been removed from your cart!`);
            // Notify navbar to update count
            window.dispatchEvent(new Event("cartUpdate"));
            // Refresh the cart page
            window.location.reload();
        } else {
            alert("Failed to remove item from cart. Please try again.");
        }
    };

    return (
        <div className="product-card-container d-flex border border-primary">
            <div className="product-image border border-danger m-2" style={{ minHeight: "200px", minWidth: "200px" }}>
                <img src={image} alt={title} style={{ height: "200px", width: "200px", objectFit: "contain" }} ></img>
            </div>
            <div className="details-container d-flex w-100" style={{ height: "30px" }}>
                <div className="title-quantity-remove border m-2">
                    <h4 className="border border-danger">{title}</h4>
                    <h4 className="border border-danger">{quantity}</h4>
                    <button className="btn btn-danger" onClick={handleRemoveFromCart}>Remove</button>
                </div>
                <div className="price ms-auto mt-2 me-2">
                    <h4 className="border border-success">{price}</h4>
                </div>
            </div>
        </div>
    );
};

