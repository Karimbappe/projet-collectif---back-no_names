const review = require("../models/Review");
const router = require("express").Router();

router.post("/product/review", async (req, res) => {
	const newReview = new review({
		userId: req.body.userId,
		username: req.body.username,
		productId: req.body.productId,
		titlename: req.body.titlename,
		comment: req.body.comment,
		ratingproduct: req.body.ratingproduct,
	});
	try {
		const savedReview = await newReview.save();
		res.status(201).json(savedReview);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
