import { useState } from "react";
import { postOrder } from "../../apiCalls";

function OrderForm(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  let submittable = false;
  function handleSubmit(e) {
    e.preventDefault();
    
    // clearInputs();
    console.log(name!=="")
    console.log(ingredients.length)
    if (name !== "" && ingredients.length !== 0) {
      clearInputs()
      postOrder(name, ingredients);
    }
    else {
      console.log("not submittable")
    }
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  function addName(newName) {
    // e.preventDefault();
    setName(newName.target.value);
    if (name !== "" && ingredients.length !== 0) {
      submittable = true;
    }
    else {
      submittable = false
    }
  }
  function addIngredient(e) {
    e.preventDefault();
    setIngredients([...ingredients, e.target.value])
    console.log(ingredients)
    if (name !== "" && ingredients.length !== 0) {
      submittable = true;
    }
    else {
      submittable = false
    }
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
        onClick={(e) => addIngredient(e)}
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
        onChange={(e) => addName(e)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
