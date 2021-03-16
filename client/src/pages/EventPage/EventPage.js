import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import "./EventPage.css";
import spinner from "../../assets/images/spinner.gif";
import { UserContext } from "../../context/UserContext";
import {
  epochToDate,
  epochToTime,
  toTitleCase,
} from "../../utils/helperFunctions";

const EventPage = (props) => {
  const { userData } = useContext(UserContext);

  const [eventData, setEventData] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);

  const fetchData = async () => {
    // The API URL to fetch a specific event's information.
    const API_URL = `https://api.hackthenorth.com/v3/graphql?query={ event(id: ${props.match.params.id}) { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }`;
    const res = await axios.get(API_URL);
    setEventData(res.data.data.event);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Checks if the inputted object is empty
  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const renderSpeakers = () => {
    // If the event has speakers, display their profile picture and name.
    if (eventData.speakers.length > 0) {
      return (
        <div className="speakers-container">
          {eventData.speakers.map((speaker) => {
            // For some of the data from the API, "speakers" with the same name as the event and no profile picture are listed. Don't show these.
            if (speaker.profile_pic !== null) {
              return (
                <div className="speaker-container">
                  <img
                    key={speaker.name}
                    src={speaker.profile_pic}
                    alt={`Picture of ${speaker.name}`}
                    className={`smooth-image image-${
                      imageLoaded ? "visible" : "hidden"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  <p>{speaker.name}</p>
                </div>
              );
            }
          })}
        </div>
      );
    }
  };

  // If the event data is not empty, display the event information.
  if (!isObjectEmpty(eventData)) {
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
        {/* Render the pictures and names of the speakers */}
        {renderSpeakers()}
        <p className="event-description">{eventData.description}</p>
        <p className="event-link">
          <b>Link: </b>
          {/* Display either the private_url or public_url, depending on if a user has logged in */}
          {userData.user ? (
            <a
              href={`${eventData.private_url}`}
              target="_blank"
              rel="noreferrer"
            >
              {eventData.private_url}
            </a>
          ) : (
            <a
              href={`${eventData.public_url}`}
              target="_blank"
              rel="noreferrer"
            >
              {eventData.public_url}
            </a>
          )}
        </p>
      </div>
    );
  } else {
    return (
      <div className="full-page-spinner">
        <img src={spinner} alt="Loading spinner" />
      </div>
    );
  }
};

export default EventPage;
