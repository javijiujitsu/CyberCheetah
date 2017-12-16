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
			required: [true, "Email required."]
		},
		idcareer:[{
			type: Schema.Types.Mixed,
      id: String,
      date: Date, default: new Date(),
			required: true
		}],
    idtask:[{
      type: Schema.Types.ObjectId,
			id: String,
		}],

	},
	{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
