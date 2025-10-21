import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ProductCard = ({ item }) => {
    const { product_id, quantity, title, price, image } = item;
    const { dispatch } = useGlobalReducer()
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}`;

    const handleRemoveFromCart = async () => {
        const token = localStorage.getItem("token");
        console.log("Trying to remove product_id:", product_id);
        console.log("Full item:", item);
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
            body: JSON.stringify({ productId: product_id }),
        });

        if (response.ok) {
            const cartResponse = await fetch(`${apiUrl}api/cart`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (cartResponse.ok) {
                const cartData = await cartResponse.json();
                const totalQuantity = cartData.cart?.reduce((total, item) => {
                    return total + item.quantity;
                }, 0) || 0;

                dispatch({ type: "update_cart_count", payload: totalQuantity });
            }

            window.location.reload();
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
                    <h4 className="border border-success">${price}</h4>
                </div>
            </div>
        </div>
    );
};

