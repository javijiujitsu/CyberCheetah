const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username:{
			type: String,
			required: [true, "Username required."]
		},
		password:{
			type: String,
			required: [true, "Password required."]
		},
		email:{
			type: String,
			required: [true, "Password required."]

		},
		idcareer:[{
			type: Number,
			min: 0,
			max: 5
		}],
		idtask:[{
			name: String,
			year: String
		}],

	},
	{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
