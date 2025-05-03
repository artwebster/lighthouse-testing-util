import { Breadcrumbs } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './BreadCrumbs.scss';

function BreadCrumbsSection() {
	return (
		<Breadcrumbs>
			<NavLink to="/pages" className={({ isActive }) => (isActive ? 'breadcrumb--active' : undefined)}>
				Pages
			</NavLink>
			<NavLink to="/tests" className={({ isActive }) => (isActive ? 'breadcrumb--active' : undefined)}>
				Tests
			</NavLink>
			<NavLink to="/test" className={({ isActive }) => (isActive ? 'breadcrumb--active' : undefined)}>
				Test
			</NavLink>
		</Breadcrumbs>
	);
}

export default BreadCrumbsSection;
