export const Carousel = () => {

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            // Get unique categories
            const categories = [...new Set(products.map(product => product.category))];

            console.log(categories);
        })
        .catch(error => console.error('Error:', error));

    return (
        <div>
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="..." className="d-block w-100" alt="..."></img>
                    </div>
                    <div className="carousel-item">
                        <img src="..." className="d-block w-100" alt="..."></img>
                    </div>
                    <div className="carousel-item">
                        <img src="..." className="d-block w-100" alt="..."></img>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}