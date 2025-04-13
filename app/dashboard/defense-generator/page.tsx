import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DefenseGeneratorForm } from "@/components/defense-generator/defense-generator-form"

export default function DefenseGeneratorPage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader
          heading="Legal Defense Generator"
          text="Generate a legal defense document based on your case details"
        />
        <div className="mt-6">
          <DefenseGeneratorForm />
        </div>
      </DashboardShell>
    </ProtectedRoute>
  )
}
