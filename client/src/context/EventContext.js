import { createContext, useState } from "react";

const EventContext = createContext({});

const EventProvider = ({ children }) => {
  const [eventData, setEventData] = useState({});

  return (
    <EventContext.Provider value={{ eventData, setEventData }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };
