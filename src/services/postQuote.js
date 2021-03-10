export const postQuote = (data) => {
  fetch(`ROUTE/api/xx`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};
