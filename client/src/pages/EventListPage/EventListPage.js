import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./EventListPage.css";
import { UserContext } from "../../context/UserContext";
import { EventContext } from "../../context/EventContext";
import SearchBar from "../../components/SearchBar/SearchBar";

const EventListPage = () => {
  const { userData } = useContext(UserContext);
  const { setEventData } = useContext(EventContext);

  const [events, setEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);

  // Fetches all event data from the given endpoint
  const fetchData = async () => {
    const API_URL =
      "https://api.hackthenorth.com/v3/graphql?query={ events { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }";
    const res = await axios.get(API_URL);
    setEvents(res.data.data.events);
    setDisplayedEvents(res.data.data.events);
  };

  useEffect(() => {
    fetchData();
    // Clear the event data
    setEventData({});
  }, []);

  const eventsSorted = displayedEvents.slice(0).sort((a, b) => {
    return a.start_time - b.start_time;
  });

  const epochToTime = (epochDate) => {
    const date = new Date(epochDate);
    const hours = date.getHours();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hours}:${minutes}`;
  };

  return (
    <div className="event-list-page">
      <h2>Events</h2>
      <div className="search-bar-container">
        <SearchBar
          defaultData={events}
          setDefaultData={setEvents}
          displayedData={displayedEvents}
          setDisplayedData={setDisplayedEvents}
        />
      </div>
      {events.length > 0 ? (
        eventsSorted.map((event) => {
          if (
            event.permission === "public" ||
            (event.permission === "private" && userData.user)
          ) {
            return (
              <Link
                className="link event"
                key={event.id}
                to={`/${event.name.replace(/\s/g, "")}`}
                onClick={() => setEventData(event)}
              >
                <h3>{event.name}</h3>
                <p>
                  {epochToTime(event.start_time)} -{" "}
                  {epochToTime(event.end_time)}
                </p>
              </Link>
            );
          }
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EventListPage;
