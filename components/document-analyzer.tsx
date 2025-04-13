"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Upload, FileText, AlertCircle } from "lucide-react"
import { analyzeDocument } from "@/lib/analyze-document"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DocumentSummary } from "@/components/document-summary"
import { KeyTerms } from "@/components/key-terms"
import { RiskAnalysis } from "@/components/risk-analysis"

export function DocumentAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type === "application/msword" ||
        selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile)
        setError(null)
      } else {
        setError("Please upload a PDF or Word document")
        setFile(null)
      }
    }
  }

  const handleAnalyze = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const result = await analyzeDocument(file)
      setAnalysis(result)
    } catch (err) {
      setError("Failed to analyze document. Please try again.")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setAnalysis(null)
    setError(null)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Document Analysis</CardTitle>
        <CardDescription>Upload a legal document to analyze its contents</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!analysis ? (
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <FileText className="h-6 w-6 text-gray-500" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-lg font-medium">{file ? file.name : "Upload a document"}</h3>
              <p className="text-sm text-gray-500">
                {file
                  ? `${(file.size / 1024 / 1024).toFixed(2)} MB · ${file.type}`
                  : "PDF or Word documents up to 10MB"}
              </p>
            </div>
            <div className="flex gap-2">
              <label htmlFor="file-upload">
                <Button
                  variant={file ? "outline" : "default"}
                  className="cursor-pointer"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {file ? "Change file" : "Select file"}
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>
              {file && (
                <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Document"
                  )}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="key-terms">Key Terms</TabsTrigger>
              <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <DocumentSummary summary={analysis.summary} />
            </TabsContent>
            <TabsContent value="key-terms">
              <KeyTerms terms={analysis.keyTerms} />
            </TabsContent>
            <TabsContent value="risks">
              <RiskAnalysis risks={analysis.risks} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      {analysis && (
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={handleReset}>
            Analyze Another Document
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
