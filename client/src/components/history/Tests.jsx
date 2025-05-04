import { useEffect, useState } from 'react';
import apiClient from '../../utils/apiClient';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultsGraph from '../ResultsGraph';

function Tests() {
	const [testHistory, setTestHistory] = useState(null);
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const url = params.get('url');
	const navigate = useNavigate();

	useEffect(() => {
		const getHistory = async () => {
			const history = await apiClient.get('/lighthouse/history');
			filterAndFormatData(history.data.results);
		};

		getHistory();
	}, []);

	function filterAndFormatData(data) {
		if (!data) {
			return;
		}

		// if there's a 'url' param, filtering out all test pages that don't match
		const filteredTests = data
			.filter((test) => !url || test.url === url)
			.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
			.map((test) => ({
				url: test.url,
				score: test.results.medianResult.overall,
				date: test.createdAt,
				id: test.id
			}));

		if (filteredTests.length > 0) {
			setTestHistory(filteredTests);
		}
	}

	// redirect user when clicking on a row
	function redirectToTest(id) {
		navigate(`/test/${id}?url=${encodeURIComponent(url)}`);
	}

	return (
		<>
			{testHistory && (
				<>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="left">URL</TableCell>
									<TableCell align="right">Score</TableCell>
									<TableCell align="right">Date</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{testHistory.map((row, i) => (
									<TableRow
										onClick={() => redirectToTest(row.id)}
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												redirectToTest(row.id);
											}
										}}
										role="button"
										tabIndex={0}
										key={i}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										className="history__page-row"
									>
										<TableCell component="th" scope="row">
											{row.url}
										</TableCell>
										<TableCell align="right">{row.score}</TableCell>
										<TableCell align="right">{new Date(row.date).toLocaleString()}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					{url && (
						<div className="history__results-graph--wrapper">
							<ResultsGraph resultsData={testHistory} redirectToTest={redirectToTest} />
						</div>
					)}
				</>
			)}
		</>
	);
}

export default Tests;
