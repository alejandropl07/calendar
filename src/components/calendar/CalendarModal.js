import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";
import { closeModal } from "../../features/ui/uiSlice";
import { addNewEvent } from "../../features/calendar/calendarSlice";

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
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(nowPlusOne.toDate());
  const [isTitleValid, setIsTitleValid] = useState(true);

  const { modalOpen } = useSelector((state) => state.ui);

  const [formValues, setFormValues] = useState({
    title: "Event",
    notes: "",
    start: now.toDate(),
    end: nowPlusOne.toDate(),
  });

  const { title, notes, start, end } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleStartDateChange = (e) => {
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "The end date must be greater than the start date",
        "error"
      );
    }
    if (title.trim().length < 2) {
      return setIsTitleValid(false);
    }

    dispatch(
      addNewEvent({
        ...formValues,
        id: new Date().getTime(),
        user: {
          _id: "123",
          name: "Alejandro",
        },
      })
    );

    setIsTitleValid(true);
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-background"
    >
      <h1> New event </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
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
            className={`form-control ${!isTitleValid && "is-invalid"} `}
            placeholder="Event title"
            name="title"
            value={title}
            onChange={handleInputChange}
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
            value={notes}
            onChange={handleInputChange}
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
