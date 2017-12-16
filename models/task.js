const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema(
	{
		name:{
			type: String,
			required: [true, "name required."]
		},
		description:{
			type: String,
		},
		estimatedlength:{
			type: Number,
		},
    resource:{
			type: String,
		},
	},
	{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
