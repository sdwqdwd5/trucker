var mongoose = require("mongoose");
var truckSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Comment"
	}]
});

module.exports = mongoose.model("Truck", truckSchema);