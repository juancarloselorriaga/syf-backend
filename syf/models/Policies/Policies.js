const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const policySchema = new Schema(
  {
    _buyer: {
      type: String
    },
    _insured: {
      type: String
    },
    _policyNumber: {
      type: String,
      required: true,
      unique: true
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
    company: String,
    class: {
      title: String,
      key: String,
    },
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
      enum: ['Mensual', 'Trimestral', 'Semestral', 'Anual'],
      required: true
    },
    paymentMethod:{
      type: String,
      enum: ['Agente', 'Cargo automático', 'Vía telefónica'],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pagado', 'sin pago', 'vencido'],
      default: 'sin pago'
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
    extraPremiumCause: String,
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
      sumInsured: [ {
        concept: { conceptTitle: String, conceptCost: String }
      }
      ],
      totalPremium: String,
      netPremium: {
        type: String,
        required: true
      },
      companyDiscount:{
        type: Number
      },
      agentDiscount:{
        type: Number
      }
    },
    class: {
      title: {
        type: String,
        required: true
      },
      key: {
        type: String,
        required: true
      }
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  })

  policySchema.methods.deletePolicyItem = function(req, res, policy) {

    Policy.findByIdAndRemove(policy._id)
          .then(deletedContactCard => {
            res.status(200).json({
              text: "Tarjeta de contacto eliminada con éxito",
              data: deletedContactCard
            });
          })
          .catch(err => {
            res.status(500).json({
              text: "Error, no se encuentra la tarjeta",
              error: err
            });
          });
  }

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;