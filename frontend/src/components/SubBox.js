import React from "react";
import "./subbox.css";

const SubBox = ({ type, price, videoQuality, resol, devices }) => {
  return (
    <div className="option-box">
      <div className="type-box">{type}</div>
      <div>{price}</div>
      <div>{videoQuality}</div>
      <div>{resol}</div>
      <div>
        {devices.map((device) => (
          <div>{device}</div>
        ))}
      </div>
    </div>
  );
};

export default SubBox;
