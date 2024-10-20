import { useState } from "react";
import axios from "axios";
import "./App.scss";
import ResultsPanel from "./components/ResultsPanel";
import InputPanel from "./components/InputPanel";
import ProgressBar from "./components/ProgressBar";
import { Divider } from "@mui/material";
import Header from "./components/Header";

function App() {
	const [response, setResponse] = useState(null);
	const [resultsData, setResultsData] = useState();
	const [submitDisabled, setSubmitDisabled] = useState(false);
	const [status, setStatus] = useState();

	// open a connection to the server to receive updates
	function subscribeToEvent(source) {
		const eventSource = new EventSource(source);

		eventSource.addEventListener("update", (ev) => {
			setResponse(ev.data);
		});

		eventSource.addEventListener("results", (ev) => {
			setResultsData(JSON.parse(ev.data));
			setSubmitDisabled(false);
			eventSource.close();
		});

		eventSource.addEventListener("message", (ev) => {
			console.log(ev.data);
		});

		eventSource.addEventListener("status", (ev) => {
			setStatus(JSON.parse(ev.data));
		});

		eventSource.onerror = (err) => {
			console.log(err);
			setResponse("Error! See console for details");
			setSubmitDisabled(false);
            setStatus();
			eventSource.close();
		};
	}

	function launchTest(userInput) {
		axios
			.post("/lighthouse/prepTest", userInput)
			.then((res) => {
				subscribeToEvent(res.data.data);
			})
			.catch((err) => console.error(err));
	}

	function validateRuns(runsInput) {
		let numRuns = Number(runsInput);
		if (!numRuns) return null;
		numRuns = numRuns > 10 ? 10 : numRuns < 1 ? 1 : numRuns;
		return numRuns;
	}

	function handleFormSubmit(ev) {
		setResponse(null);
		setResultsData(null);
		setStatus(null);

		const userInput = {
			url: ev.target.form[0].value,
			runs: validateRuns(ev.target.form[1].value),
			desktop: ev.target.form[3].checked,
		};

		if (userInput.runs) {
			setSubmitDisabled(true);
			launchTest(userInput);
		} else {
			setResponse("Error! Please enter a valid runs number");
		}
	}

	return (
		<>
			<Header />
			<div className="app">
				<div className="app__section--wrapper">
					<InputPanel
						handleFormSubmit={handleFormSubmit}
						submitDisabled={submitDisabled}
					/>
				</div>
				<div className="app__section--wrapper">
					{resultsData ? (
						<>
							<Divider flexItem />
							<ResultsPanel resultsData={resultsData} />
						</>
					) : (
						<>
							{response && <div className="Response">{response}</div>}
							{status && <ProgressBar status={status} />}
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
