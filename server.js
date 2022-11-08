//server express
const express = require("express");
const app = express();

//BDD
const mongoose = require("mongoose");

//route importation
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const reviewRoute = require("./routes/review")

//dot env sert a mettre de coté tes mdp et pas les transferer par git
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

//pour passer de la données json
app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api", reviewRoute)

//connect to MONGODB
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("DB connection established"))
	.catch((err) => console.log(err));

//lance le server
app.listen(process.env.PORT || 8020, () =>
	console.log("server running on 8020...")
);
