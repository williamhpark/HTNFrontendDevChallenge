import React, { useContext } from "react";

import "./EventPage.css";
import { UserContext } from "../../context/UserContext";
import { EventContext } from "../../context/EventContext";

const EventPage = () => {
  const { userData } = useContext(UserContext);
  const { eventData } = useContext(EventContext);

  const epochToDate = (epochDate) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(epochDate);
    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const epochToTime = (epochDate) => {
    const date = new Date(epochDate);
    let hours = date.getHours();
    let period = "am";
    if (hours > 12) {
      hours = hours - 12;
      period = "pm";
    } else if (hours === 0) {
      hours = 12;
    }
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hours}:${minutes}${period}`;
  };

  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="event-page">
      <h1>{eventData.name}</h1>
      <div className="event-info-container">
        <p>
          <b>Event Type: </b>
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
