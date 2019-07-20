const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactInfoSchema = new Schema(
  {
    _client: Schema.Types.ObjectId, ref: "Client",
    _company: Schema.Types.ObjectId, ref: "Company",
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