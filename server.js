//server express
const express = require("express");
const app = express();
const User = require("./models/User")


//cors
const cors = require("cors");


//BDD
const mongoose = require("mongoose");

//route importation
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const reviewRoute = require("./routes/review");




app.use(express.urlencoded({ extended: true}));
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
//pour passer de la données json
app.use(express.json());

//to avoid CORS cross origin errors since we will use react and node server
app.use(cors()); 
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

//dot env sert a mettre de coté tes mdp et pas les transferer par git 
const dotenv = require("dotenv");
dotenv.config();

//routes

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/product", reviewRoute);

//connect to MONGODB
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("DB connection established"))
	.catch((err) => console.log(err));

//lance le server
app.listen(process.env.PORT || 8000, () =>
	console.log("server running on 8000...")
);
