import { useState, React } from "react";
import  { BrowserRouter, Routes, Route} from "react-router-dom";

// import LoginButton from 'components/LoginButton';
// import LogoutButton from 'components/LogoutButton';
// import Profile from 'components/Profile';
import Form from 'components/Form';
import NavBar from 'components/NavBar';
import Profile from "components/Profile";


function App() {
  const [pets, setPets] = useState([]);

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
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
