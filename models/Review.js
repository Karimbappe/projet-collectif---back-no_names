const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
	{
		userId: {type: String, required: true, unique: true},
		username: {type: String, required: true, unique: true},
		productId: {type: String, required: true, unique: true},
		titlename: {type: String, required: true},
		comment: {type: String, required: true},
		ratingproduct: {type: Number},
	},
	//current time and date
	{timestamps: true}
);
module.exports = mongoose.model("Review", ReviewSchema);
