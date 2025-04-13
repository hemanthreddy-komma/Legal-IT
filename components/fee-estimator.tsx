"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { estimateFees } from "@/lib/estimate-fees"

interface FeeEstimate {
  hourlyRateEstimate: {
    low: number
    average: number
    high: number
  }
  flatFeeEstimate: {
    low: number
    average: number
    high: number
  }
  contingencyEstimate: {
    percentage: number
    estimatedSettlement: number
    estimatedFee: number
  }
  timeEstimate: {
    hours: number
    timeframe: string
  }
  additionalCosts: Array<{
    name: string
    cost: number
  }>
  recommendations: string[]
}

export function FeeEstimator() {
  const [caseType, setCaseType] = useState("")
  const [caseComplexity, setCaseComplexity] = useState(50)
  const [location, setLocation] = useState("")
  const [urgency, setUrgency] = useState(false)
  const [estimate, setEstimate] = useState<FeeEstimate | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = async () => {
    setIsCalculating(true)
    try {
      const result = await estimateFees({
        caseType,
        caseComplexity,
        location,
        urgency,
      })
      setEstimate(result)
    } catch (error) {
      console.error("Error calculating fees:", error)
    } finally {
      setIsCalculating(false)
    }
  }

  const handleReset = () => {
    setCaseType("")
    setCaseComplexity(50)
    setLocation("")
    setUrgency(false)
    setEstimate(null)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lawyer Fee Estimator</CardTitle>
        <CardDescription>Estimate potential legal fees based on your case details</CardDescription>
      </CardHeader>
      <CardContent>
        {!estimate ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="case-type">Case Type</Label>
              <Select value={caseType} onValueChange={setCaseType}>
                <SelectTrigger id="case-type">
                  <SelectValue placeholder="Select case type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="divorce">Divorce</SelectItem>
                  <SelectItem value="personal-injury">Personal Injury</SelectItem>
                  <SelectItem value="estate-planning">Estate Planning</SelectItem>
                  <SelectItem value="business-formation">Business Formation</SelectItem>
                  <SelectItem value="criminal-defense">Criminal Defense</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="immigration">Immigration</SelectItem>
                  <SelectItem value="intellectual-property">Intellectual Property</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urban">Major City</SelectItem>
                  <SelectItem value="suburban">Suburban Area</SelectItem>
                  <SelectItem value="rural">Rural Area</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="complexity">Case Complexity</Label>
                <span className="text-sm text-gray-500">
                  {caseComplexity < 33 ? "Simple" : caseComplexity < 66 ? "Moderate" : "Complex"}
                </span>
              </div>
              <Slider
                id="complexity"
                min={0}
                max={100}
                step={1}
                value={[caseComplexity]}
                onValueChange={(value) => setCaseComplexity(value[0])}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="urgency">Urgent Case</Label>
                <p className="text-sm text-gray-500">Requires expedited handling</p>
              </div>
              <Switch id="urgency" checked={urgency} onCheckedChange={setUrgency} />
            </div>
          </div>
        ) : (
          <Tabs defaultValue="hourly" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hourly">Hourly Rate</TabsTrigger>
              <TabsTrigger value="flat-fee">Flat Fee</TabsTrigger>
              <TabsTrigger value="contingency">Contingency</TabsTrigger>
            </TabsList>

            <TabsContent value="hourly" className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Hourly Rate Estimate</h3>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Low End</p>
                    <p className="text-2xl font-bold">{formatCurrency(estimate.hourlyRateEstimate.low)}</p>
                    <p className="text-xs text-gray-500">per hour</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Average</p>
                    <p className="text-2xl font-bold">{formatCurrency(estimate.hourlyRateEstimate.average)}</p>
                    <p className="text-xs text-gray-500">per hour</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">High End</p>
                    <p className="text-2xl font-bold">{formatCurrency(estimate.hourlyRateEstimate.high)}</p>
                    <p className="text-xs text-gray-500">per hour</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Estimated Time Required</p>
                  <p className="font-medium">{estimate.timeEstimate.hours} hours</p>
                  <p className="text-sm text-gray-500">Estimated Timeframe</p>
                  <p className="font-medium">{estimate.timeEstimate.timeframe}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Total Estimated Cost</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(estimate.hourlyRateEstimate.average * estimate.timeEstimate.hours)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Range: {formatCurrency(estimate.hourlyRateEstimate.low * estimate.timeEstimate.hours)} -
                    {formatCurrency(estimate.hourlyRateEstimate.high * estimate.timeEstimate.hours)}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="flat-fee" className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Flat Fee Estimate</h3>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Low End</p>
                    <p className="text-2xl font-bold">{formatCurrency(estimate.flatFeeEstimate.low)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Average</p>
                    <p className="text-2xl font-bold">{formatCurrency(estimate.flatFeeEstimate.average)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">High End</p>
                    <p className="text-2xl font-bold">{formatCurrency(estimate.flatFeeEstimate.high)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">What's Typically Included</p>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    <li>Initial consultation</li>
                    <li>Document preparation</li>
                    <li>Standard filings</li>
                    <li>Limited representation</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">What's Typically NOT Included</p>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    <li>Court appearances beyond initial hearing</li>
                    <li>Extended negotiations</li>
                    <li>Appeals or additional filings</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contingency" className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Contingency Fee Estimate</h3>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Typical Percentage</p>
                  <p className="text-2xl font-bold">{estimate.contingencyEstimate.percentage}%</p>
                  <p className="text-xs text-gray-500">of settlement or judgment</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Estimated Settlement Range</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(estimate.contingencyEstimate.estimatedSettlement)}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Estimated Attorney Fee</p>
                  <p className="text-xl font-bold">{formatCurrency(estimate.contingencyEstimate.estimatedFee)}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Common Case Types for Contingency</p>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    <li>Personal injury</li>
                    <li>Medical malpractice</li>
                    <li>Employment discrimination</li>
                    <li>Class action lawsuits</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Additional Costs to Consider</h3>
                <div className="mt-2">
                  <ul className="space-y-2">
                    {estimate.additionalCosts.map((cost, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{cost.name}</span>
                        <span className="font-medium">{formatCurrency(cost.cost)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Recommendations</h3>
                <ul className="mt-2 list-disc pl-5">
                  {estimate.recommendations.map((recommendation, index) => (
                    <li key={index} className="mt-1">
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {!estimate ? (
          <Button onClick={handleCalculate} disabled={!caseType || !location || isCalculating}>
            {isCalculating ? "Calculating..." : "Calculate Estimate"}
          </Button>
        ) : (
          <Button variant="outline" onClick={handleReset}>
            Start Over
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
