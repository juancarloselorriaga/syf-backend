const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    personalInfo: {
      name: String,
      lastNames: String,
      birthdate: Date,
      maritalStatus: String,
      gender: {
        type: String,
        enum: ["INDEFINIDO", "HOMBRE", "MUJER"]
      }
      },
      contactInfo: [
        { type: Schema.Types.ObjectId, ref: 'ContactInfo' }
      ],
      professionalInfo: {
        company: String,
        occupation: String,
      },
      legalInfo: {
        rfc: String,
        curp: String,
      },
      medicalInfo: {
        isSmoker: Boolean,
        diseases: [
          {
            name: String
          }
        ]
      },
      additionalInfo: {
        comments: String,
        reference: String
      },
      policies: [
        { type: Schema.Types.ObjectId, ref: 'Policy' }
      ],
      type: {
        type: String,
        enum: ['CONTATANTE', 'ASEGURADO']
      }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  })

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;