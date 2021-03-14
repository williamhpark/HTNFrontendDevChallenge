import React, { useState } from "react";

import "./SearchBar.css";
import TagItem from "../TagItem/TagItem";

const EVENT_TYPES = ["workshop", "tech_talk", "activity"];

const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [category, setCategory] = useState("all");

  const updateDisplayedEvents = (keywordsArray) => {
    const filtered = props.defaultData.filter((item) => {
      // The event name/description/speakers contains at least one of the keywords and matches the selected event type
      return (
        (keywordsArray.length === 0 ||
          keywordsArray.some(
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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDisplayedEvents(keywords);
  };

  const handleKeyDown = (e) => {
    // Note: The max number of keywords is 5
    if (e.key === "Enter" && input && keywords.length < 5) {
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

  const removeKeyword = (keyword) => {
    const filtered = keywords.filter((item) => item !== keyword);
    setKeywords(filtered);
    updateDisplayedEvents(filtered);
  };

  return (
    <div className="search-bar">
      {keywords.length > 0 && (
        <div className="tags-container">
          <p>
            <b>Keywords: </b>
          </p>
          {keywords.map((keyword) => {
            return <TagItem name={keyword} removeTag={removeKeyword} />;
          })}
        </div>
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
              <option key={type} value={type}>
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
