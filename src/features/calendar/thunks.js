import { fetchWithToken } from "../../helpers/fetch";
import { addNewEvent } from "./calendarSlice";

export const startAddNewEvent = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchWithToken("events", event, "POST");
      const body = await resp.json();
      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name,
        };
        dispatch(addNewEvent(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
