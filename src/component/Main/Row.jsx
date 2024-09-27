import React, { useState, useEffect } from "react";
import "./Row.css";
import { useDispatch, useSelector } from "react-redux";
import { increament } from "../../Redux/slices/colCount/index";
import Card1 from "../Card1/Card1";
import Card2 from "../Card2/Card2";
import Card3 from "../Card3/Card3";
import Card4 from "../Card4/Card4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function Main(props) {
  const col = useSelector((state) => state.colCount);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false); // Loading state
  const [popup, setPopup] = useState(""); // Popup state

  const handleColAddItem = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      dispatch(increament());
      setLoading(false); // Stop loading

      // Show a popup message
      setPopup("Variant added!");

      // Clear the popup message after 2 seconds
      setTimeout(() => {
        setPopup(""); // Clear message after 2 seconds
      }, 2000);
    }, 500);
  };

  useEffect(() => {
    if (popup) {
      console.log("Popup state updated:", popup);
    }
  }, [popup]);

  //returning the component according to row and col number

  if (props.dataR === 0) {
    if (props.dataC === 0) {
      return <div className="empty"></div>;
    } else if (props.dataC > col) {
      return null;
    }
    return <Card4 c={props.dataC} />;
  } else {
    if (props.dataC === 0) {
      return <Card1 r={props.dataR} c={props.dataC} />;
    } else if (props.dataC === 1) {
      return <Card2 />;
    } else if (props.dataC > col) {
      return (
        <div>
          <div className="icon1">
            {loading ? (
              <div className="loader" />
            ) : (
              <svg
                onClick={handleColAddItem}
                className="plus_icon"
                viewBox="0 0 24 24"
              >
                <path d="M19 13h-6v-6h-2v6h-6v2h6v6h2v-6h6z" />
              </svg>
            )}
          </div>
          {popup && (
            <div className="popup-message">
              <FontAwesomeIcon icon={faCheckCircle} className="popup_icon" />
              {popup}
            </div>
          )}
        </div>
      );
    }
    return <Card3 />;
  }
}

export default Main;
