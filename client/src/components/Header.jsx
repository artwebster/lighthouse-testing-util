import { Divider } from "@mui/material";

import "./Header.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Header({ isAuthenticated, user }) {
	return (
		<>
			<header>
				<Link to="/">
					<h1>Lighthouse Runner</h1>
				</Link>
				<div className="header__signin">
					{isAuthenticated ? <p>Welcome, {user}</p> : <Link to="/signin">Sign In</Link>}
				</div>
			</header>
			<Divider flexItem />
		</>
	);
}

export default Header;

Header.propTypes = {
	isAuthenticated: PropTypes.bool,
    user: PropTypes.string
};