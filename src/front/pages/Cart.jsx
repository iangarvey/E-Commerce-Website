import { ProductCard } from "../components/ProductCard";
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
                console.log("Cart items:", data.cart);
                const cartItemsWithDetails = await Promise.all(
                    data.cart.map(async (item) => {
                        const productResponse = await fetch(`https://fakestoreapi.com/products/${item.product_id}`);

                        if (productResponse.ok) {
                            const productData = await productResponse.json();

                            return {
                                ...item,
                                title: productData.title,
                                price: productData.price,
                                image: productData.image
                            };
                        } else {
                            // Fallback if product fetch fails
                            return {
                                ...item,
                                title: "Product",
                                price: 0,
                                image: "https://via.placeholder.com/150"
                            };
                        }
                    })
                );
                setCartItems(cartItemsWithDetails);
            } else {
                alert("Failed to fetch cart items. Please try again.");
            }
        };
        fetchCartItems();
    }, []);

    return (
        <div className="cart-page-container d-flex justify-content-center" style={{ marginTop: "100px" }}>
            <div className="cart-container border d-flex" style={{ minHeight: "400px", width: "80%" }}>
                <div className="product-card-container" style={{ width: "65%" }}>
                    {cartItems.map((item) => (
                        <ProductCard
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>
                <div className="total-container" style={{ width: "35%" }}>
                    <OrderSummary cartItems={cartItems} />
                </div>
            </div>
        </div>
    )
}
