"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, FileDown } from "lucide-react"
import { generateDefensePDF } from "@/lib/defense-actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export function DefenseGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("personal")

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    email: "",

    // Case Details
    caseNumber: "",
    caseType: "",
    courtName: "",
    chargeDate: "",
    arrestDate: "",

    // Charge Details
    charges: "",
    circumstances: "",

    // Defense Strategy
    alibi: "",
    witnesses: "",
    evidence: "",
    priorRecord: "",
    additionalInfo: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    setPdfUrl(null)

    try {
      const result = await generateDefensePDF(formData)

      if (result.success) {
        setPdfUrl(result.pdfUrl)
        setSuccess("Defense document generated successfully!")
      } else {
        setError(result.error || "Failed to generate defense document")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const nextTab = () => {
    if (activeTab === "personal") setActiveTab("case")
    else if (activeTab === "case") setActiveTab("charges")
    else if (activeTab === "charges") setActiveTab("defense")
  }

  const prevTab = () => {
    if (activeTab === "defense") setActiveTab("charges")
    else if (activeTab === "charges") setActiveTab("case")
    else if (activeTab === "case") setActiveTab("personal")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-700">Success</AlertTitle>
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        {pdfUrl && (
          <div className="mb-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-green-500 bg-green-50 p-6">
            <p className="mb-4 text-center text-green-700">Your legal defense document is ready!</p>
            <Button asChild>
              <a href={pdfUrl} download="legal-defense.pdf">
                <FileDown className="mr-2 h-4 w-4" />
                Download PDF
              </a>
            </Button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="case">Case Details</TabsTrigger>
              <TabsTrigger value="charges">Charges</TabsTrigger>
              <TabsTrigger value="defense">Defense</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Legal Name</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Current Address</Label>
                <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="button" onClick={nextTab}>
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="case" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="caseNumber">Case Number (if known)</Label>
                  <Input id="caseNumber" name="caseNumber" value={formData.caseNumber} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caseType">Case Type</Label>
                  <Select value={formData.caseType} onValueChange={(value) => handleSelectChange("caseType", value)}>
                    <SelectTrigger id="caseType">
                      <SelectValue placeholder="Select case type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="criminal">Criminal</SelectItem>
                      <SelectItem value="misdemeanor">Misdemeanor</SelectItem>
                      <SelectItem value="felony">Felony</SelectItem>
                      <SelectItem value="dui">DUI/DWI</SelectItem>
                      <SelectItem value="drug">Drug Offense</SelectItem>
                      <SelectItem value="assault">Assault/Battery</SelectItem>
                      <SelectItem value="theft">Theft/Larceny</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="courtName">Court Name and Location</Label>
                <Input id="courtName" name="courtName" value={formData.courtName} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chargeDate">Date of Charge/Citation</Label>
                  <Input
                    id="chargeDate"
                    name="chargeDate"
                    type="date"
                    value={formData.chargeDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="arrestDate">Date of Arrest (if applicable)</Label>
                  <Input
                    id="arrestDate"
                    name="arrestDate"
                    type="date"
                    value={formData.arrestDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Previous
                </Button>
                <Button type="button" onClick={nextTab}>
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="charges" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="charges">Specific Charges and Allegations</Label>
                <Textarea
                  id="charges"
                  name="charges"
                  value={formData.charges}
                  onChange={handleChange}
                  placeholder="List all charges and allegations against you"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="circumstances">Circumstances of the Incident</Label>
                <Textarea
                  id="circumstances"
                  name="circumstances"
                  value={formData.circumstances}
                  onChange={handleChange}
                  placeholder="Describe what happened from your perspective"
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Previous
                </Button>
                <Button type="button" onClick={nextTab}>
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="defense" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="alibi">Alibi Information (if applicable)</Label>
                <Textarea
                  id="alibi"
                  name="alibi"
                  value={formData.alibi}
                  onChange={handleChange}
                  placeholder="Provide details if you were elsewhere during the alleged incident"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="witnesses">Potential Witnesses</Label>
                <Textarea
                  id="witnesses"
                  name="witnesses"
                  value={formData.witnesses}
                  onChange={handleChange}
                  placeholder="List any witnesses who can support your case"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidence">Exonerating Evidence</Label>
                <Textarea
                  id="evidence"
                  name="evidence"
                  value={formData.evidence}
                  onChange={handleChange}
                  placeholder="Describe any evidence that supports your innocence"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priorRecord">Prior Criminal Record (if any)</Label>
                <Textarea
                  id="priorRecord"
                  name="priorRecord"
                  value={formData.priorRecord}
                  onChange={handleChange}
                  placeholder="List any prior convictions or arrests"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Any other information that might be relevant to your defense"
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Previous
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Defense Document"
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
    </Card>
  )
}
