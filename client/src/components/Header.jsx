import { Divider } from "@mui/material";

import "./Header.scss"

function Header() {
	return (
		<>
			<header>
				<h1>Lighthouse Runner</h1>
				<div className="header__signin">
					<p>Sign In</p>
				</div>
			</header>
			<Divider flexItem />
		</>
	);
}

export default Header;
