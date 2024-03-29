import React from "react";
import { useDispatch } from "react-redux";
import { startDeleteEvent } from "../../features/calendar/thunks";

const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(startDeleteEvent());
  };

  return (
    <button className="btn btn-danger  fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash"></i>
      <span> Delete event</span>
    </button>
  );
};

export default DeleteEventFab;
