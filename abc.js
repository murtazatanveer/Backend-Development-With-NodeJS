let pname = "galaxy";
fetch(`http://localhost:3000/search?productname=${pname}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(`Error Accuring while finding ${pname}, Error ${e}`);
  });

let pcat = "CLOTHING";
fetch(`http://localhost:3000/products/category/${pcat}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(`Error Accuring while finding category ${pcat}, Error ${e}`);
  });
