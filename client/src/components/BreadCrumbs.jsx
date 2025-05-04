import { Breadcrumbs } from '@mui/material';
import { matchPath, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import './BreadCrumbs.scss';

function BreadCrumbsSection() {
	const location = useLocation();
	const [searchParams] = useSearchParams();

	// check if we are on /test/:testId route and grab param
	const match = matchPath('/test/:testId', location.pathname);
	const testId = match ? match.params.testId : null;
	// therefore, if were on a test page, when we click on 'tests' it will go back to the filtered view
	const urlParam = searchParams.get('url');
	const testsLink = testId && urlParam ? `/tests?url=${encodeURIComponent(urlParam)}` : '/tests';

	return (
		<Breadcrumbs>
			<NavLink to="/pages" className={({ isActive }) => (isActive ? 'breadcrumb--active' : undefined)}>
				Pages
			</NavLink>
			<NavLink to={testsLink} className={({ isActive }) => (isActive ? 'breadcrumb--active' : undefined)}>
				Tests
			</NavLink>
			{testId && <span>Test #{testId}</span>}
		</Breadcrumbs>
	);
}

export default BreadCrumbsSection;
