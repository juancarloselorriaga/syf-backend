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
		{
			userId: { type: Schema.Types.ObjectId, ref: 'User' }
		}
	],
	isActive: {
		type: Boolean,
		default: true
	},
	plan: {
		type: String,
		required: true,
		enum: ['TRIAL', 'TRIAL-EXPIRADA', 'SUSCRIPTOR'],
		default: 'TRIAL'
	},
	parent: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
},
{
	timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

//Método que se utilizará para asignar nuevos empleados a la cuenta padre.
userSchema.methods.addEmployee = function(employee) {

	const updatedEmployees = [...this.employees];

	updatedEmployees.push({
		userId: employee._id
	});

	this.employees = updatedEmployees;

	return this.save();
}

//Método que se utilizará para remover empleados de la cuenta padre.
userSchema.methods.removeEmployee = function(employee) {

	const updatedEmployees = this.employees.filter(e => {
		return e.userId.toString() !== employee._id.toString();
	})

	this.employees = updatedEmployees;
	console.log(this.employees)
	return this.save();
}

const User = mongoose.model('User', userSchema);

module.exports = User;



