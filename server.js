const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

//const getProductRoute = require("./routes/getProduct")
const dotenv = require("dotenv");
dotenv.config();

//to avoid CORS cross origin errors since we will use react and node server
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//to be able pass json data
app.use(express.json());

//routes
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", productRoute);
//app.use("/api", getProductRoute);

//connect to DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log(err));


  //filter
app.use('/filter', (req, res, next) => {
  const filters = req.query;
  const filteredUsers = productRoute.filter(user => {
    let isValid = true;
    for (key in filters) {
      console.log(key, user[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredUsers);
});

//launching a server
app.listen(process.env.PORT || 8000, () =>
  console.log("server running on 8000...")
);
