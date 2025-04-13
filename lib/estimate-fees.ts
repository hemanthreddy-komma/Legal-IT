"use server"

interface FeeEstimateParams {
  caseType: string
  caseComplexity: number
  location: string
  urgency: boolean
}

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

export async function estimateFees(params: FeeEstimateParams): Promise<FeeEstimate> {
  // In a real implementation, you would:
  // 1. Use an AI model to analyze the parameters and generate an estimate
  // 2. Potentially query a database of historical fee data
  // 3. Return a structured estimate

  // For demo purposes, we'll simulate the estimate with mock data

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Base rates by case type
  const baseRates: Record<string, any> = {
    divorce: {
      hourly: { low: 200, average: 300, high: 450 },
      flat: { low: 1500, average: 3000, high: 7500 },
      contingency: { percentage: 0, settlement: 0 },
      hours: 20,
      timeframe: "3-6 months",
      additionalCosts: [
        { name: "Filing Fees", cost: 300 },
        { name: "Process Server", cost: 100 },
        { name: "Mediation", cost: 1500 },
      ],
      recommendations: [
        "Consider mediation to reduce costs and time",
        "Prepare detailed financial documents before your first meeting",
        "Discuss fee structure options with your attorney",
      ],
    },
    "personal-injury": {
      hourly: { low: 200, average: 350, high: 500 },
      flat: { low: 0, average: 0, high: 0 },
      contingency: { percentage: 33, settlement: 50000 },
      hours: 30,
      timeframe: "6-18 months",
      additionalCosts: [
        { name: "Medical Record Fees", cost: 200 },
        { name: "Expert Witnesses", cost: 2500 },
        { name: "Court Reporter", cost: 800 },
      ],
      recommendations: [
        "Most personal injury cases are handled on contingency basis",
        "Keep detailed records of all medical treatments and expenses",
        "Discuss how case expenses will be handled if you don't win",
      ],
    },
    "estate-planning": {
      hourly: { low: 250, average: 350, high: 500 },
      flat: { low: 800, average: 2000, high: 5000 },
      contingency: { percentage: 0, settlement: 0 },
      hours: 8,
      timeframe: "2-4 weeks",
      additionalCosts: [
        { name: "Document Filing Fees", cost: 100 },
        { name: "Notary Services", cost: 50 },
      ],
      recommendations: [
        "Flat fee arrangements are common for basic estate planning",
        "Prepare an inventory of assets before meeting with an attorney",
        "Review and update your estate plan every 3-5 years",
      ],
    },
    "business-formation": {
      hourly: { low: 250, average: 400, high: 600 },
      flat: { low: 500, average: 1500, high: 3500 },
      contingency: { percentage: 0, settlement: 0 },
      hours: 10,
      timeframe: "2-6 weeks",
      additionalCosts: [
        { name: "State Filing Fees", cost: 300 },
        { name: "Registered Agent Fee", cost: 150 },
        { name: "EIN Application", cost: 0 },
      ],
      recommendations: [
        "Compare LLC vs. Corporation structures for tax implications",
        "Consider ongoing compliance requirements when choosing a structure",
        "Ask about package deals that include initial year of registered agent service",
      ],
    },
    "criminal-defense": {
      hourly: { low: 200, average: 350, high: 700 },
      flat: { low: 2500, average: 5000, high: 15000 },
      contingency: { percentage: 0, settlement: 0 },
      hours: 40,
      timeframe: "3-12 months",
      additionalCosts: [
        { name: "Expert Witnesses", cost: 3000 },
        { name: "Investigator", cost: 2000 },
        { name: "Court Costs", cost: 500 },
      ],
      recommendations: [
        "Most criminal defense attorneys charge flat fees by case stage",
        "Ask about payment plans if the total fee is difficult to pay upfront",
        "Ensure you understand what's included in the quoted fee",
      ],
    },
    "real-estate": {
      hourly: { low: 200, average: 300, high: 450 },
      flat: { low: 800, average: 1500, high: 3000 },
      contingency: { percentage: 0, settlement: 0 },
      hours: 8,
      timeframe: "2-4 weeks",
      additionalCosts: [
        { name: "Title Search", cost: 400 },
        { name: "Recording Fees", cost: 150 },
        { name: "Survey", cost: 500 },
      ],
      recommendations: [
        "Flat fees are common for residential real estate transactions",
        "Ask about title insurance options and costs",
        "Ensure all property disclosures are properly reviewed",
      ],
    },
    immigration: {
      hourly: { low: 200, average: 300, high: 450 },
      flat: { low: 1000, average: 3000, high: 7500 },
      contingency: { percentage: 0, settlement: 0 },
      hours: 15,
      timeframe: "3-24 months",
      additionalCosts: [
        { name: "USCIS Filing Fees", cost: 1500 },
        { name: "Biometrics Fee", cost: 85 },
        { name: "Translation Services", cost: 300 },
      ],
      recommendations: [
        "Most immigration matters are handled on a flat fee basis",
        "Government filing fees are separate from attorney fees",
        "Ask about the attorney's experience with your specific visa type",
      ],
    },
    "intellectual-property": {
      hourly: { low: 300, average: 450, high: 700 },
      flat: { low: 2000, average: 5000, high: 10000 },
      contingency: { percentage: 0, settlement: 0 },
      hours: 25,
      timeframe: "6-18 months",
      additionalCosts: [
        { name: "USPTO Filing Fees", cost: 1000 },
        { name: "Search Fees", cost: 800 },
        { name: "Drawings/Illustrations", cost: 500 },
      ],
      recommendations: [
        "Patent applications typically cost more than trademarks",
        "Consider provisional patent applications for cost savings",
        "Discuss international protection options and costs",
      ],
    },
  }

  // Default case if type not found
  const defaultCase = {
    hourly: { low: 200, average: 350, high: 500 },
    flat: { low: 1000, average: 2500, high: 5000 },
    contingency: { percentage: 30, settlement: 50000 },
    hours: 20,
    timeframe: "3-6 months",
    additionalCosts: [
      { name: "Filing Fees", cost: 300 },
      { name: "Administrative Costs", cost: 200 },
    ],
    recommendations: [
      "Discuss fee structure options with your attorney",
      "Ask for a written fee agreement before proceeding",
      "Inquire about potential additional costs not included in the estimate",
    ],
  }

  // Get base rates for the selected case type or use default
  const baseRate = baseRates[params.caseType] || defaultCase

  // Adjust for location
  const locationMultiplier = params.location === "urban" ? 1.3 : params.location === "suburban" ? 1.0 : 0.8

  // Adjust for complexity (0-100 scale)
  const complexityFactor = 0.5 + (params.caseComplexity / 100) * 1.5

  // Adjust for urgency
  const urgencyMultiplier = params.urgency ? 1.5 : 1.0

  // Calculate adjusted rates
  const hourlyRateEstimate = {
    low: Math.round(baseRate.hourly.low * locationMultiplier),
    average: Math.round(baseRate.hourly.average * locationMultiplier * complexityFactor),
    high: Math.round(baseRate.hourly.high * locationMultiplier * complexityFactor * urgencyMultiplier),
  }

  const flatFeeEstimate = {
    low: Math.round(baseRate.flat.low * locationMultiplier),
    average: Math.round(baseRate.flat.average * locationMultiplier * complexityFactor),
    high: Math.round(baseRate.flat.high * locationMultiplier * complexityFactor * urgencyMultiplier),
  }

  // Adjust contingency percentage based on complexity
  let contingencyPercentage = baseRate.contingency.percentage
  if (contingencyPercentage > 0) {
    contingencyPercentage = Math.min(40, contingencyPercentage + (params.caseComplexity > 70 ? 5 : 0))
  }

  // Adjust settlement estimate based on complexity
  let estimatedSettlement = baseRate.contingency.settlement
  if (params.caseComplexity > 70) {
    estimatedSettlement = estimatedSettlement * 1.5
  } else if (params.caseComplexity < 30) {
    estimatedSettlement = estimatedSettlement * 0.7
  }

  const contingencyEstimate = {
    percentage: contingencyPercentage,
    estimatedSettlement: Math.round(estimatedSettlement),
    estimatedFee: Math.round(estimatedSettlement * (contingencyPercentage / 100)),
  }

  // Adjust time estimate based on complexity and urgency
  const timeEstimate = {
    hours: Math.round(baseRate.hours * complexityFactor),
    timeframe: params.urgency
      ? baseRate.timeframe.replace(
          /(\d+)-(\d+)/,
          (_, min, max) => `${Math.ceil(Number.parseInt(min) * 0.7)}-${Math.ceil(Number.parseInt(max) * 0.7)}`,
        )
      : baseRate.timeframe,
  }

  return {
    hourlyRateEstimate,
    flatFeeEstimate,
    contingencyEstimate,
    timeEstimate,
    additionalCosts: baseRate.additionalCosts,
    recommendations: baseRate.recommendations,
  }
}
