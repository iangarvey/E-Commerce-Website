import { ProductCard } from "../components/ProductCard"
import { OrderSummary } from "../components/OrderSummary"

export const Cart = () => {
    return (
        <div className="cart-page-container d-flex justify-content-center">
            <div className="cart-container border d-flex" style={{ minHeight: "400px", width: "80%" }}>
                <div className="product-card-container" style={{ width: "65%" }}>
                    <ProductCard />
                </div>
                <div className="order-summary-container" style={{ width: "35%" }}>
                    <OrderSummary />
                </div>
            </div>
        </div>
    )
}