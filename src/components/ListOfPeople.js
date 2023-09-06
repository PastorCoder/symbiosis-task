import React, { useEffect, useState } from "react";
import axios from "axios";
import Person from "./Person";
import EditPersonModal from "./EditPersonModal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CreateIcon from "@mui/icons-material/Create";
import "../styles/users-table.css";



function ListOfPeople({ deletePerson }) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [showAddPersonModal, setShowAddPersonModal] = useState(false);

  useEffect(() => {
    //fetch data of users from mockapi.io
    axios
      .get("https://64f645fd2b07270f705e5970.mockapi.io/api/peopleList/users")
      .then((response) => {
        console.log(response);
          if (response.status === 200) {
            //update if data is valid
              setPeople(response.data);
              setLoading(false);
          } else {
            //   data is not in the expected format
              setError("Error: Unexpected status code ", response.status);
              setLoading(false);
        }
      })
      .catch((error) => {
        console.log("An error occurred while fetching the data", error);
          setLoading(false);
          setError("An error occurred while fetching data");
      });
  }, []);
    
    
    
    //function to handle registration when the form is submitted in AppPersonModal


    
    const addNewRow = () => {
        setShowAddPersonModal(true);
   }

    const removeRow = (id) => {
        //remove the person with the specified id from the people array 
        setPeople(people.filter((person) => person.id !== id));
    }



    const editPerson = (id, updatedPerson) => {
        // Find the index o the person with the given id
        const index = people.findIndex((person) => person.id === id);


        if (index !== -1) {
            // Create a copy of the people array
            const updatedPeople = [...people];

            //update the person at the found index with the updatedPerson data
            updatedPeople[index] = updatedPerson;

            //update the state with the updated array
            setPeople(updatedPeople);
        };
    }


//function to show edit modal
    const handleEditClick = (person) => {
        setSelectedPerson(person);
        setShowEditModal(true)
    }


    //function to save the edited person
    const handleSaveEdit = (editedPerson) => {

        // update the person's data in the people array
        const updatedPeople = people.map((person) => person.id === editedPerson.id ? editedPerson : person);
        setPeople(updatedPeople);
        setShowEditModal(false);
    }

     const formatDateOfBirth = (dateOfBirth) => {
       const date = new Date(dateOfBirth);

       const formattedDate = date.toISOString().split("T")[0];

       return formattedDate;
     };
    



  if (loading) {
    return <div>Loading....</div>;
    };


  if (error) {
      return <div>Error: { error }</div>;
    };
    

  if (people.length === 0) {
    return <div>No people to display</div>;
    };

    console.log("peaople state", people);

  return (
    <div>
      <h2>List of People</h2>
      <button onClick={addNewRow} className="add-user">
        Register User
        <PersonAddIcon /> {/**Add New Row */}
      </button>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{formatDateOfBirth(person.dateOfBirth)}</td>
              <td>
                <button onClick={() => removeRow(person.id)}>
                  <PersonRemoveIcon />
                </button>
                <button onClick={() => handleEditClick(person)}>
                  <CreateIcon />
                </button>
                <Person person={person} editPerson={editPerson} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/**<ul>
        {people.map((person) => (
          <li key={person.id}>
                <Person person={person} />
                <button onClick={() => editPerson(person)}>Edit</button>
                <button onClick={() => deletePerson(person.id)}>Delete</button>
          </li>
        ))}
      </ul>  */}

      {showEditModal && (
        <EditPersonModal
          person={selectedPerson}
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

export default ListOfPeople;