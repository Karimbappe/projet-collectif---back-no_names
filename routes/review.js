const review = require("../models/Review");
const router = require("express").Router();

router.post("/review", async (req, res) => {
	const newReview = new review({
		productId: req.body.productId,
		title: req.body.title,
		comment: req.body.comment,
		rating: req.body.ratingproduct,
	});
	try {
		const savedReview = await newReview.save();
		res.status(201).json(savedReview);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
