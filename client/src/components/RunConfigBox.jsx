import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Slider, Button } from '@mui/material';

import './RunConfigBox.scss';

function RunConfigBox({ handleFormSubmit, submitDisabled }) {
	const refURL = useRef(null);
	const refNumRuns = useRef(null);

	function handleKeyDown(ev) {
		if (ev.key === 'Enter') {
			handleFormSubmit(ev);
		}
	}

	function valuetext(value) {
		return `${value} run(s)`;
	}

	return (
		<Box className="cmp-runconfigbox">
			<form onKeyDown={handleKeyDown}>
				<TextField
					ref={refURL}
					label="Enter URL to test"
					variant="filled"
					className="input__wrapper"
				/>
				<span>Number of runs (1 to 10)</span>
				<Slider
					aria-label="Number of runs"
					defaultValue={3}
					getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
					shiftStep={3}
					step={1}
					marks
					min={1}
					max={10}
					ref={refNumRuns}
				/>
				<div className="device-section__wrapper section__wrapper">
					<label>Device:</label>
					<input
						type="radio"
						id="device-mobile"
						className="device-section__radio-button"
						name="device"
						value="mobile"
						defaultChecked
					></input>
					<label htmlFor="device-mobile">mobile</label>
					<input
						type="radio"
						id="device-desktop"
						className="device-section__radio-button"
						name="device"
						value="desktop"
					></input>
					<label htmlFor="device-desktop">desktop</label>
				</div>
				<div className="button-section__wrapper section__wrapper">
					<Button
						variant="contained"
						disabled={submitDisabled}
						onClick={(ev) => handleFormSubmit(ev)}
					>
						Run Tests
					</Button>
				</div>
			</form>
		</Box>
	);
}

export default RunConfigBox;

RunConfigBox.propTypes = {
	handleFormSubmit: PropTypes.func,
    submitDisabled: PropTypes.bool 
};
