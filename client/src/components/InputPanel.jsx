import PropTypes from "prop-types";
import "./InputPanel.scss";
import RunConfigBox from "./RunConfigBox";

function InputPanel({ handleFormSubmit, submitDisabled }) {
	return (
		<div className="cmp-input-panel">
			<div className="intro-section__wrapper">
				<p>
					Welcome to the Lighthouse Runner! To run a test, please fill out the fields
					below.
				</p>
			</div>
			<RunConfigBox handleFormSubmit={handleFormSubmit} submitDisabled={submitDisabled} />
		</div>
	);
}

export default InputPanel;

InputPanel.propTypes = {
	handleFormSubmit: PropTypes.func,
	submitDisabled: PropTypes.bool,
};
