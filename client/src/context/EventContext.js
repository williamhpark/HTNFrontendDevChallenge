import { createContext, useState } from "react";

const EventContext = createContext({});

// Stores the data for the event that is selected from the Event List Page.
// This is done to avoid the need for a second API call.
const EventProvider = ({ children }) => {
  const [eventData, setEventData] = useState({});

  return (
    <EventContext.Provider value={{ eventData, setEventData }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };
