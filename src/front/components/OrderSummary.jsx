export const OrderSummary = () => {

    const OrderSummaryCard = () => {
        return (
            <div className="order-summary-card-container border border-primary d-flex justify-content-center">
                <div className="image m-1" style={{ height: "90px", width: "120px" }}>
                    <h5 className="border border-danger">image</h5>
                </div>
                <div className="title-and-price w-100 border border-primary">
                    <h5 className="title border border-danger m-1">Title</h5>
                    <h5 className="price border border-danger m-1">Price</h5>
                </div>
            </div>
        )
    }

    return (
        <div className="order-summary-container border border-primary">
            <h1>Order Summary</h1>
            <OrderSummaryCard />
            <div div className="total-container d-flex justify-content-center">
                <h2>Total: $00.00</h2>
            </div>
            <div className="checkout-button-container d-flex justify-content-center">
                <button className="btn btn-success">Checkout</button>
            </div>
        </div>

    )
}