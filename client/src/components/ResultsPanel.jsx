import PropTypes from "prop-types";
import "./ResultsPanel.scss";

function ResultsPanel({ resultsData }) {
	const { overall, FCP, LCP, TBT, CLS, SI } = resultsData.medianResult;

	let outcomeOverall = "poor";
	if (overall > 50) outcomeOverall = "average";
	if (overall > 89) outcomeOverall = "good";

	let outcomeFCP = "poor";
	if (FCP < 3) outcomeFCP = "average";
	if (FCP < 1.8) outcomeFCP = "good";

	let outcomeLCP = "poor";
	if (LCP < 4) outcomeLCP = "average";
	if (LCP < 2.5) outcomeLCP = "good";

	let outcomeTBT = "poor";
	if (TBT < 600) outcomeTBT = "average";
	if (TBT < 200) outcomeTBT = "good";

	let outcomeCLS = "poor";
	if (CLS < 0.25) outcomeCLS = "average";
	if (CLS < 0.1) outcomeCLS = "good";

	let outcomeSI = "poor";
	if (SI < 5.8) outcomeSI = "average";
	if (SI < 3.4) outcomeSI = "good";

	return (
		<div className="cmp-results-panel">
			<div className="cmp-results-panel__wrapper">
				<div className="cmp-results-panel__overall">
					<div className="lh-category-headercol">
						<div className="lh-score__gauge" role="heading" aria-level={2}>
							<div className={`lh-gauge__wrapper lh-score--${outcomeOverall}`}>
								<div className="lh-gauge__svg-wrapper">
									<svg className="lh-gauge" viewBox="0 0 120 120">
										<circle
											className="lh-gauge-base"
											r="56"
											cx="60"
											cy="60"
											strokeWidth="8"
										></circle>
										<circle
											className="lh-gauge-arc"
											r="56"
											cx="60"
											cy="60"
											strokeWidth="8"
											style={{
												transform: "rotate(-87.9537deg)",
												strokeDasharray: `${(overall * 348) / 100}`,
											}}
										></circle>
									</svg>
								</div>
								<div className="lh-gauge__percentage">{overall}</div>
								<div className="lh-gauge__label">Performance</div>
							</div>
						</div>
					</div>
				</div>
				<div className="cmp-results-panel__metrics">
					<div className="cmp-results-panel__metric">
						<p>First Contentful Paint</p>
						<span className={`cmp-results-panel__metric-score lh-score--${outcomeFCP}`}>
							{resultsData.medianResult.FCP} s
						</span>
					</div>
					<div className="cmp-results-panel__metric">
						<p>Largest Contentful Paint</p>
						<span className={`cmp-results-panel__metric-score lh-score--${outcomeLCP}`}>
							{resultsData.medianResult.LCP} s
						</span>
					</div>
					<div className="cmp-results-panel__metric">
						<p>Total Blocking Time</p>
						<span className={`cmp-results-panel__metric-score lh-score--${outcomeTBT}`}>
							{resultsData.medianResult.TBT} ms
						</span>
					</div>
					<div className="cmp-results-panel__metric">
						<p>Cumulative Layout Shift</p>
						<span className={`cmp-results-panel__metric-score lh-score--${outcomeCLS}`}>
							{resultsData.medianResult.CLS}
						</span>
					</div>
					<div className="cmp-results-panel__metric">
						<p>Speed Index</p>
						<span className={`cmp-results-panel__metric-score lh-score--${outcomeSI}`}>
							{resultsData.medianResult.SI} s
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ResultsPanel;

ResultsPanel.propTypes = {
	resultsData: PropTypes.object,
};
