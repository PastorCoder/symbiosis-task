import React, { useState } from "react";



const AddPerson = ({ addPerson }) => {
    const [newPerson, setNewPerson] = useState({
        name: "",
        email: "",
        dateOfBirth: ""
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPerson({ ...newPerson, [name]: value });
        // setPeople((prevPeople) => [...prevPeople, newPerson]);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPerson.name && newPerson.email && newPerson.dateOfBirth) {
            //call the addPerson function from the parent component to add the new person
            addPerson(newPerson);

            //reset the form field
            setNewPerson({
                name: "",
                email: "",
                dateOfBirth: "",
            });
        }
    }


    return (
        <div>
            <h2>Add New Person</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newPerson.name}
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
                        value={newPerson.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={newPerson.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Register User</button>
                </div>
            </form>
        </div>
    );
};

export default AddPerson;