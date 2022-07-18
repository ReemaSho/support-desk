import React from "react";
import { useSelector } from "react-redux";
const NoteItem = ({ note }) => {
  const { user } = useSelector((state) => state.authentication);
  return (
    <div className={note.isStaff ? "note note-staff" : "note note-notStaff"}>
      <h4>
        Note from{" "}
        {note.isStaff ? (
          <span>Staff</span>
        ) : (
          <span>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</span>
        )}
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toDateString("en-US")}
      </div>
    </div>
  );
};

export default NoteItem;
