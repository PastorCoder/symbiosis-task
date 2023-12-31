import React, { useState, useRef, useEffect } from "react";
import AddPerson from "./AddPerson";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/add-person-modal.css";
import axios from "axios";




const AddPersonalModal = ({ onClose, onAddPerson }) => {
  const [people, setPeople] = useState([]);
  
  const modalContainerRef = useRef(null);


  
 
  const addPerson = (newPerson) => {
    //Add a new person to the mock API
    axios
      .post(
        "https://64f645fd2b07270f705e5970.mockapi.io/api/peopleList/users",
        newPerson
      )
      .then((response) => {
        setPeople([...people, response.data, ...newPerson]);
      })
      .catch((error) => {
        console.error("Error adding a person", error);
      });
  };



 



    return (
      <div className="add-person-modal-container">
        <div className="add-person-modal-content">
          {" "}
          <div>
            <AddPerson addPerson={addPerson} />
            <button
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
};

export default AddPersonalModal;