import { Link } from "react-router-dom";

export const OrderSummary = ({ cartItems }) => {

    // Add safety check for undefined cartItems
    const total = cartItems?.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0) || 0; // Default to 0 if cartItems is undefined


    return (
        <div className="order-summary-container border border-primary">
            <h1>Order Summary</h1>
            
            {/* Map through cartItems instead of single OrderSummaryCard */}
            {cartItems?.map(item => (
                <OrderSummaryCard key={item.id} item={item} />
            ))}
            
            <div className="total-container d-flex justify-content-center">
                <h2>Total: ${total.toFixed(2)}</h2>
            </div>
            <Link to="/checkout" className="checkout-button-container d-flex justify-content-center">
                <button className="btn btn border border-primary mb-1" style={{ color: "blue", backgroundColor: "lightblue"}}>Checkout</button>
            </Link>
        </div>
    );
};

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