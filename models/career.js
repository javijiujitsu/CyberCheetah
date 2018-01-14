const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const careerSchema = new Schema(
	{
		name:{type: String,
		required: true
	},
    certification:{
			type: String,
      required: true
		},
    resource:{
			type: String
		},
		user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User' // "ref" is the string name of a model that the ID refers to
	},            // you NEED "ref" to use "populate()"
	picture: { type: String }
},
{
	timestamps: true
}
);
const CareerModel = mongoose.model("Career", careerSchema);

module.exports = CareerModel;
