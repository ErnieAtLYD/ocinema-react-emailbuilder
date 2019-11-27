// @flow
import React, {useState} from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";

// called from <ColumnElement>
const ColumnElementToolbar = (): React$Element<"div"> => {
  const [isToolbarShown, setToolbarVisibility] = useState(false);
  const style = {
    background: "#fff",
    cursor: "pointer",
    right: -75,
    position: "absolute",
    top: 0,
    width: 75,
    zIndex: 2,
  };
  return (
    <div style={style}>
      <EditIcon
        onClick={() => {
          alert("under development.");
        }}
      />
      <DeleteIcon />
      <FileCopyIcon
        onClick={() => {
          alert("under development.");
        }}
      />
    </div>
  );
};

export default ColumnElementToolbar;
