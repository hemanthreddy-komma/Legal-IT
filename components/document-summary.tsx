import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DocumentSummaryProps {
  summary: {
    title: string
    type: string
    parties: string[]
    effectiveDate: string
    keyPoints: string[]
  }
}

export function DocumentSummary({ summary }: DocumentSummaryProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{summary.title || "Document Summary"}</CardTitle>
          <CardDescription>
            {summary.type} - Effective: {summary.effectiveDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-gray-500">PARTIES INVOLVED</h3>
              <ul className="mt-1 list-disc pl-5">
                {summary.parties.map((party, index) => (
                  <li key={index}>{party}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm text-gray-500">KEY POINTS</h3>
              <ul className="mt-1 list-disc pl-5">
                {summary.keyPoints.map((point, index) => (
                  <li key={index} className="mt-2">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
