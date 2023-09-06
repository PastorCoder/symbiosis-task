import React, { useState, useEffect } from "react";
import "../styles/edit-person-modal.css";



const EditPersonModal = ({ person, onSave, onClose }) => {
    const [editedPerson, setEditedPerson] = useState({ ...person });



    useEffect(() => {
        //update the form field when the person prop changes
        setEditedPerson({ ...person })
    }, [person]);


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedPerson({...editedPerson, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //call the unsave function with editedPerson data
        onSave(editedPerson);
    }

    const formatDateOfBirth = (dateOfBirth) => {
        const date = new Date(dateOfBirth);

        const formattedDate = date.toISOString().split("T")[0];

        return formattedDate;
    }

    return (
      <div className="edited-person-modal-container">
        <div className="modal-content">
          <div className="header-and-close-icon">
            <h2>Edit Person</h2>
            {/**<CloseIcon onClick={onClose} className="edit-close-icon" /> */}
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedPerson.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedPerson.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formatDateOfBirth(editedPerson.dateOfBirth)}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <button type="button" onClick={onClose}>
                Close
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
};
export default EditPersonModal;