export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders")
  .then((response) => response.json());
};

export const postOrder = (nameVal, ingredientVals)=>
{
  console.log(JSON.stringify({name:nameVal, ingredients:ingredientVals}))
  fetch("http://localhost:3001/api/v1/orders", {
    method:'POST',
    body: JSON.stringify({name:nameVal, ingredients:ingredientVals}),
    headers:{
      'Content-Type':'application/json'
    }
  })
  .then(response=> response.json())
  .catch((err) => console.error("Error fetching:", err));
};