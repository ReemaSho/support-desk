import { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../features/notes/noteSlice";
import { FaPlus } from "react-icons/fa";
import Spinner from "./Spinner";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};
Modal.setAppElement("#root");

const FormModal = ({ ticket }) => {
  const { isLoading } = useSelector((state) => state.notes);

  const { _id: ticketId } = ticket;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const dispatch = useDispatch();
  // open close modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // add note submit
  const onNoteSubmit = (e) => {
    e.preventDefault();
    closeModal();
    dispatch(addNote({ ticketId, noteText }));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      {ticket.status !== "closed" && (
        <button className="btn" onClick={openModal}>
          <FaPlus />
          Add Note
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="add note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>

        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              onChange={(e) => setNoteText(e.target.value)}
              name="noteText"
              id="noteText"
              placeholder="Note Text"
              value={noteText}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FormModal;
