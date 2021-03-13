import React, { useContext } from "react";

import "./EventPage.css";
import { EventContext } from "../../context/EventContext";

const EventPage = () => {
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
    </div>
  );
};

export default EventPage;
