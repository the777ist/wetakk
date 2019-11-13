import React from "react";
import { Link } from "react-router-dom";
import MessageTimeline from "./MessageTimeline";

const Homepage = ({ currentUser }) => {
	if(!currentUser.isAuthenticated) {
		return(
			<div className="home-hero">
				<h1>Welcome to WeTakk</h1>
				<h3>A great place to connect with family and friends!</h3>
				<Link to="/signup" className="btn btn-primary btn-lg">Sign Up</Link>
			</div>
		);
	}
	return (
		<div>
			<MessageTimeline profileImageUrl={currentUser.user.profileImageUrl} username={currentUser.user.username} />
		</div>
	);
};

export default Homepage;
