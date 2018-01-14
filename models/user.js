const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    encryptedPassword: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
