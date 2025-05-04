import { useEffect, useState } from 'react';
import apiClient from '../../utils/apiClient';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import ResultsPanel from '../ResultsPanel';

function Test() {
	const { testId } = useParams();
	const [testResult, setTestResult] = useState(null);

	useEffect(() => {
		const getTestResult = async () => {
			const results = await apiClient.get(`/lighthouse/history/${testId}`);
			setTestResult(results.data.result);
		};

		getTestResult();
	}, []);

	return (
		<>
			{testResult && (
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
								<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component="th" scope="row">
										{testResult.url}
									</TableCell>
									<TableCell align="right">{testResult.results.medianResult.overall}</TableCell>
									<TableCell align="right">
										{new Date(testResult.createdAt).toLocaleString()}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>

					<div className="app__section--wrapper">
						<ResultsPanel resultsData={testResult.results} />
					</div>
				</>
			)}
		</>
	);
}

export default Test;
