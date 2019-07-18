const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
  name: {
		type: String,
		required: true
	},
  lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	googleId: String,
	role: {
		type: String,
		required: true,
		enum: ['AGENTE', 'EMPLEADO', 'ADMIN'],
		default: 'AGENTE'
	},
	loginAttempts: Number,
	isActive: {
		type: Boolean,
		default: true
	},
	isPremium: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
