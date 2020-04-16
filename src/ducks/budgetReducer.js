import Axios from "axios";

const initialState = {
  purchases: [],
  budgetLimit: null,
  loading: false,
};
const _PENDING = "_PENDING";
const _FULFILLED = "_FULFILLED";
const _REJECTED = "_REJECTED";
export const REQUEST_BUDGET_DATA = "REQUEST_BUDGET_DATA";
export const REQUEST_BUDGET_DATA_FULFILLED = REQUEST_BUDGET_DATA + _FULFILLED;
export const REQUEST_BUDGET_DATA_PENDING = REQUEST_BUDGET_DATA + "_PENDING";
const ADD_PURCHASE = "ADD_PURCHASE";
const ADD_PURCHASE_PENDING = ADD_PURCHASE + _PENDING;
const ADD_PURCHASE_FUFILLED = ADD_PURCHASE + _FULFILLED;
const DELETE_PURCHASE = "DELETE_PURCHASE";
const DELETE_PURCHASE_FUFILLED = DELETE_PURCHASE + _FULFILLED;
const DELETE_PURCHASE_PENDING = DELETE_PURCHASE + _PENDING;
const DELETE_PURCHASE_REJECTED = DELETE_PURCHASE + _REJECTED;
export function addPurchase(price, description, category) {
  let response = Axios.post("/api/budget-data/purchase", {
    price,
    description,
    category,
  })
    .then((response) => response.data)
    .catch((error) => error);
  return {
    type: ADD_PURCHASE,
    payload: response,
  };
}
export function removePurchase(id) {
  let payload = Axios.delete("/api/budget-data/purchase/" + id)
    .then((res) => res.data)
    .catch((err) => err.request.response);
  return {
    type: DELETE_PURCHASE,
    payload,
  };
}
export function requestBudgetData() {
  let budget = Axios.get("/api/budget-data")
    .then((response) => response.data)
    .catch((error) => error);
  return {
    type: REQUEST_BUDGET_DATA,
    payload: budget,
  };
}

export default function budgetReducer(state = initialState, action) {
  const { type, payload } = action;
  console.info("BudgetReducer type", type, "Payload:", payload);
  switch (type) {
    case REQUEST_BUDGET_DATA_PENDING:
      return { ...state, loading: true };
    case REQUEST_BUDGET_DATA_FULFILLED: {
      let { purchases, budgetLimit } = payload;
      return { ...state, loading: false, purchases, budgetLimit };
    }
    case ADD_PURCHASE_PENDING:
      return { ...state, loading: true };
    // had to add a block statement to prevent colision with varaibles
    case ADD_PURCHASE_FUFILLED:
      return { ...state, loading: false, purchases: payload };
    case DELETE_PURCHASE_PENDING:
      return { ...state, loading: true };
    case DELETE_PURCHASE_FUFILLED:
      return { ...state, loading: false, purchases: payload };
    case DELETE_PURCHASE_REJECTED:
      console.error("budgetReducer: Promise rejection", payload);
      return { ...state, loading: false };
    default:
      console.log(
        "budgetReducer: Action type was not handled, returning default"
      );
      return state;
  }
}
