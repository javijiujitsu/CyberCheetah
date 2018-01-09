const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const careerSchema = new Schema(
	{
		name:{type: String, required: [true, "name required."] },
		description:{ type: String, },
		universities:{ type: String },
    certification:{ type: String,},
    resource:{ type: String,},
    idtask:[{  type: Schema.Types.ObjectId, ref: 'Task'}],
	},
	{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);

const CareerModel = mongoose.model("Career", careerSchema);

module.exports = CareerModel;
