import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { FeeEstimator } from "@/components/fee-estimator"

export default function DashboardFeeEstimatorPage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader
          heading="Lawyer Fee Estimator"
          text="Estimate potential legal fees based on your case details and requirements"
        />
        <div className="mt-6">
          <FeeEstimator />
        </div>
      </DashboardShell>
    </ProtectedRoute>
  )
}
