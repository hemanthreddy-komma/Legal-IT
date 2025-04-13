import mongoose from "mongoose"

const CaseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  caseNumber: {
    type: String,
  },
  caseType: {
    type: String,
    required: true,
  },
  courtName: {
    type: String,
    required: true,
  },
  chargeDate: {
    type: String,
    required: true,
  },
  arrestDate: {
    type: String,
  },
  charges: {
    type: String,
    required: true,
  },
  circumstances: {
    type: String,
    required: true,
  },
  alibi: {
    type: String,
  },
  witnesses: {
    type: String,
  },
  evidence: {
    type: String,
  },
  priorRecord: {
    type: String,
  },
  additionalInfo: {
    type: String,
  },
  pdfGenerated: {
    type: Boolean,
    default: false,
  },
  pdfGeneratedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const Case = mongoose.models.Case || mongoose.model("Case", CaseSchema)
