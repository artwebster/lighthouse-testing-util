import apiClient from '../../utils/apiClient';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import './History.scss';

function Pages() {
	const [testHistory, setTestHistory] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const getHistory = async () => {
			const history = await apiClient.get('/lighthouse/history');
			sortAndFormatData(history.data.results);
		};

		getHistory();
	}, []);

	function sortAndFormatData(data) {
		if (!data) {
			return;
		}

		const latestTestMap = new Map();

		// iterating through test results, saving just the most recent test for each url
		data.forEach((test) => {
			const latestTest = latestTestMap.get(test.url);
			if (!latestTest || new Date(test.createdAt) > new Date(latestTest.date)) {
				latestTestMap.set(test.url, {
					url: test.url,
					score: test.results.medianResult.overall,
					date: test.createdAt
				});
			}
		});

		// sorting by time of test
		const sortedTests = Array.from(latestTestMap.values()).sort((a, b) => {
			return new Date(b.date) - new Date(a.date);
		});

		if (sortedTests.length > 0) {
			setTestHistory(sortedTests);
		}
	}

    // redirect user when clicking on a row
	function handleRowClick(url) {
		navigate(`/tests?url=${encodeURIComponent(url)}`);
	}

	return (
		<>
			{testHistory && (
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
							{testHistory.map((row) => (
								<TableRow
									onClick={() => handleRowClick(row.url)}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											handleRowClick(row.url);
										}
									}}
									role="button"
									tabIndex={0}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									key={row.url}
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
			)}
		</>
	);
}

export default Pages;
