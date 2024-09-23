import { useState } from "react";

function OrderForm(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  let submittable = false;
  function handleSubmit(e) {
    e.preventDefault();
    console.log(name)
    console.log(ingredients);
    // clearInputs();
    // if (submittable!==false)
    // {
    //   clearInputs()
    // }
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  function addName(newName) {
    setName(newName);
    // if (name !== "" && ingredients.length !== 0) {
    //   submittable = true;
    // }
    // else {
    //   submittable = false
    // }
  }
  function addIngredient(e) {
    // e.preventDefault();
    console.log(e)
    setIngredients([...ingredients, e])
    console.log(ingredients)
    // if (name !== "" && ingredients.length !== 0) {
    //   submittable = true;
    // }
    // else {
    //   submittable = false
    // }
  }

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        value={ingredient}
        onClick={(e) => addIngredient(e.target.name)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => addName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      {/* <button onClick={(e) => handleSubmit(e)}>Submit Order</button> */}
    </form>
  );
}

export default OrderForm;
