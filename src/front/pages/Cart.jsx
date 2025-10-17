import { ProductCard } from "../components/ProductCard"
import { OrderSummary } from "../components/OrderSummary"
import { useEffect, useState } from "react";

export const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}`;

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log in to view your cart.");
                return;
            }

            const response = await fetch(`${apiUrl}api/cart`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCartItems(data.cart); 
                console.log("Cart items:", data.cart);
            } else {
                alert("Failed to fetch cart items. Please try again.");
            }
        };
        fetchCartItems();
    }, []);

    return (
        <div className="cart-page-container d-flex justify-content-center" style={{ marginTop: "100px"}}>
            <div className="cart-container border d-flex" style={{ minHeight: "400px", width: "80%" }}>
                <div className="product-card-container" style={{ width: "65%" }}>
                    {cartItems.map((item) => (
                        <ProductCard
                            key={item.id}
                            productId={item.product_id}
                            quantity={item.quantity}
                            image={item.image}
                        />
                    ))}
                </div>
                <div className="order-summary-container" style={{ width: "35%" }}>
                    <OrderSummary />
                </div>
            </div>
        </div>
    )
}