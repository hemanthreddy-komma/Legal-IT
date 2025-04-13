import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { LegalChatbot } from "@/components/legal-chatbot"

export default function DashboardLegalChatPage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader
          heading="Legal Counsel Chatbot"
          text="Get answers to your legal questions through an interactive AI-powered assistant"
        />
        <div className="mt-6">
          <LegalChatbot />
        </div>
      </DashboardShell>
    </ProtectedRoute>
  )
}
