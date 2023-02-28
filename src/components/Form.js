import { useState, React } from "react";
import "./styling/Form.scss";
import cuddling from "./styling/cuddling.png";
import pawprint from "./styling/pawprint.svg";
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
  const spayed_or_neutered = useControlledInput("");
  const city = useControlledInput("");
  const description = useControlledInput("");
  const photo_url = useControlledInput("");

  /**
   *
   * @param { Function } e: A callback function that triggers upon form submission.
   * Stores the form values in an object.
   * The object is captured in the addPet function passed from App.js.
   */
  function onSubmit(e) {
    e.preventDefault();

    const value_toBoolean = spayed_or_neutered.value === "Yes" ? true : false;
    const age_toNumber = Number(age.value);

    const newPetProfile = {
      name: name.value,
      breed: breed.value,
      age: age_toNumber,
      sex: sex.value,
      size: size.value,
      spayed_or_neutered: value_toBoolean,
      city: city.value,
      description: description.value,
      photo_url: "in process",
    };

    props.addPet(newPetProfile);
  }

  return (
    <div id="body">
      <div id="page-container">
        <div id="header">
          <h1>
            All's well that friends well
            <img src={pawprint} id="pawprint" alt="pawprint-icon" />
          </h1>
          <img src={cuddling} id="pets-cuddling" alt="cuddling-pets" />
        </div>
        <div id="container">
          <h1>
            Create Your Pet's <b>Paw</b>file
          </h1>
          <form className="new-profile" onSubmit={onSubmit} autoComplete="on">
            {/* <br /> */}
            <div id="labels">
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
                  placeholder="enter your pets age"
                  maxLength="2"
                  min="0"
                  type="number"
                  required
                />
              </label>
              {/* <br /> */}
            </div>

            <label htmlFor="sex" className="radios">
              <span className="radio-tags">Gender :</span>
              <input {...sex} value="Male" type="radio" name="sex" required />
              <span className="sex">Male</span>
              <input {...sex} value="Female" type="radio" name="sex" />
              <span className="sex">Female</span>
            </label>

            <label htmlFor="spayed_or_neutered" className="radios">
              <span className="radio-tags">Spayed / Neutered :</span>
              <input
                {...spayed_or_neutered}
                value="Yes"
                type="radio"
                name="spayed_or_neutered"
                required
              />
              <span className="spayed_or_neutered">Yes</span>
              <input
                {...spayed_or_neutered}
                value="No"
                type="radio"
                name="spayed_or_neutered"
              />
              <span className="spayed_or_neutered">No</span>
            </label>

            <label htmlFor="size" className="radios">
              <span className="radio-tags">Size :</span>
              <input
                {...size}
                value="Small"
                type="radio"
                name="size"
                required
              />
              <span className="size">Small (up to 24 lbs)</span>
              <input {...size} value="Medium" type="radio" name="size" />
              <span className="size">Medium (25- 59 lbs)</span>
              <input {...size} value="Large" type="radio" name="size" />
              <span className="size">Large (over 60 lbs)</span>
            </label>
            <br />

            <label htmlFor="city" className="text-input">
              city
              <br />
              <input {...city} placeholder="City" required />
            </label>

            <label
              htmlFor="description"
              className="text-input"
              id="description"
            >
              Description <br />
              <input
                {...description}
                placeholder="How would your pet describe themselves?"
                minLength="3"
                required
              />
            </label>
            <br />
            <button type="submit">READY TO PLAY</button>
          </form>
        </div>
      </div>
    </div>
  );
}
