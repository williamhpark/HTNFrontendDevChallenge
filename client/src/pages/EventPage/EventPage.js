import React, { useContext } from "react";

import "./EventPage.css";
import { UserContext } from "../../context/UserContext";
import { EventContext } from "../../context/EventContext";

const EventPage = () => {
  const { userData } = useContext(UserContext);
  const { eventData } = useContext(EventContext);

  const epochToTime = (epochDate) => {
    const date = new Date(epochDate);
    const hours = date.getHours();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hours}:${minutes}`;
  };

  return (
    <div className="event-page">
      <h1>{eventData.name}</h1>
      <h3>
        {epochToTime(eventData.start_time)} - {epochToTime(eventData.end_time)}
      </h3>
      <p>{eventData.description}</p>
      <p>
        <b>Link: </b>
        {userData.user ? (
          <a href={`${eventData.private_url}`} target="_blank">
            {eventData.private_url}
          </a>
        ) : (
          <a href={`${eventData.public_url}`} target="_blank">
            {eventData.public_url}
          </a>
        )}
      </p>
    </div>
  );
};

export default EventPage;
