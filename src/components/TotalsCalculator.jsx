// props validation
import PropTypes from "prop-types";

// helpers
import { ACTIONS, TIP_AMOUNT, TOTAL_AMOUNT } from "../helpers";

const TotalsCalculator = ({ state, dispatch }) => {
  // totals
  const tip = TIP_AMOUNT(state);
  const total = TOTAL_AMOUNT(state, +tip);

  // prop validation
  TotalsCalculator.propTypes = {
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  return (
    <div className="totals-calculator">
      <div className="totals">
        <div>
          <p>Tip Amount</p>
          <small>/ person</small>
        </div>
        <p>${tip}</p>
      </div>
      <div className="totals">
        <div>
          <p>Total</p>
          <small>/ person</small>
        </div>
        <p>${total}</p>
      </div>
      <button
        onClick={() => {
          dispatch({
            type: ACTIONS.RESET,
          });
        }}
        type="reset"
      >
        RESET
      </button>
    </div>
  );
};

export default TotalsCalculator;
