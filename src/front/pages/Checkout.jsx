import { OrderSummary } from "../components/OrderSummary"

export const Checkout = () => {
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
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="order-summary-container mt-3" style={{ width: "40%" }}>
                    <OrderSummary />
                </div>
            </div>
        </div>
    )
}