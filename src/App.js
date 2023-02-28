import { useState, React, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// import LoginButton from 'components/LoginButton';
// import LogoutButton from 'components/LogoutButton';
// import Profile from 'components/Profile';
import Form from "components/Form";
import NavBar from "components/NavBar";
import Profile from "components/Profile";

import Home from "components/Home";
import PetList from "components/PetList";

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/pets").then((response) => {
      const data = Object.entries(response.data).map(([key, value]) => ({
        ...value,
      }));
      setPets(data);
    });
  }, []);

  /**
   *
   * @param { Object } pet: An object of objects containing values for new pet profiles
   * Values: name, fixed, breed, sex, age, location, description, size, housetrained
   */
  function addPet(pet) {
    const id = pets.length + 1;
    const newPet = {};

    const petDetails = {
      id,
      user_id: 100,
      ...pet,
    };

    newPet[id] = petDetails;
    console.log(newPet);

    return axios
      .put(`http://localhost:8080/api/pets/${id - 1}`, { newPet })
      .then(() => {
        console.log("Made it here!");
        setPets([...pets, newPet]);
      });
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets/new" element={<Form addPet={addPet} />} />
            <Route path="/pets/view" element={<PetList pets={pets} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
