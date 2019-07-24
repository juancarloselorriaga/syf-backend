const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Client = require("../Client/Client");

const contactInfoSchema = new Schema(
  {
    _client: {type: Schema.Types.ObjectId, ref: "Client"},
    _company: {type: Schema.Types.ObjectId, ref: "Company"},
    title: String,
    email: String,
    phone: String,
    mobile: String,
    address: {
      street: String,
      number: String,
      neighborhood: String,
      municipality: String,
      state: String,
      cp: String,
      additionalInfo: String
    }
  },
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);

module.exports = ContactInfo;