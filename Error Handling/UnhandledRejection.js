process.on("unhandledRejection", (err) => {
  console.log(err.message);
});

async function getData() {
  throw new Error("Failed to Fetch Data");
}

getData();
