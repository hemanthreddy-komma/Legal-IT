import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { GavelIcon, FileTextIcon, MessagesSquareIcon, CalculatorIcon, FileIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <GavelIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Legal IT</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/document-analyzer" className="text-sm font-medium hover:underline">
              Document Analyzer
            </Link>
            <Link href="/legal-chat" className="text-sm font-medium hover:underline">
              Legal Chat
            </Link>
            <Link href="/fee-estimator" className="text-sm font-medium hover:underline">
              Fee Estimator
            </Link>
            <Link href="/defense-generator" className="text-sm font-medium hover:underline">
              Defense Generator
            </Link>
            <Link
              href="/login"
              className="ml-4 flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simplifying Legal Topics with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Legal IT helps you understand legal documents, get answers to legal questions, estimate lawyer
                  fees, and generate legal defense documents - all powered by advanced AI.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/login?redirect=/dashboard/document-analyzer">Try Document Analyzer</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login?redirect=/dashboard/legal-chat">Chat with Legal Assistant</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-12">Our Services</h2>
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileTextIcon className="h-6 w-6" />
                    <CardTitle>Document Analyzer</CardTitle>
                  </div>
                  <CardDescription>
                    Upload and analyze legal documents to extract key information and identify potential issues.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Extract key clauses and terms</li>
                    <li>Identify potential risks</li>
                    <li>Summarize complex documents</li>
                    <li>Compare against standard templates</li>
                  </ul>
                  <Button asChild className="w-full mt-4">
                    <Link href="/login?redirect=/dashboard/document-analyzer">Analyze Documents</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MessagesSquareIcon className="h-6 w-6" />
                    <CardTitle>Legal Counsel Chatbot</CardTitle>
                  </div>
                  <CardDescription>
                    Get answers to your legal questions through an interactive AI-powered chatbot.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Ask questions in plain language</li>
                    <li>Get explanations of legal concepts</li>
                    <li>Understand your legal rights</li>
                    <li>Explore potential legal options</li>
                  </ul>
                  <Button asChild className="w-full mt-4">
                    <Link href="/login?redirect=/dashboard/legal-chat">Start Chatting</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CalculatorIcon className="h-6 w-6" />
                    <CardTitle>Lawyer Fee Estimator</CardTitle>
                  </div>
                  <CardDescription>
                    Estimate potential legal fees based on your case details and requirements.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Compare fee structures</li>
                    <li>Estimate costs by case type</li>
                    <li>Understand billing practices</li>
                    <li>Plan your legal budget</li>
                  </ul>
                  <Button asChild className="w-full mt-4">
                    <Link href="/login?redirect=/dashboard/fee-estimator">Estimate Fees</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileIcon className="h-6 w-6" />
                    <CardTitle>Legal Defense Generator</CardTitle>
                  </div>
                  <CardDescription>
                    Generate legal defense documents with potential arguments to help with your case.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Create customized legal defense documents</li>
                    <li>Get relevant case law and precedents</li>
                    <li>Identify potential defense strategies</li>
                    <li>Prepare for court appearances</li>
                  </ul>
                  <Button asChild className="w-full mt-4">
                    <Link href="/login?redirect=/dashboard/defense-generator">Generate Defense</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powered by Advanced AI Technology</h2>
              <p className="text-gray-500 md:text-xl">
                Legal IT combines large language models, vectorized databases, and intuitive interfaces to make legal
                information more accessible.
              </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-gray-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                    <line x1="12" y1="22" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Large Language Models</h3>
                <p className="text-center text-sm text-gray-500">
                  State-of-the-art AI models trained on legal texts to understand complex legal language.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-gray-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8V3h-5l2.26 2.26A7 7 0 1 0 21 12z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Vectorized Database</h3>
                <p className="text-center text-sm text-gray-500">
                  Efficient storage and retrieval of legal documents for fast and accurate analysis.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-gray-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Modern Web Interface</h3>
                <p className="text-center text-sm text-gray-500">
                  Intuitive and responsive design that makes complex legal tools accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <GavelIcon className="h-5 w-5" />
            <span className="text-lg font-semibold">Legal IT</span>
          </div>
          <p className="text-center text-sm text-gray-500 md:text-left">
            © 2025 Legal IT. All rights reserved. Not a substitute for professional legal advice.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
