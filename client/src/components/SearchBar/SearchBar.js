import React, { useState, useEffect } from "react";

import "./SearchBar.css";
import TagItem from "../TagItem/TagItem";
import { toTitleCase } from "../../utils/helperFunctions";

// All event types in the HtN API data
const EVENT_TYPES = ["workshop", "tech_talk", "activity"];

const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [category, setCategory] = useState("all");

  const updateDisplayedEvents = () => {
    const filtered = props.defaultData.filter((item) => {
      // The event gets displayed if both conditions below are met.
      return (
        // Condition 1
        // True if no keywords have been inputted or the event's name/description/speakers contains at least one of the keywords.
        (keywords.length === 0 ||
          keywords.some(
            (keyword) =>
              item.name.toLowerCase().includes(keyword.toLowerCase()) ||
              item.description.toLowerCase().includes(keyword.toLowerCase()) ||
              item.speakers.some((speaker) =>
                speaker.name.toLowerCase().includes(keyword.toLowerCase())
              )
          )) &&
        // Condition 2
        // True if category is set to "all" or the event's category matches the selected category
        (category === "all" || item.event_type === category)
      );
    });
    props.setDisplayedData(filtered);
  };

  // Adds the inputted keyword to the keywords array when the user clicks "Enter"
  const handleKeyDown = (e) => {
    // Note: The max number of keywords allowed is 5
    if (e.key === "Enter" && input && keywords.length < 5) {
      e.preventDefault();
      setKeywords([...keywords, input]);
      setInput("");
    } else if (keywords.length === 5) {
      e.preventDefault();
    } else {
      console.error("Too many keywords");
    }
  };

  const removeKeyword = (keyword) => {
    const filtered = keywords.filter((item) => item !== keyword);
    setKeywords(filtered);
    updateDisplayedEvents(filtered);
  };

  // Whenever the keywords or category change, update the displayed events.
  useEffect(() => {
    updateDisplayedEvents();
  }, [keywords, category]);

  return (
    <div className="search-bar">
      {keywords.length > 0 && (
        <div className="tags-container">
          <p>
            <b>Keywords: </b>
          </p>
          {keywords.map((keyword) => {
            return (
              <TagItem key={keyword} name={keyword} removeTag={removeKeyword} />
            );
          })}
        </div>
      )}
      <form className="form-group">
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
          onChange={(e) => {
            setCategory(e.target.value);
          }}
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
      </form>
    </div>
  );
};

export default SearchBar;
