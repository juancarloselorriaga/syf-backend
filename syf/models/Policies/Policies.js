const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const policySchema = new Schema(
  {
    _buyer: {
      type: String,
      required: true
    },
    _insured: {
      type: String,
      required: true
    },
    _policyNumber: {
      type: String,
      required: true
    },
    address: {
      street: String,
      number: String,
      neighborhood: String,
      municipality: String,
      state: String,
      cp: String,
      additionalInfo: String
    },
    company: { type: Schema.Types.ObjectId, ref: 'Company'},
    class: { type: Schema.Types.ObjectId, ref: 'PolicyClass'},
    issuanceDate: {
      type: Date,
      required: true
    },
    expirationDate: {
      type: Date,
      required: true
    },
    paymentType: {
      type: String,
      enum: ['MENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL'],
      required: true
    },
    factor: { type: Schema.Types.ObjectId, ref: 'Factor'},
    paymentMethod:{
      type: String,
      enum: ['AGENTE', 'CARGO_AUTOMATICO', 'VIA_TELEFONICA'],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['PAGADO', 'SIN_PAGO', 'VENCIDO'],
      default: 'SIN_PAGO'
    },
    currency:{
      type: String,
      enum: ['USD', 'MXN', 'EUR', 'UDI'],
      required: true
    },
    hasExtraPremium: {
      type: Boolean,
      default: false
    },
    extraPremiumCause:{
      type: String,
      enum: ['OCUPACION', 'SALUD', 'OCUPACION_Y_SALUD']
    },
    type: {
      type: String,
      enum: ['SEGURO', 'FIANZA'],
      default: 'SEGURO'
    },
    plan: {
      title: {
        type: String,
        required: true
      },
      key: {
        type: String,
        required: true
      },
      coverage: {
        type: String,
        required: true
      },
      sumInsured: {
        type: Number,
        required: true
      },
      totalPremium: Number,
      netPremium: {
        type: Number,
        required: true
      },
      companyDiscount:{
        type: Number
      },
      agentDiscount:{
        type: Number
      }
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  })

const Policy = mongoose.model('Policy', policySchema);

module.exports = Client;