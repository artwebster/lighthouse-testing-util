import PropTypes from 'prop-types';
import { LineChart } from '@mui/x-charts/LineChart';

function ResultsGraph({ resultsData, redirectToTest }) {
	const processedData = resultsData.map((d) => ({
		...d,
		date: new Date(d.date).getTime()
	}));

	processedData.sort((a, b) => a.date - b.date);

	const clickHandler = (event, params) => {
        const pointData = processedData[params.dataIndex];
        redirectToTest(pointData.id);
	};

	return (
		<LineChart
			series={[{ dataKey: 'score' }]}
			xAxis={[
				{
					dataKey: 'date',
					scaleType: 'time',
					valueFormatter: (date) => new Date(date).toLocaleDateString('en-GB'),
					label: 'Date'
				}
			]}
			dataset={processedData}
			height={300}
			onMarkClick={clickHandler}
			className="history__results-graph--graph"
		/>
	);
}

export default ResultsGraph;

ResultsGraph.propTypes = {
	resultsData: PropTypes.array,
    redirectToTest: PropTypes.func
};
