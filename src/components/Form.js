import { useState, React } from "react";
import './styling/Form.scss'

export default function Form(props) {
  function useControlledInput(initial) {
    const [value, setValue] = useState(initial);

    return {
      value,
      onClick: (event) => setValue(event.target.value),
      onChange: (event) => setValue(event.target.value)
    };
  }

  const name = useControlledInput("");
  const breed = useControlledInput("");
  const age = useControlledInput("");
  const sex = useControlledInput("");
  const size = useControlledInput("");
  const housetrained = useControlledInput("");
  const fixed = useControlledInput("");
  const location = useControlledInput("");
  const description = useControlledInput("");

  function onSubmit (e) {
    e.preventDefault();

    const newProfile = {
      name,
      breed,
      age,
      sex,
      size,
      housetrained,
      fixed,
      location,
      description
    }

    props.addPet(newProfile);
    // console.log(newProfile)
  }

  return (
    <div className="container">
    <form className="new-profile" onSubmit={onSubmit} autoComplete="off">

      <div className="text-input">
    <label htmlFor="name">
      Name* <br/>
      <input {...name} id="name" placeholder="Enter your pet's name" required /><br/><br/>
      </label>

    <label htmlFor="breed">
      Breed <br/>
      <input {...breed} id="breed" placeholder="Enter your pet's breed" /><br/><br/>
      </label>

    <label htmlFor="age">
      Age <br />
      <input {...age} id="age" placeholder="Enter your pet's age" /><br/><br/>
      </label>
      </div>

<div className="radios">
    <label htmlFor="sex">
      Sex <br />
      <input {...sex} value="Male" type="radio" name="sex" /> Male<br/>
      <input {...sex} value="Female" type="radio" name="sex" /> Female<br/><br/>
      </label>

    <label htmlFor="fixed">
      Spayed/Neutered* <br />
      <input {...fixed} value="Yes" type="radio" name="fixed" required /> Yes<br/>
      <input {...fixed} value="No" type="radio" name="fixed" /> No<br/><br/>
      </label>

    <label htmlFor="trained">
      Housetrained* <br />
      <input {...housetrained} value="Yes" type="radio" name="trained" required /> Yes<br/>
      <input {...housetrained} value="No" type="radio" name="trained" /> No<br/><br/>
    </label>

    <label htmlFor="size">
      Size* <br />
      <input {...size} value="xs (2 - 12 lbs)" type="radio" name="size" required /> xs (2 - 12 lbs)<br/>
      <input {...size} value="s (13 - 24 lbs)" type="radio" name="size" /> s (13 - 24 lbs)<br/>
      <input {...size} value="m (25 - 59 lbs)" type="radio" name="size" /> m (25 - 59 lbs)<br/>
      <input {...size} value="L (60 - 99 lbs)" type="radio" name="size" /> L (60 - 99 lbs)<br/>
      <input {...size} value="XL (over 100 lbs)" type="radio" name="size" /> XL ( > 100 lbs)<br/><br/>
    </label>
      </div>

      <div className="text-input">
    <label htmlFor="location">
      Location* <br />
      <input {...location} id="location" placeholder="City, Province" required /><br/><br/>
    </label>
      </div>

    <label htmlFor="description">
    Description <br />
      <input {...description} id="description" placeholder="How would your pet describe themselves?" /><br/>
      </label>

      <button type="submit">Sign up your pet!</button>
    </form>
    </div>
  );
}
