import PropTypes from "prop-types";
import { useRef } from "react";
import { useState } from "react";
import "./InputPanel.scss";

function InputPanel({ handleFormSubmit, submitDisabled }) {
  const [caretXValue, setCaretXValue] = useState(0);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  function handleInputChange(inputRef) {
    setTimeout(() => {
      if (inputRef.current) {
        let caretPosition = inputRef.current.selectionStart;
        if (caretPosition > 60) caretPosition = 60;
        setCaretXValue(caretPosition * 8);
      }
    }, 0);
  }

  function handleKeyDown(ev) {
    if (ev.key === "Enter") {
      handleFormSubmit(ev);
    }
  }

  return (
    <form className="cmp-input-panel" onKeyDown={handleKeyDown}>
      <div className="intro-section__wrapper">
        <p>
          Welcome to the Lighthouse Batch Runner! Please fill out the fields below and click
          &quot;Submit&quot; to run multiple Lighthouse tests in sequence, and output the median
          results.
        </p>
      </div>
      <div className="url-section__wrapper section__wrapper">
        <span>Enter the URL:</span>
        <div className="url-input__wrapper input__wrapper">
          <input
            className="url-input__box input__box"
            ref={inputRef1}
            onFocus={() => handleInputChange(inputRef1)}
            onKeyDown={() => handleInputChange(inputRef1)}
            type="text"
            size="60"
            autoFocus
          />
          <div className="url-input__caret input__caret" style={{ left: `${caretXValue}px` }}></div>
        </div>
      </div>
      <div className="runs-section__wrapper section__wrapper">
        <span htmlFor="num-runs">Number of runs (1 to 10):</span>
        <div className="runs-input__wrapper input__wrapper">
          <input
            className="runs-input__box input__box"
            ref={inputRef2}
            onFocus={() => handleInputChange(inputRef2)}
            onKeyDown={() => handleInputChange(inputRef2)}
            type="text"
            size="6"
            maxLength={2}
          />
          <div
            className="runs-input__caret input__caret"
            style={{ left: `${caretXValue}px` }}
          ></div>
        </div>
      </div>
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
        <button
          disabled={submitDisabled}
          className="button-submit"
          type="button"
          onClick={(ev) => handleFormSubmit(ev)}
        >
          {">>> SUBMIT"}
        </button>
      </div>
    </form>
  );
}

export default InputPanel;

InputPanel.propTypes = {
  handleFormSubmit: PropTypes.func,
  submitDisabled: PropTypes.bool,
};
