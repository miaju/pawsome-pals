import { useState, React, useEffect } from "react";
import  { BrowserRouter, Routes, Route} from "react-router-dom";
import axios from "axios";

import './App.css';
import Form from 'components/Form';
import NavBar from 'components/NavBar';
import Profile from "components/Profile";
import PetList from "components/PetList"


function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/pets")
      .then((response) => {
        const data = Object.entries(response.data).map(([key, value]) => ({...value}))
        console.log(data)
        setPets(data);
      });
  }, []);

  console.log("PETS", pets.length)

  /**
   *
   * @param { Object } pet: An object of objects containing values for new pet profiles
   * Values: name, fixed, breed, sex, age, location, description, size, housetrained
   */
  function addPet(pet) {
    setPets([...pets, pet]);
  }

  // An array containing an object of objects => pets[0]
  console.log(pets[0]);

  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <div className="content">
          <Routes>
            <Route path="/pets/new" element={<Form addPet={addPet}/>}/>
            <Route path="/pets/view" element={<PetList pets={pets}/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
