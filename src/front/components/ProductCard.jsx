export const ProductCard = () => {
    

    return (
        <div className="product-card-container d-flex border border-primary">
            <div className="product-image border border-danger m-2" style={{ minHeight: "200px", minWidth: "200px" }}>
                <h2>image</h2>
            </div>
            <div className="details-container d-flex w-100" style={{ height: "30px"}}>
                <div className="title-quantity-remove border m-2">
                    <h4 className="border border-danger">Product Title </h4>
                    <h4 className="border border-danger">Quantity: 0</h4>
                    <button className="btn btn-danger">Remove</button>
                </div>
                <div className="price ms-auto mt-2 me-2"> 
                    <h4 className="border border-success">$00.00</h4>
                </div>
            </div>
        </div>
    );
};

