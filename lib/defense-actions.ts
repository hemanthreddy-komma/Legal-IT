"use server"

import { connectToDatabase } from "@/lib/mongodb"
import { Case } from "@/models/case"
import { generatePDF } from "@/lib/pdf-generator"
import { checkAuthStatus } from "@/lib/auth-actions"

interface DefenseFormData {
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
}

export async function generateDefensePDF(formData: DefenseFormData) {
  try {
    // Check if user is authenticated
    const { authenticated, user } = await checkAuthStatus()

    if (!authenticated || !user) {
      return { success: false, error: "You must be logged in to generate a defense document" }
    }

    // Connect to database
    await connectToDatabase()

    // Save case to database
    const caseDoc = await Case.create({
      userId: user.id,
      ...formData,
      createdAt: new Date(),
    })

    // Generate legal defense arguments based on case details
    const defenseArguments = await generateDefenseArguments(formData)

    // Generate PDF
    const pdfBuffer = await generatePDF({
      ...formData,
      defenseArguments,
      caseId: caseDoc._id.toString(),
    })

    // In a real app, you would save the PDF to a storage service
    // and return the URL. For this example, we'll create a data URL.
    const pdfUrl = `data:application/pdf;base64,${pdfBuffer.toString("base64")}`

    // Update case with PDF URL
    await Case.findByIdAndUpdate(caseDoc._id, {
      pdfGenerated: true,
      pdfGeneratedAt: new Date(),
    })

    return {
      success: true,
      pdfUrl,
      caseId: caseDoc._id.toString(),
    }
  } catch (error) {
    console.error("Defense generation error:", error)
    return { success: false, error: "Failed to generate defense document" }
  }
}

async function generateDefenseArguments(formData: DefenseFormData) {
  // In a real app, this would use AI to generate defense arguments
  // based on the case details. For this example, we'll return mock data.

  const defenseArguments = {
    constitutionalViolations: [
      {
        title: "Fourth Amendment - Unlawful Search and Seizure",
        description:
          "The search conducted was without probable cause or a valid warrant, violating your Fourth Amendment rights.",
        relevantCases: [
          "Mapp v. Ohio (1961) - Evidence obtained through unconstitutional searches is inadmissible",
          "Terry v. Ohio (1968) - Police must have reasonable suspicion for a stop and frisk",
        ],
        applicationToCase:
          "Based on the circumstances you described, the officer did not have reasonable suspicion to conduct the search that led to the discovery of evidence.",
      },
      {
        title: "Fifth Amendment - Miranda Rights Violation",
        description: "You were not properly informed of your Miranda rights before questioning.",
        relevantCases: [
          "Miranda v. Arizona (1966) - Suspects must be informed of their rights before custodial interrogation",
          "Berghuis v. Thompkins (2010) - Suspects must unambiguously invoke their right to remain silent",
        ],
        applicationToCase:
          "According to your account, you were questioned before being informed of your rights to remain silent and to have an attorney present.",
      },
    ],
    proceduralDefenses: [
      {
        title: "Chain of Custody Issues",
        description: "There may be issues with how evidence was collected, stored, and processed.",
        relevantCases: ["United States v. Rawlinson (2008) - Evidence must have proper chain of custody documentation"],
        applicationToCase:
          "Request documentation of the chain of custody for all physical evidence to identify potential mishandling.",
      },
      {
        title: "Statute of Limitations",
        description: "The time limit for bringing charges may have expired.",
        relevantCases: [
          "Stogner v. California (2003) - Extending a statute of limitations cannot revive an expired prosecution",
        ],
        applicationToCase:
          "Verify when the alleged offense occurred and compare with the applicable statute of limitations for this type of charge.",
      },
    ],
    factualDefenses: [
      {
        title: "Alibi Defense",
        description: formData.alibi
          ? "You were elsewhere when the alleged crime occurred."
          : "Consider if you have evidence placing you elsewhere during the incident.",
        applicationToCase:
          formData.alibi ||
          "Gather evidence such as receipts, witness statements, or electronic records that can confirm your location.",
      },
      {
        title: "Mistaken Identity",
        description: "You may have been misidentified as the perpetrator.",
        relevantCases: ["United States v. Wade (1967) - Established guidelines for lineup identifications"],
        applicationToCase:
          "Challenge any eyewitness identifications, particularly if they occurred under suggestive circumstances.",
      },
    ],
    legalPrecedents: [
      {
        title: "Relevant Case Law",
        cases: [
          "In re Winship (1970) - Prosecution must prove all elements beyond reasonable doubt",
          "Brady v. Maryland (1963) - Prosecution must disclose exculpatory evidence",
          "Kyles v. Whitley (1995) - Materiality of evidence is considered cumulatively, not item by item",
        ],
      },
    ],
    recommendedActions: [
      "Request all discovery materials from the prosecution",
      "File a motion to suppress evidence obtained through potentially unlawful search",
      "Challenge the admissibility of any statements made before Miranda warnings",
      "Gather and preserve alibi evidence and witness statements",
      "Consider expert witnesses if technical or scientific evidence is involved",
      "Prepare for preliminary hearing to challenge probable cause",
    ],
  }

  return defenseArguments
}
