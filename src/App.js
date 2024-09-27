import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addRow, removeRow, moveRow } from "./Redux/slices/rowCount/index";

//row wise 
import Main from "./component/Main/Row";

//for drag and dropping the row
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableRow from "./component/DraggableRows";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"; // Import check icon
import {SyncLoader} from "react-spinners"//loader
import Navbar from "./component/Nav/Nav.jsx"

function App() {
  const rows = useSelector((state) => state.rowCount);
  const col = useSelector((state) => state.colCount);
  const dispatch = useDispatch();
  const containerRef = useRef(null); // Reference for the container
  const [loading, setLoading] = useState(false); // Loading state
  const [popupMessage, setPopupMessage] = useState(""); // Popup message state
  const [deleteLoading, setdeleteLoading] = useState(false);
  

  const handleAddItem = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Simulate API call delay
    setTimeout(() => {
      dispatch(addRow());
      setLoading(false); // Stop loading

      // Show a popup message
      setPopupMessage("State Added!");
      setTimeout(() => {
        setPopupMessage(""); // Clear message after 2 seconds
      }, 2000);
    }, 500); // Simulate delay of 500ms for adding row
  };

  const handleDeleteItem = (index) => {
    setdeleteLoading(true);
    setTimeout(() => {
      dispatch(removeRow(index));
      setdeleteLoading(false); // Stop loading

      // Show a popup message
      setPopupMessage("State Removed!");
      setTimeout(() => {
        setPopupMessage(""); // Clear message after 2 seconds
      }, 2000);
    }, 500);
  };

  const moverow = (dragIndex, hoverIndex) => {
    dispatch(moveRow({ dragIndex, hoverIndex }));
  };

  useEffect(() => {
    console.log("Updated rows: ", rows);
  }, [rows]);

  return (
    <><Navbar/>
    <DndProvider backend={HTML5Backend}>
      {deleteLoading ? <div className="global-loader"><SyncLoader/></div> : <></>}
      <div className="container" ref={containerRef}>
        <div className="row" key={0}>
          {Array.from({ length: col + 2 }, (_, j) => (
            <Main dataR={0} dataC={j} key={j} />
          ))}
        </div>
        {rows.map((rowId, i) => (
          <DraggableRow
            key={rowId}
            id={rowId}
            index={i + 1}
            moveRow={moverow}
            containerRef={containerRef}
          >
            {Array.from({ length: col + 2 }, (_, j) => (
              <Main dataR={i + 1} dataC={j} key={j} />
            ))}
            <svg
              onClick={() => handleDeleteItem(i)}
              className="delete_icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              fill="red"
              height="24px"
            >
              <path d="M3 6h18v2H3V6zm2 3v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9H5zm3 2h2v8H8v-8zm4 0h2v8h-2v-8zm3-7h-2.5l-1-1h-5l-1 1H7v2h10V4z" />
            </svg>
          </DraggableRow>
        ))}

        <div className="icon2">
          {loading ? ( // Show loader if loading
            <div className="loader" />
          ) : (
            <svg
              onClick={handleAddItem}
              className="plus_icon"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
            >
              <path d="M19 13h-6v-6h-2v6h-6v2h6v6h2v-6h6z" />
            </svg>
          )}
        </div>

        {popupMessage && ( // Show popup message if it exists
          <div className="popup-message">
            <FontAwesomeIcon icon={faCheckCircle} className="popup-icon" />{" "}
            {/* Green tick icon */}
            {popupMessage}
          </div>
        )}
      </div>
    </DndProvider>
    </>
  );
}

export default App;
