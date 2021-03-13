import React, { useContext } from "react";

import { EventContext } from "../../context/EventContext";

const EventPage = () => {
  const { eventData } = useContext(EventContext);

  return <div>{eventData ? <p>{eventData.name}</p> : <p>Loading...</p>}</div>;
};

export default EventPage;
