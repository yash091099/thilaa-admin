import React from "react";
import { AtomSpinner } from "react-epic-spinners";

export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="backdrop" />
      <div className="loader">
        <AtomSpinner color="#93e6a9" />
      </div>
    </div>
  );
};