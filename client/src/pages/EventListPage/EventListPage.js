import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./EventListPage.css";
import { UserContext } from "../../context/UserContext";
import { EventContext } from "../../context/EventContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import { epochToDate, epochToTime } from "../../utils/helperFunctions";

const EventListPage = () => {
  const { userData } = useContext(UserContext);
  const { setEventData } = useContext(EventContext);

  const [events, setEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);

  // Fetches all event data from the provided HTN API
  const fetchData = async () => {
    let apiUrl =
      "https://api.hackthenorth.com/v3/graphql?query={ events { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }";
    // In production, the request is sent to a proxy that adds CORS headers to a request.
    // This is done to fix the CORS error that occurs when the request is made to the API URl alone.
    const HEROKU_URL = "https://cors-anywhere-htn.herokuapp.com/";
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

  // Sorts the events in order of start time (earlier events first)
  const eventsSorted = displayedEvents.slice(0).sort((a, b) => {
    return a.start_time - b.start_time;
  });

  return (
    <div className="event-list-page">
      <h1>Events</h1>
      <div className="search-bar-container">
        <SearchBar
          defaultData={events}
          setDefaultData={setEvents}
          displayedData={displayedEvents}
          setDisplayedData={setDisplayedEvents}
        />
      </div>
      {events.length > 0 ? (
        // If the displayedEvents array is not empty and,
        // if a user is not logged in, not every event in the displayedEvents array is private (in which case nothing would show),
        // then list the events in the displayedEvents array
        displayedEvents.length > 0 &&
        (!userData.user
          ? !displayedEvents.every((event) => {
              return event.permission === "private";
            })
          : 1) ? (
          eventsSorted.map((event) => {
            // Display all public events and any private events only if a user is logged in.
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
          // Otherwise, show a "No results" message
          <p>No results &#128549;</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EventListPage;
