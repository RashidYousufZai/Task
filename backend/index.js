const express = require("express");
const database = require("./database/db.js");
const dotenv = require("dotenv");
const app = express();
const authRoute = require("./routes/auth.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

database();

app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log("App is running");
});
