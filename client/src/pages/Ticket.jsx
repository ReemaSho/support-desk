import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const Ticket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    //eslint-disable-next-line
  }, [ticketId, isError, message]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticket._id));
    toast.success("Ticket closed");
    navigate("/tickets");
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h3>Something went wrong!</h3>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket Id: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description Of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          CloseTicket
        </button>
      )}
    </div>
  );
};

export default Ticket;
