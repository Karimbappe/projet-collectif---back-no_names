const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
	{
		productId: {type: String, required: true, unique: true},
		title: {type: String, required: true},
		comment: {type: String, required: true},
		rating: {type: Number},
	},
	//current time and date
	{timestamps: true}
);
module.exports = mongoose.model("Review", ReviewSchema);
