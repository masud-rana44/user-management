// Importing dependencies
import express from "express";
import bodyParser from "body-parser";
// import cors from "cors";

// Initializing the app
const app = express();

// Adding middleware
app.use(bodyParser.json());
// app.use(cors());

// Defining routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  // Save user to database
  res.send(`User ${name} with email ${email} has been saved to the database.`);
});

// Starting the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
