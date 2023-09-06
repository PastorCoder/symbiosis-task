import React, { useState, useEffect } from "react";

const EditPerson = ({ currentPerson, updatePerson, setEditing, onSave }) => {
    const [editedPerson, setEditedPerson] = useState({ ...currentPerson });


    useEffect(() => {
        setEditedPerson({ ...currentPerson });
    }, [currentPerson]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPerson({ ...editedPerson, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        onSave(editedPerson)

        if (editedPerson.name && editedPerson.email && editedPerson.dateOfBirth) {
            
            //call the updatePerson functionfrom the parent componentto update the person
            updatePerson(editedPerson);


            //Reset the form fields and exit editing mode
            setEditedPerson({
                id: "",
                name: "",
                email: "",
                dateOfBirth: ""
            });
            setEditing(false);
        }
    };




    return (
      <div>
        <h2>Edit Person</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedPerson.name}
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={editedPerson.dateOfBirth}
              onChange={handleChange}
              required
            />
                </div>
                <div>
                    <button type="submit">Update</button>
                    <button onClick={() => setEditing(false)}>Cancel</button>
                </div>
        </form>
      </div>
    );
};


export default EditPerson;