// Api Testing for Express Middleware Practice Problem

// fetch("http://localhost:3000/protected", {
//   method: "GET",

//   headers: {
//     "x-api-key": "abc123",
//   },
// })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log("ERROR:", e);
//   });

fetch("http://localhost:3000/users", {
  method: "POST",

  headers: { "Content-Type": "application/json" },

  body: JSON.stringify({ name: "Murtaza", age: 23 }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log("ERROR:", e);
  });
