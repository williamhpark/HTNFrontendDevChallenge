import React, { useState } from "react";

import "./SearchBar.css";

const EVENT_TYPES = ["workshop", "tech_talk", "activity"];

const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [category, setCategory] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = props.defaultData.filter((item) => {
      // The event name/description/speakers contains at least one of the keywords and matches the selected event type
      return (
        (keywords.length === 0 ||
          keywords.some(
            (keyword) =>
              item.name.toLowerCase().includes(keyword.toLowerCase()) ||
              item.description.toLowerCase().includes(keyword.toLowerCase()) ||
              item.speakers.some((speaker) =>
                speaker.name.toLowerCase().includes(keyword.toLowerCase())
              )
          )) &&
        (category === "all" || item.event_type === category)
      );
    });
    props.setDisplayedData(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input) {
      setKeywords([...keywords, input]);
      setInput("");
    }
  };

  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="search-bar">
      {keywords.length > 0 && (
        <p>
          <b>Keywords: </b>
          {keywords.join(", ")}
        </p>
      )}
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="Search keywords..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <select
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option selected value="all">
            All Types
          </option>
          {EVENT_TYPES.map((type) => {
            return (
              <option value={type}>
                {toTitleCase(type.replace(/_/g, " "))}
              </option>
            );
          })}
        </select>
        <input
          className="btn btn-secondary btn-sm"
          type="submit"
          value="Search"
        />
      </form>
    </div>
  );
};

export default SearchBar;
