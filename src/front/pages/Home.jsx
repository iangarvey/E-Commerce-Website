import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ProductCard from "../components/ProductCard.jsx";

export const Home = () => {

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
			<div className="banner border border-danger mt-4" style={{ height: "300px" }}>
				<h2>Banner Image</h2>
			</div>
			<div className="container">
				<div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 d-flex justify-content-evenly mt-4">
					<div className="col">
						<ProductCard />
					</div>
					<div className="col">
						<ProductCard />
					</div>
					<div className="col">
						<ProductCard />
					</div>
					<div className="col">
						<ProductCard />
					</div>
				</div>
			</div>
		</div>
	);
}; 