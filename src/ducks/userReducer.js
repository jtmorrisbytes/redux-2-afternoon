import Axios from "axios";

const initialState = { email: null, firstName: null, lastName: null };

export const REQUEST_USER_DATA = "REQUEST_USER_DATA";
export const REQUEST_USER_DATA_FUFILLED = REQUEST_USER_DATA + "_FULFILLED";
export const requestUserData = () => {
  let data = Axios.get("/auth/user-data").then((res) => res.data);
  return {
    type: REQUEST_USER_DATA,
    payload: data,
  };
};
export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  console.log("User Reducer dispatched", type, payload);
  switch (type) {
    case REQUEST_USER_DATA_FUFILLED:
      const { firstName, lastName, email } = payload.user;
      return { firstName, lastName, email };
    default:
      return state;
  }
}
