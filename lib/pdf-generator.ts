"use server"

import PDFDocument from "pdfkit"
import type { PDFKit } from "pdfkit"

interface PDFData {
  fullName: string
  dateOfBirth: string
  address: string
  phone: string
  email: string
  caseNumber: string
  caseType: string
  courtName: string
  chargeDate: string
  arrestDate: string
  charges: string
  circumstances: string
  alibi: string
  witnesses: string
  evidence: string
  priorRecord: string
  additionalInfo: string
  defenseArguments: any
  caseId: string
}

export async function generatePDF(data: PDFData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const chunks: Buffer[] = []
      const doc = new PDFDocument({ margin: 50 })

      // Collect PDF data chunks
      doc.on("data", (chunk) => chunks.push(chunk))
      doc.on("end", () => resolve(Buffer.concat(chunks)))
      doc.on("error", reject)

      // Add header
      doc
        .fontSize(20)
        .font("Helvetica-Bold")
        .text("LEGAL DEFENSE DOCUMENT", { align: "center" })
        .moveDown(0.5)
        .fontSize(14)
        .font("Helvetica")
        .text(`Generated on: ${new Date().toLocaleDateString()}`, { align: "center" })
        .moveDown(0.5)
        .text(`Case ID: ${data.caseId}`, { align: "center" })
        .moveDown(1.5)

      // Add disclaimer
      doc
        .fontSize(10)
        .font("Helvetica-Oblique")
        .text(
          "DISCLAIMER: This document is generated for informational purposes only and does not constitute legal advice. Consult with a qualified attorney for legal representation.",
          { align: "center" },
        )
        .moveDown(2)

      // Personal Information Section
      addSection(doc, "PERSONAL INFORMATION")
      addField(doc, "Full Name:", data.fullName)
      addField(doc, "Date of Birth:", data.dateOfBirth)
      addField(doc, "Address:", data.address)
      addField(doc, "Phone:", data.phone)
      addField(doc, "Email:", data.email)
      doc.moveDown(1)

      // Case Details Section
      addSection(doc, "CASE DETAILS")
      addField(doc, "Case Number:", data.caseNumber || "Not provided")
      addField(doc, "Case Type:", data.caseType)
      addField(doc, "Court:", data.courtName)
      addField(doc, "Date of Charge:", data.chargeDate)
      if (data.arrestDate) {
        addField(doc, "Date of Arrest:", data.arrestDate)
      }
      doc.moveDown(1)

      // Charges Section
      addSection(doc, "CHARGES AND CIRCUMSTANCES")
      addField(doc, "Charges:", data.charges)
      addField(doc, "Circumstances:", data.circumstances)
      doc.moveDown(1)

      // Defense Information
      if (data.alibi || data.witnesses || data.evidence) {
        addSection(doc, "DEFENSE INFORMATION")
        if (data.alibi) addField(doc, "Alibi:", data.alibi)
        if (data.witnesses) addField(doc, "Witnesses:", data.witnesses)
        if (data.evidence) addField(doc, "Evidence:", data.evidence)
        if (data.priorRecord) addField(doc, "Prior Record:", data.priorRecord)
        if (data.additionalInfo) addField(doc, "Additional Information:", data.additionalInfo)
        doc.moveDown(1)
      }

      // Legal Defense Arguments
      addSection(doc, "POTENTIAL LEGAL DEFENSES")

      // Constitutional Violations
      doc.fontSize(12).font("Helvetica-Bold").text("Constitutional Defenses:").moveDown(0.5)

      data.defenseArguments.constitutionalViolations.forEach((defense: any) => {
        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .text(defense.title)
          .moveDown(0.2)
          .fontSize(10)
          .font("Helvetica")
          .text(defense.description)
          .moveDown(0.2)

        if (defense.relevantCases && defense.relevantCases.length > 0) {
          doc.font("Helvetica-Oblique").text("Relevant Cases:")
          defense.relevantCases.forEach((caseRef: string) => {
            doc.text(`• ${caseRef}`)
          })
          doc.moveDown(0.2)
        }

        doc
          .font("Helvetica-Bold")
          .text("Application to Your Case:")
          .font("Helvetica")
          .text(defense.applicationToCase)
          .moveDown(0.5)
      })

      // Procedural Defenses
      doc.fontSize(12).font("Helvetica-Bold").text("Procedural Defenses:").moveDown(0.5)

      data.defenseArguments.proceduralDefenses.forEach((defense: any) => {
        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .text(defense.title)
          .moveDown(0.2)
          .fontSize(10)
          .font("Helvetica")
          .text(defense.description)
          .moveDown(0.2)

        if (defense.relevantCases && defense.relevantCases.length > 0) {
          doc.font("Helvetica-Oblique").text("Relevant Cases:")
          defense.relevantCases.forEach((caseRef: string) => {
            doc.text(`• ${caseRef}`)
          })
          doc.moveDown(0.2)
        }

        doc
          .font("Helvetica-Bold")
          .text("Application to Your Case:")
          .font("Helvetica")
          .text(defense.applicationToCase)
          .moveDown(0.5)
      })

      // Factual Defenses
      doc.fontSize(12).font("Helvetica-Bold").text("Factual Defenses:").moveDown(0.5)

      data.defenseArguments.factualDefenses.forEach((defense: any) => {
        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .text(defense.title)
          .moveDown(0.2)
          .fontSize(10)
          .font("Helvetica")
          .text(defense.description)
          .moveDown(0.2)

        doc
          .font("Helvetica-Bold")
          .text("Application to Your Case:")
          .font("Helvetica")
          .text(defense.applicationToCase)
          .moveDown(0.5)
      })

      // Legal Precedents
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text("Important Legal Precedents:")
        .moveDown(0.5)
        .fontSize(10)
        .font("Helvetica")

      data.defenseArguments.legalPrecedents[0].cases.forEach((caseRef: string) => {
        doc.text(`• ${caseRef}`).moveDown(0.2)
      })
      doc.moveDown(0.5)

      // Recommended Actions
      doc.fontSize(12).font("Helvetica-Bold").text("Recommended Actions:").moveDown(0.5).fontSize(10).font("Helvetica")

      data.defenseArguments.recommendedActions.forEach((action: string) => {
        doc.text(`• ${action}`).moveDown(0.2)
      })

      // Final disclaimer
      doc
        .moveDown(2)
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("IMPORTANT NOTICE:", { align: "center" })
        .moveDown(0.5)
        .font("Helvetica")
        .text(
          "This document provides potential legal defenses based on the information you provided. The success of these defenses depends on the specific facts and circumstances of your case. This document is not a substitute for legal representation. You should consult with a qualified attorney who can provide personalized legal advice and representation.",
          { align: "center" },
        )

      // Finalize the PDF
      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

function addSection(doc: PDFKit.PDFDocument, title: string) {
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text(title)
    .moveDown(0.5)
    .lineCap("butt")
    .moveTo(50, doc.y)
    .lineTo(doc.page.width - 50, doc.y)
    .stroke()
    .moveDown(0.5)
}

function addField(doc: PDFKit.PDFDocument, label: string, value: string) {
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(label, { continued: true })
    .font("Helvetica")
    .text(` ${value}`)
    .moveDown(0.5)
}
