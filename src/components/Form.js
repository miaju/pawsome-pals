import { useState, React } from "react";
import "./styling/Form.scss";

/**
 *
 * @param { Object } props: addPet function
 * @returns the Form view for new pet profiles.
 */
export default function Form(props) {
  /**
   * @param { String } initial
   * @returns the current state based on the user's form input.
   */
  function useControlledInput(initial) {
    const [value, setValue] = useState(initial);

    return {
      value,
      onClick: (event) => setValue(event.target.value),
      onChange: (event) => setValue(event.target.value),
    };
  }

  const name = useControlledInput("");
  const breed = useControlledInput("");
  const age = useControlledInput("");
  const sex = useControlledInput("");
  const size = useControlledInput("");
  const fixed = useControlledInput("");
  const location = useControlledInput("");
  const description = useControlledInput("");

  /**
   *
   * @param { Function } e: A callback function that triggers upon form submission.
   * Stores the form values in an object.
   * The object is captured in the addPet function passed from App.js.
   */
  function onSubmit(e) {
    e.preventDefault();

    const newProfile = {
      name,
      breed,
      age,
      sex,
      size,
      fixed,
      location,
      description,
    };

    props.addPet(newProfile);
    // console.log(newProfile)
  }

  return (
    <div id="container">
      <form className="new-profile" onSubmit={onSubmit} autoComplete="off">
        <h1>Create Your Pet Profile</h1>
        <br />
        <label htmlFor="name" className="text-input">
          Name
          <br />
          <input
            {...name}
            id="name"
            placeholder="enter your pet's name"
            required
          />
        </label>

        <label htmlFor="breed" className="text-input">
          Breed
          <br />
          <input
            {...breed}
            id="breed"
            placeholder="enter your pet's breed"
            required
          />
        </label>

        <label htmlFor="age" className="text-input">
          Age
          <br />
          <input
            {...age}
            id="age"
            placeholder="enter your pet's age"
            required
          />
        </label>
        <br />

        <label htmlFor="sex" className="radios">
          <span className="radio-tags">Gender :</span>
          <input {...sex} value="Male" type="radio" name="sex" required />
          <span className="sex">Male</span>
          <input {...sex} value="Female" type="radio" name="sex" />
          <span className="sex">Female</span>
        </label>

        <label htmlFor="fixed" className="radios">
          <span className="radio-tags">Spayed / Neutered :</span>
          <input {...fixed} value="Yes" type="radio" name="fixed" required />
          <span className="fixed">Yes</span>
          <input {...fixed} value="No" type="radio" name="fixed" />
          <span className="fixed">No</span>
        </label>

        <label htmlFor="size" className="radios">
          <span className="radio-tags">Size :</span>
          <input {...size} value="small" type="radio" name="size" required />
          <span className="size">Small (up to 24 lbs)</span>
          <input {...size} value="medium" type="radio" name="size" />
          <span className="size">Medium (25- 59 lbs)</span>
          <input {...size} value="large" type="radio" name="size" />
          <span className="size">Large (over 60 lbs)</span>
        </label>
        <br />

        <label htmlFor="location" className="text-input">
          Location
          <br />
          <input {...location} placeholder="City" required />
        </label>

        <label htmlFor="description" className="text-input" id="description">
          Description <br />
          <input
            {...description}
            placeholder="How would your pet describe themselves?"
            required
          />
        </label>
        <br />
        <button type="submit">PLAYTIME!</button>
      </form>
    </div>
  );
}
