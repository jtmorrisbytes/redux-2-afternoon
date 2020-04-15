const initialState = {
  purchases: [],
  budgetLimit: null,
  loading: false,
};
export default function budgetReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}
