// svg import
import logo from "./assets/logo.svg";

// components
import InputsCalculator from "./components/InputsCalculator";
import TotalsCalculator from "./components/TotalsCalculator";

// hooks
import { useReducer } from "react";

// helpers
import { ACTIONS } from "./helpers";

// initial state total
const stateBill = {
  bill: 0,
  tip: 0,
  people: 0,
};

// reducer function
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.BILL_ADJUSTMENT:
      return { ...state, bill: action.payload.bill };
    case ACTIONS.TIP_ADJUSTMENT:
      return { ...state, tip: action.payload.tip };
    case ACTIONS.PEOPLE_ADJUSTMENT:
      return { ...state, people: action.payload.people };
    case ACTIONS.RESET:
      return { bill: 0, tip: 0, people: 0 };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, stateBill);

  return (
    <div className="app">
      <header>
        <h1>
          <img src={logo} alt="logo calculator app" />
        </h1>
      </header>
      <main>
        <InputsCalculator state={state} dispatch={dispatch} />
        <TotalsCalculator state={state} dispatch={dispatch} />
      </main>
    </div>
  );
}

export default App;
