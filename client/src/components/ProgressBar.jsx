import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import './ProgressBar.scss';
import PropTypes from 'prop-types';

function ProgressBar({ status }) {
	const { current, total } = status;
	const progressMax = Math.round((current / total) * 100) - 5;
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		setProgress(Math.round(((current - 1) / total) * 100));
		const diff = 0.55;
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				return Math.min(oldProgress + diff, progressMax);
			});
		}, 500);

        return () => {
            clearInterval(timer);
        };
	}, [current]);

	return (
		<div className="cmp-progress__wrapper">
            <LinearProgress variant="determinate" value={progress} />
		</div>
	);
}

export default ProgressBar;

ProgressBar.propTypes = {
	status: PropTypes.object
};
