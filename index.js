import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

app.use(bodyParser.urlencoded({ extended: true }));


//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "aarchi";
const yourPassword = "IAmTheBest";
const yourAPIKey = "aa22be69-81bf-4a5f-aca9-be779d9ff443";
const yourBearerToken = "a2a6b900-d2a8-4dc1-b76e-99d9573a90ec";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/random"
    );
    // const result = JSON.parse(response);
    const result=response.data;
    console.log(response);
    res.render("index.ejs", { content: result.secret});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
