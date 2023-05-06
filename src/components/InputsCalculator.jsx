// svg imports
import iconDollar from "../assets/icon-dollar.svg";
import iconPerson from "../assets/icon-person.svg";

// props validation
import PropsTypes from "prop-types";

// helpers
import { ACTIONS, TIP_PERCENTAGES } from "../helpers";

// hooks
import { useState, useRef } from "react";

const InputsCalculator = ({ state, dispatch }) => {
  // states
  const [custom, setCustom] = useState(false);
  const radioButtons = useRef(null);
  const customTip = useRef();

  // props validation
  InputsCalculator.propTypes = {
    state: PropsTypes.object.isRequired,
    dispatch: PropsTypes.func.isRequired,
  };

  // handle input onChange
  const handleInput = function (e) {
    if (e.target.id === "bill")
      dispatch({
        type: ACTIONS.BILL_ADJUSTMENT,
        payload: { bill: +e.target.value },
      });
    if (!isNaN(e.target.id))
      dispatch({
        type: ACTIONS.TIP_ADJUSTMENT,
        payload: { tip: +e.target.value >= 99 ? 99 : +e.target.value },
      });
    if (e.target.id === "people")
      dispatch({
        type: ACTIONS.PEOPLE_ADJUSTMENT,
        payload: { people: +e.target.value },
      });
  };

  // custom tip function
  const tipCustom = function (e) {
    if (e.target.id === "label") setCustom((prev) => !prev);

    radioButtons.current
      .querySelectorAll('input[type="radio"')
      .forEach((radio) => {
        radio.checked = false;
      });

    if (customTip.current) {
      customTip.current.focus();
    }
  };

  return (
    <div className="inputs-calculator">
      <label htmlFor="bill">
        Bill
        <div className="input input--bill">
          <img src={iconDollar} alt="dollar icon" />
          <input
            type="number"
            name="bill"
            id="bill"
            min="0"
            step="0.01"
            pattern="^\d+(\.\d{1,2})?$"
            required
            placeholder="0.00"
            value={state.bill}
            onChange={handleInput}
          />
        </div>
      </label>
      <fieldset onChange={handleInput} ref={radioButtons}>
        <legend>Select Tip %</legend>
        {TIP_PERCENTAGES.map((percentage) => {
          return (
            <div className="tip--wrp" key={percentage}>
              <input
                type="radio"
                name="tip"
                id={percentage}
                value={percentage}
                onClick={() => setCustom(false)}
              />
              <label htmlFor={percentage}>{percentage}%</label>
            </div>
          );
        })}
        <div className="tip--wrp" onClick={tipCustom}>
          <input
            type="number"
            name="custom"
            id="100"
            min="0"
            max="99"
            className={custom ? "" : "hidden"}
            ref={customTip}
            onChange={handleInput}
          />
          <label htmlFor="40" className={custom ? "hidden" : ""} id="label">
            Custom
          </label>
        </div>
      </fieldset>
      <label htmlFor="people">
        <div className="number-people">
          <p>Number of People</p>
          <p className={state.people <= 0 ? "" : "hidden"}>
            Can&apos;t be zero
          </p>
        </div>
        <div className="input input--people">
          <img src={iconPerson} alt="person icon" />
          <input
            type="number"
            name="people"
            id="people"
            min="0"
            step="1"
            className={state.people <= 0 ? "invalid" : ""}
            required
            value={state.people}
            placeholder="0"
            onChange={handleInput}
          />
        </div>
      </label>
    </div>
  );
};

export default InputsCalculator;
