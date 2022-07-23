import { fetchWithToken } from "../../helpers/fetch";
import { prepareEvents } from "../../helpers/prepareEvents";
import { addNewEvent, loadEvents } from "./calendarSlice";

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

export const startLoadEvents = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("events");
      const body = await resp.json();
      const events = prepareEvents(body.events);
      dispatch(loadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };
};
