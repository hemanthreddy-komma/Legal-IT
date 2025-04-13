import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface KeyTermsProps {
  terms: Array<{
    term: string
    definition: string
    importance: "high" | "medium" | "low"
    section: string
  }>
}

export function KeyTerms({ terms }: KeyTermsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Key Terms & Definitions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {terms.map((term, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{term.term}</h3>
                  <Badge
                    variant={
                      term.importance === "high" ? "destructive" : term.importance === "medium" ? "default" : "outline"
                    }
                  >
                    {term.importance} importance
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-600">{term.definition}</p>
                <p className="mt-2 text-xs text-gray-500">Found in: {term.section}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
