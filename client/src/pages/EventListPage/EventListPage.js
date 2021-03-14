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
    let apiUrl =
      "https://api.hackthenorth.com/v3/graphql?query={ events { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }";
    const HEROKU_URL = "https://htn-frontend-challenge.herokuapp.com/";
    if (process.env.NODE_ENV === "production") {
      apiUrl = HEROKU_URL + apiUrl;
    }
    const res = await axios.get(apiUrl, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
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
                <p>{epochToDate(event.start_time)}</p>
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
