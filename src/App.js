import { useState, React, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// import LoginButton from 'components/LoginButton';
// import LogoutButton from 'components/LogoutButton';
// import Profile from 'components/Profile';
import Form from "components/Form";
import NavBar from "components/NavBar";
import Profile from "components/Profile";

import Home from "components/Home";
import PetList from "components/PetList"
import Advanced from "components/MatchListTest";
import shuffle from "components/helpers/shuffleArray";
import MatchList from "components/MatchList";
import MatchDetail from "components/MatchDetail";



function App() {
  const [pets, setPets] = useState([]);
  const [matches, setMatches] = useState([]);
  const { user, loginWithRedirect, logout, isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    const getData = async () => {
      await axios.get("http://localhost:8080/api/pets")
      .then((response) => {
        const data = Object.entries(response.data).map(([key, value]) => ({ ...value }))
        setPets(shuffle(data));
      });
      await axios.get("http://localhost:8080/api/matches")
      .then((response) => {
        const data = Object.entries(response.data).map(([key, value]) => ({ ...value }))
        setMatches(data);
      });
    }

    getData().catch(console.error);
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

  // An array containing an object of objects => pets[0]
  //console.log(pets[0]);


  return (
    <div>
      <BrowserRouter>
        <NavBar user={user} isLoading={isLoading} loginWithRedirect={loginWithRedirect} logout={logout}></NavBar>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home user={user} isLoading={isLoading} logout={logout}/>} />
            <Route path="/pets/new" element={<Form addPet={addPet} />} />
            <Route path="/pets/view" element={<PetList pets={pets} />} />
            <Route path="/profile" element={<Profile user={user} logout={logout} isAuthenticated={isAuthenticated}/>} />
            <Route path="/explore" element={<Advanced pets={pets} />}/>
            <Route path="/matches" element={<MatchList matches={matches} />}/>
            <Route path="/matches/:id" element={<MatchDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
