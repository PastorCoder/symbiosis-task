import React, { useState, useEffect } from "react";
import axios from "axios";
import ListOfPeople from "./ListOfPeople";
import AddPerson from "./AddPerson";
import EditPerson from "./EditPerson";



const DisplayListOfPeople = () => {
    const [people, setPeople] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentPerson, setCurrentPerson] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    

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


   {/** const addPerson = (newPerson) => {
        //Add a new person to the mock API
        axios
            .post(
                "https://64f645fd2b07270f705e5970.mockapi.io/api/peopleList/users", newPerson)
            .then((response) => {
                setPeople([...people, response.data]);
            })
            .catch((error) => {
                console.error("Error adding a person", error);
            });
    }; */}



    const deletePerson = (id) => {
        axios
            .delete(
                `https://64f645fd2b07270f705e5970.mockapi.io/api/peopleList/users/${id}`
            )
            .then(() => {
                setPeople(people.filter((person) => person.id !== id));
            })
            .catch((error) => {
                console.error("Error adding a person", error);
            });
    };


    const editPerson = (person) => {
        //set editing mode and currentPerson state for editing
        setEditing(true);
        setCurrentPerson(person);
    };


    const updatePerson = (updatedPerson) => {
        //Update a person in the mock API
        axios
          .put(
            `https://64f645fd2b07270f705e5970.mockapi.io/api/peopleList/users/${updatedPerson.id}`, updatedPerson
          )
            .then(() => {
                setPeople((prevPeople) => prevPeople.map((person) => person.id === updatedPerson.id ? updatedPerson : person));
                setEditing(false);
                setCurrentPerson(null);
          })
            .catch((error) => {
              console.error("Error updating a person", error)
          });
    }




    return (
      <div>
        {editing ? (
          <EditPerson
            currentPerson={currentPerson}
            updatePerson={updatePerson}
            setEditing={setEditing}
          />
        ) : (
          <div>
            {/**<AddPerson addPerson={addPerson} /> */}
            <ListOfPeople
              people={people}
              deletePerson={deletePerson}
              editPerson={editPerson}
            />
          </div>
        )}
      </div>
    );
};


export default DisplayListOfPeople;
