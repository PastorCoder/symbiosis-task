import React, { useState } from "react";


const Person = ({ person, editPerson }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedPerson, setUpdatedPerson] = useState(person);

    //check if person prop is defined before trying to access the properties.
    // if (!person) {
    //     return <div>No person data available</div>
    // }

    
    
    const handleEditClick = () => {
        setIsEditing(true);
    }
    
    const handleSaveClick = () => {
        setIsEditing(true);
    }

    const handleInputChange = (e) => {
        editPerson(person.id, updatedPerson);
        setIsEditing(false)
    };

    return (
      <div>
        {/**<p><strong>Name:</strong>{person.name}</p>
        <p>
          <strong>Email:</strong> {person.email}
        </p>
        <p>
          <strong>Date of birth:</strong> {person.dateOfBirth}
        </p> */}
        {isEditing ? (
          <div>
            <input
              type="text"
              name="name"
              value={updatedPerson.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="email"
              value={updatedPerson.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="dateOfBirth"
              value={updatedPerson.dateOfBirth}
              onChange={handleInputChange}
            />
            <button onClick={handleSaveClick}>Save</button>
          </div>
            ) : (
        ""
          
        )}
      </div>
    );
}
export default Person;