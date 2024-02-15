const express = require("express");
const { Connection } = require("./config/d");
const { userRouter } = require("./routes/userroutes");
const { notesRouter } = require("./routes/notesrouter");
const cors=require("cors")
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors())
app.use("/users", userRouter);
app.use("/notes", notesRouter);
app.listen(process.env.port, async (req, res) => {
  try {
    await Connection;
    console.log("connected with db");
    console.log(`server is running at ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
