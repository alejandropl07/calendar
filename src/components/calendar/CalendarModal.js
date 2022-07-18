import React, { useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");

const CalendarModal = () => {
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(nowPlusOne.toDate());

  const closeModal = () => {};

  const handleStartDateChange = (e) => {
    setStartDate(e);
    console.log(e);
  };

  const handleEndDateChange = (e) => {
    console.log(e);
    setEndDate(e);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-background"
    >
      <h1> New event </h1>
      <hr />
      <form className="container">
        <div className="form-group mb-2">
          <label>Start datetime</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={startDate}
            className="form-control"
            locale="en-EN"
          />
        </div>

        <div className="form-group mb-2">
          <label>End datetime</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={endDate}
            minDate={startDate}
            className="form-control"
            locale="en-EN"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Title and notes</label>
          <input
            type="text"
            className="form-control"
            placeholder="Event title"
            name="title"
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Description
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notes"
            rows="5"
            name="notes"
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            More information
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Save</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
