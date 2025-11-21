import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}`;
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

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

    const total = cartItems?.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0) || 0; // Default to 0 if cartItems is undefined

    const handleCheckoutSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const response = await fetch(`${apiUrl}api/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}) // No form data needed for demo
        });

        const data = await response.json();

        // Clear cart count in navbar
        dispatch({ type: 'update_cart_count', payload: 0 });

        alert(`Order placed successfully! Your order number is #${data.order_id}`);
        navigate("/"); // Go back to home page
    };

    return (
        <div className="page-container" border border-primary style={{ paddingTop: "70px" }}>
            <div className="checkout-container">
                <div className="title d-flex justify-content-center mb-2">
                    <h1>Checkout</h1>
                </div>
            </div>
            <div className="container d-flex">
                <div className="container" style={{ width: "70%" }}>
                    <div className="delivery-address-container border border-danger ms-5 me-5 mb-5 mt-3">
                        <h3 className="container d-flex justify-content-center mt-3">
                            Delivery Address
                        </h3>
                        <form>
                            <div className="m-3">
                                <label for="name" className="form-label">Name</label>
                                <input type="name" className="form-control" id="inputName" aria-describedby="nameHelp"></input>
                            </div>
                            <div className="m-3" style={{ width: "30%" }}>
                                <label for="phoneNumber" className="form-label">Phone Number</label>
                                <input type="phoneNumber" className="form-control" id="phoneNumber"></input>
                            </div>
                            <div className="m-3" style={{ width: "80%" }}>
                                <label for="address" className="form-label">Street Address</label>
                                <input type="address" className="form-control" id="address"></input>
                            </div>
                            <div className="mailing-address-container d-flex justify-content-around">
                                <div className="m-3">
                                    <label for="city" className="form-label">city</label>
                                    <input type="city" className="form-control" id="city"></input>
                                </div>
                                <div className="m-3">
                                    <label for="state" className="form-label">state</label>
                                    <input type="state" className="form-control" id="state"></input>
                                </div>
                                <div className="m-3">
                                    <label for="zipCode" className="form-label">Zip Code</label>
                                    <input type="zipCode" className="form-control" id="zipCode"></input>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="payment-info-container border border-success m-5">
                        <div className="container d-flex justify-content-center mt-3">
                            <h3>Payment</h3>
                        </div>
                        <form>
                            <div className="m-3">
                                <label for="cardNumber" className="form-label">Card Number</label>
                                <input type="cardNumber" className="form-control" id="cardNumber" aria-describedby="cardNumberHelp"></input>
                            </div>
                            <div className="m-3" style={{ width: "30%" }}>
                                <label for="nameOnCard" className="form-label">Name On Card</label>
                                <input type="nameOnCard" className="form-control" id="nameOnCard"></input>
                            </div>
                            <div className="m-3" style={{ width: "80%" }}>
                                <label for="expirationDate" className="form-label">Expiration Date</label>
                            </div>
                            <div className="mailing-address-container d-flex">
                                <div className="m-3">
                                    <label for="month" className="form-label">Month</label>
                                    <input type="month" className="form-control" id="month"></input>
                                </div>
                                <div className="m-3">
                                    <label for="year" className="form-label">Year</label>
                                    <input type="year" className="form-control" id="year"></input>
                                </div>
                            </div>
                            <div className="m-3" style={{ width: "20%" }}>
                                <label for="CVV" className="form-label">CVV</label>
                                <input type="CVV" className="form-control" id="CVV"></input>
                            </div>
                            <div className="button-container d-flex justify-content-center mb-3">
                                <button type="submit" className="btn btn-primary" onClick={handleCheckoutSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="order-summary-container border border-warning mt-3" style={{ width: "40%" }}>
                    <h1>Order Summary</h1>
                    {cartItems.map((item, index) => (
                        <OrderSummaryCard key={index} item={item} />
                    ))}
                    <div className="total-container border-top mt-3 pt-3">
                        <h4>Total: ${total.toFixed(2)}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

const OrderSummaryCard = ({ item }) => {
    const { title, price, quantity } = item;

    const itemTotal = item.price * item.quantity || 0;

    return (
        <div className="order-summary-card-container border border-primary d-flex justify-content-center m-2">
            <div className="title-and-price w-100 border border-primary">
                <h5 className="title border border-danger m-1">{title}</h5>
                <h5 className="price border border-danger m-1">${itemTotal} = ${price} x {quantity}</h5>
            </div>
        </div>
    );
};