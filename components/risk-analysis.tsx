import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react"

interface RiskAnalysisProps {
  risks: Array<{
    issue: string
    severity: "high" | "medium" | "low"
    description: string
    recommendation: string
  }>
}

export function RiskAnalysis({ risks }: RiskAnalysisProps) {
  // Group risks by severity
  const highRisks = risks.filter((risk) => risk.severity === "high")
  const mediumRisks = risks.filter((risk) => risk.severity === "medium")
  const lowRisks = risks.filter((risk) => risk.severity === "low")

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {highRisks.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">High Severity Issues</h3>
                {highRisks.map((risk, index) => (
                  <Alert variant="destructive" className="mb-3" key={index}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>{risk.issue}</AlertTitle>
                    <AlertDescription>
                      <p>{risk.description}</p>
                      <p className="mt-2 font-medium">Recommendation: {risk.recommendation}</p>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {mediumRisks.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Medium Severity Issues</h3>
                {mediumRisks.map((risk, index) => (
                  <Alert className="mb-3" key={index}>
                    <HelpCircle className="h-4 w-4" />
                    <AlertTitle>{risk.issue}</AlertTitle>
                    <AlertDescription>
                      <p>{risk.description}</p>
                      <p className="mt-2 font-medium">Recommendation: {risk.recommendation}</p>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {lowRisks.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Low Severity Issues</h3>
                {lowRisks.map((risk, index) => (
                  <Alert variant="outline" className="mb-3" key={index}>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>{risk.issue}</AlertTitle>
                    <AlertDescription>
                      <p>{risk.description}</p>
                      <p className="mt-2 font-medium">Recommendation: {risk.recommendation}</p>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {risks.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-medium">No significant risks detected</h3>
                <p className="text-gray-500 mt-2">
                  This document appears to have standard terms without notable issues.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
