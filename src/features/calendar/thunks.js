import Swal from "sweetalert2";
import { fetchWithToken } from "../../helpers/fetch";
import { prepareEvents } from "../../helpers/prepareEvents";
import {
  addNewEvent,
  deleteEvent,
  loadEvents,
  updateEvent,
} from "./calendarSlice";

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

export const startUpdateEvent = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`events/${event.id}`, event, "PUT");
      const body = await resp.json();
      if (body.ok) {
        dispatch(updateEvent(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startDeleteEvent = (event) => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;
    try {
      const resp = await fetchWithToken(`events/${id}`, {}, "DELETE");
      const body = await resp.json();
      if (body.ok) {
        dispatch(deleteEvent());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
