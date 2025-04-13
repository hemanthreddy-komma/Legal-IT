import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileTextIcon, MessagesSquareIcon, CalculatorIcon, FileIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader heading="Dashboard" text="Access your legal tools and services" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Document Analyzer</CardTitle>
              <FileTextIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Analyze Documents</div>
              <p className="text-xs text-muted-foreground">Upload and analyze legal documents</p>
              <Button asChild className="mt-4 w-full">
                <Link href="/dashboard/document-analyzer">Access Tool</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Legal Chat</CardTitle>
              <MessagesSquareIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Legal Assistant</div>
              <p className="text-xs text-muted-foreground">Chat with our AI legal assistant</p>
              <Button asChild className="mt-4 w-full">
                <Link href="/dashboard/legal-chat">Start Chat</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fee Estimator</CardTitle>
              <CalculatorIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Estimate Fees</div>
              <p className="text-xs text-muted-foreground">Calculate potential legal costs</p>
              <Button asChild className="mt-4 w-full">
                <Link href="/dashboard/fee-estimator">Calculate</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Legal Defense Generator</CardTitle>
              <FileIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Generate Defense</div>
              <p className="text-xs text-muted-foreground">Create legal defense documents</p>
              <Button asChild className="mt-4 w-full">
                <Link href="/dashboard/defense-generator">Generate PDF</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </ProtectedRoute>
  )
}
