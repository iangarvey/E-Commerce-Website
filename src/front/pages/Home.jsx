import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	return (
		<>
			<div className="banner border border-danger mt-4" style={{height: "300px"}}>
				<h2>Banner Image</h2>
			</div>
			<div className="tabs">
				<h2>Tabs</h2>
			</div>
		</>
	);
}; 