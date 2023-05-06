// actions for useReducer
export const ACTIONS = {
  BILL_ADJUSTMENT: "bill",
  TIP_ADJUSTMENT: "tip",
  PEOPLE_ADJUSTMENT: "people",
  RESET: "reset",
};

// tip percentages
export const TIP_PERCENTAGES = [5, 10, 15, 25, 50];

// tip amount per person formula
export const TIP_AMOUNT = function (state) {
  return state.bill === 0 || state.people === 0 || state.tip === 0
    ? 0
    : ((state.bill * (state.tip / 100)) / state.people).toFixed(2);
};

// total amount per person formula
export const TOTAL_AMOUNT = function (state, tipPerPerson) {
  return (
    tipPerPerson === 0 ? 0 : state.bill / state.people + tipPerPerson
  ).toFixed(2);
};
