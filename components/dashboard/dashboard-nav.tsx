"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, MessagesSquare, Calculator, File, Settings } from "lucide-react"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Document Analyzer",
    href: "/dashboard/document-analyzer",
    icon: FileText,
  },
  {
    title: "Legal Chat",
    href: "/dashboard/legal-chat",
    icon: MessagesSquare,
  },
  {
    title: "Fee Estimator",
    href: "/dashboard/fee-estimator",
    icon: Calculator,
  },
  {
    title: "Defense Generator",
    href: "/dashboard/defense-generator",
    icon: File,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 py-4">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <Button
            key={index}
            asChild
            variant={pathname === item.href ? "secondary" : "ghost"}
            className="justify-start"
          >
            <Link href={item.href}>
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
