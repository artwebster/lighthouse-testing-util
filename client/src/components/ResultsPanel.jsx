import PropTypes from "prop-types";
import "./ResultsPanel.scss";

function ResultsPanel({ resultsData }) {
  return (
    <div>
      <div className="cmp-results-panel">
        <ul>
          <li>
            <h2>Overall: {resultsData.medianResult.overall}</h2>
          </li>
          <li>
            <h2 className="separator--long">==========================</h2>
            <h2 className="separator--short">=======================</h2>
          </li>
          <li>FCP: ......... {resultsData.medianResult.FCP}</li>
          <li>LCP: ......... {resultsData.medianResult.LCP}</li>
          <li>TBT: ......... {resultsData.medianResult.TBT}</li>
          <li>SI: .......... {resultsData.medianResult.SI}</li>
          <li>CLS: ......... {resultsData.medianResult.CLS}</li>
          <li>--------------------</li>
          <li>Time taken: {resultsData.timeElapsed}</li>
          <li>Runs: {resultsData.runs}</li>
        </ul>
      </div>
    </div>
  );
}

export default ResultsPanel;

ResultsPanel.propTypes = {
  resultsData: PropTypes.object,
};
