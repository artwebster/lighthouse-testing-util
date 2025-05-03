import { Divider, Button } from '@mui/material';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ isAuthenticated, user, logout }) {
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<>
			<header>
				<Link to="/">
					<h1>Lighthouse Runner</h1>
				</Link>
				<div className="header__signin">
					{
						isAuthenticated ?
							<>
								<p>Welcome, {user}! </p>
								<Button
									variant="contained"
									disableElevation
									size="small"
									color="error"
									onClick={handleLogout}
								>
									Logout
								</Button>
							</>
							// :	<Link to="/signin">Sign In</Link>}
						:	<Button variant="contained" disableElevation size="small" href="/signin">
								Login
							</Button>

					}
				</div>
			</header>
			<Divider flexItem />
		</>
	);
}

export default Header;

Header.propTypes = {
	isAuthenticated: PropTypes.bool,
	user: PropTypes.string,
	logout: PropTypes.func
};
