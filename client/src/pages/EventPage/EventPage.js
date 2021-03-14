import React, { useContext } from "react";

import "./EventPage.css";
import { UserContext } from "../../context/UserContext";
import { EventContext } from "../../context/EventContext";
import {
  epochToDate,
  epochToTime,
  toTitleCase,
} from "../../utils/helperFunctions";

const EventPage = () => {
  const { userData } = useContext(UserContext);
  const { eventData } = useContext(EventContext);

  return (
    <div className="event-page">
      <h3>{eventData.name}</h3>
      <div className="event-info-container">
        <p>
          <b>Event Type: </b>
          {/* Replaces the underscores with spaces and applies title case to the event_type. */}
          {toTitleCase(eventData.event_type.replace(/_/g, " "))}
        </p>
        <p>
          <b>Date: </b>
          {epochToDate(eventData.start_time)}
        </p>
        <p>
          <b>Time: </b>
          {epochToTime(eventData.start_time)} -{" "}
          {epochToTime(eventData.end_time)}
        </p>
      </div>
      <p className="event-description">{eventData.description}</p>
      <p>
        <b>Link: </b>
        {/* Display either the private_url or public_url, depending on if a user has logged in */}
        {userData.user ? (
          <a href={`${eventData.private_url}`} target="_blank" rel="noreferrer">
            {eventData.private_url}
          </a>
        ) : (
          <a href={`${eventData.public_url}`} target="_blank" rel="noreferrer">
            {eventData.public_url}
          </a>
        )}
      </p>
    </div>
  );
};

export default EventPage;
