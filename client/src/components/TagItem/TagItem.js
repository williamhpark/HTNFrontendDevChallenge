import React from "react";

import "./TagItem.css";
import ClearIcon from "@material-ui/icons/Clear";

const TagItem = (props) => {
  return (
    <div className="tag-item shadow-sm">
      {props.name}
      <ClearIcon
        className="clear-btn"
        onClick={() => props.removeTag(props.name)}
      />
    </div>
  );
};

export default TagItem;
