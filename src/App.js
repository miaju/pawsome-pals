import { useState, React } from "react";
import './App.css';
import LoginButton from 'components/LoginButton';
import LogoutButton from 'components/LogoutButton';
import Profile from 'components/Profile';
import Form from 'components/Form';

function App() {
  const [pets, setPets] = useState([]);

  /**
   *
   * @param { Object } pet: An object of objects containing values for new pet profiles
   * Object { value: }
   * Values: name, fixed, breed, sex, age, location, description, size, housetrained
   */
  function addPet(pet) {
    setPets([...pets, pet]);
  }

  console.log(pets);

  return (
    <div className="App">

    <LoginButton/>
    <LogoutButton/>
    <Profile/>
    <Form addPet={addPet}/>
    </div>

  );
}

export default App;
