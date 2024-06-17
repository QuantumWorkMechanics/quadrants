const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

//const mimir_url = "https://mimir-production.up.railway.app/";
const mimir_url = "http://localhost:3000/";
export async function getData(tfID, setter) {
  const responses = await fetch(mimir_url + "tf-scatter/" + tfID, requestOptions)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log({ error });
    });

  const dataSet = await responses.json();
  console.log({ dataSet });
  setter(dataSet);
}
