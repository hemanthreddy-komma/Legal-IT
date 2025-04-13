import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DocumentAnalyzer } from "@/components/document-analyzer"

export default function DashboardDocumentAnalyzerPage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader
          heading="Document Analyzer"
          text="Upload and analyze legal documents to extract key information"
        />
        <div className="mt-6">
          <DocumentAnalyzer />
        </div>
      </DashboardShell>
    </ProtectedRoute>
  )
}
