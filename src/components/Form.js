import { useState, React } from "react";

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
    // console.log(newProfile)
  }


  return (
    <div className="container">
    <form className="new-profile" onSubmit={onSubmit} autoComplete="off">

    <label htmlFor="name">Name*</label><br/>
      <input {...name} id="name" placeholder=" pet's name" required /><br/>

    <label htmlFor="breed">Breed</label><br/>
      <input {...breed} id="breed" placeholder=" breed" /><br/>

    <label htmlFor="age">Age</label><br />
      <input {...age} id="age" placeholder=" age" /><br/>

    <label htmlFor="sex">Sex</label><br />
      <input {...sex} value="Male" type="radio" name="sex" id="sex" /> Male<br/>
      <input {...sex} value="Female" type="radio" name="sex" id="sex" /> Female<br/>

    <label htmlFor="size">Size</label><br />
      <input {...size} value="xs (2 - 12 lbs)" type="radio" name="size" id="size" /> xs (2 - 12 lbs)<br/>
      <input {...size} value="s (13 - 24 lbs)" type="radio" name="size" id="size" /> s (13 - 24 lbs)<br/>
      <input {...size} value="m (25 - 59 lbs)" type="radio" name="size" id="size" /> m (25 - 59 lbs)<br/>
      <input {...size} value="L (60 - 99 lbs)" type="radio" name="size" id="size" /> L (60 - 99 lbs)<br/>
      <input {...size} value="XL (over 100 lbs)" type="radio" name="size" id="size" /> XL ( > 100 lbs)<br/>

    <label htmlFor="fixed">Spayed/Neutered*</label><br />
      <input {...fixed} value="Yes" type="radio" name="fixed" id="fixed" required /> Yes<br/>
      <input {...fixed} value="No" type="radio" name="fixed" id="fixed" /> No<br/>

    <label htmlFor="trained">Housetrained*</label><br />
      <input {...housetrained} value="Yes" type="radio" name="trained" id="trained" required /> Yes<br/>
      <input {...housetrained} value="No" type="radio" name="trained" id="trained" /> No<br/>

    <label htmlFor="location">Location*</label><br />
      <input {...location} id="location" placeholder=" city" required /><br/>

    <label htmlFor="description">Description</label><br />
      <input {...description} id="description" placeholder=" How would your pet describe theirself?" /><br/>

      <button type="submit">Sign up your pet!</button>
    </form>
    </div>
  );
}
