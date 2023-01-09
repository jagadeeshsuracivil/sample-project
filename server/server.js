const express = require("express");
const  userRouter  = require("./routes/user-routes");
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/users",userRouter);


app.listen(5000, () => console.log("app started at 5000..."));
