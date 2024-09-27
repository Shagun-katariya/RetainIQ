import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import "./Card4.css";

function Card4(props) {
  if (props.c == 1) {
    return (
      <div className="title">
        <div className="content">
          <h5>Product Filter</h5>
        </div>
        <div className="vertical-line"></div>
      </div>
    );
  } else if (props.c == 2) {
    return (
      <div className="title2">
        <div className="innertitle">
          <h5>Primary Variant</h5>
          <svg className="headIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
        </div>
        <div className="vertical-line"></div>
      </div>
    );
  }
  return (
    <div className="title2">
      <div className="innertitle">
        <h5>Variant {props.c-1}</h5>
        <svg className="headIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
      </div>
      <div className="vertical-line"></div>
    </div>
  );
}

export default Card4;
