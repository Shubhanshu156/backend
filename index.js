const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const createController = require("./controllers/createController");
const readController = require("./controllers/readController");
const updateController = require("./controllers/updateController");
const deleteController = require("./controllers/deleteController");

const app = express();
const port = 8080;
const password = "pfF9ftClQPnq55Mm"; 
const conn_str = `mongodb+srv://sharmashubhanshu2712:${password}@cluster0.qi4aken.mongodb.net/?retryWrites=true&w=majority`;

app.use(bodyParser.json());

mongoose.connect(conn_str, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/employees", createController);
app.use("/employees", readController);
app.use("/employees", updateController);
app.use("/employees", deleteController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
