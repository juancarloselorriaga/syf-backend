const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	info: {
		fullName: {
			type: String,
			required: false,
			default: 'Usuario'
		},
		birthdate: {
			type: Date,
			required: false
		},
		address: {
				street: {
					type: String,
					required: false
				},
				number: {
					type: String,
					required: false
				},
				neighborhood: {
					type: String,
					required: false
				},
				municipality: {
					type: String,
					required: false
				},
				state: {
					type: String,
					required: false
				},
				cp: {
					type: String,
				}
		},
		phone: {
			type: String,
			required: false
		},
		mobile: {
			type: String,
			required: false
		},
		rfc: {
			type: String,
			required: false
		}
	},
	role: {
		type: String,
		required: true,
		enum: ['AGENTE', 'EMPLEADO', 'ADMIN'],
		default: 'AGENTE'
	},
	employees: [
		{ type: Schema.Types.ObjectId, ref: 'User' }
	],
	isActive: {
		type: Boolean,
		default: true
	},
	plan: {
		type: String,
		required: true,
		enum: ['TRIAL', 'PREMIUM'],
		default: 'TRIAL'
	}
},
{
	timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

const User = mongoose.model('User', userSchema);

module.exports = User;



