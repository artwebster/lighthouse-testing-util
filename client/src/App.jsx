import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [response, setResponse] = useState(null);

  function handleClick(ev) {
    const targetURL = ev.target.form[0].value;
    const numRuns = ev.target.form[1].value;
    const desktop = ev.target.form[3].checked;
    console.log("form submitted for url: ", targetURL);
    axios
      .post("/api/lighthouse", {
        url: targetURL,
        runs: numRuns,
        desktop,
      })
      .then((res) => setResponse(res.data))
      .catch((err) => console.error("bad res!: ", err));
  }

  return (
    <div className="App">
      <div>
        <h1>Lighthouse Batch Runner</h1>
        <form className="lighthouse__form">
          <div>
            <span>Enter the URL:</span>
            <input type="text" size="60" />
          </div>
          <div>
            <label htmlFor="num-runs">Number of runs:</label>
            <select name="num-runs" id="num-runs">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div>
            <span>Device:</span>
            <input type="radio" id="device-mobile" name="device" value="mobile" defaultChecked></input>
            <label htmlFor="device-mobile">mobile</label>
            <input type="radio" id="device-desktop" name="device" value="desktop"></input>
            <label htmlFor="device-desktop">desktop</label>
          </div>
          <button type="button" onClick={(ev) => handleClick(ev)}>
            Submit
          </button>
        </form>
      </div>
      <div>
        {response && <div className="Response">Result: {response.data.averageResult.overall}</div>}
      </div>
    </div>
  );
}

export default App;
