import type { 
  DashboardStats, 
  State, 
  District, 
  Block, 
  GramPanchayat, 
  Domain,
  Village,
  Household,
  Agency,
  InfrastructureWork,
  BeneficiaryInitiative,
  Vdp
} from "@shared/schema";

export const dashboardStats: DashboardStats = {
  villagesCovered: 45,
  householdsSurveyed: 15632,
  infraWorksInProgress: 128,
  infraWorksCompleted: 87,
  fundsReleased: 4560000,
  fundsUtilized: 3890000,
  adarshGramsRecommended: 12,
  adarshGramsDeclared: 8,
  beneficiariesIdentified: 3199,
  beneficiariesSaturated: 2121,
};

export const states: State[] = [
  { code: "DL", name: "DELHI" },
  { code: "UP", name: "UTTAR PRADESH" },
  { code: "MP", name: "MADHYA PRADESH" },
  { code: "RJ", name: "RAJASTHAN" },
  { code: "JK", name: "JAMMU AND KASHMIR" },
];

export const districts: District[] = [
  { code: "SW", name: "SOUTH WEST", stateCode: "DL" },
  { code: "NW", name: "NORTH WEST", stateCode: "DL" },
  { code: "LKO", name: "LUCKNOW", stateCode: "UP" },
  { code: "BPL", name: "BHOPAL", stateCode: "MP" },
  { code: "DODA", name: "DODA", stateCode: "JK" },
];

export const blocks: Block[] = [
  { code: "DWE", name: "Delhi W EST", districtCode: "SW" },
  { code: "DWE2", name: "Delhi W EST1", districtCode: "SW" },
  { code: "BLN", name: "Blandpur", districtCode: "DODA" },
];

export const gramPanchayats: GramPanchayat[] = [
  { code: "450010", name: "Delhi West - 450010", blockCode: "DWE" },
  { code: "450011", name: "Delhi West - 450011", blockCode: "DWE2" },
  { code: "6950", name: "Blandpur - 6950", blockCode: "BLN" },
];

export const mockVillages: Village[] = [
  {
    id: "1",
    state: "DELHI",
    district: "SOUTH WEST",
    block: "Delhi W EST",
    gramPanchayat: "Delhi West - 450010",
    villageName: "Rewla Khanm Pur - 64014",
    villageCode: "64014",
    selectionYear: "2022-2023",
    verificationStatus: "correct",
    totalPopulation: 5420,
    scPopulation: 2890,
    scPercentage: 53.3,
    totalHouseholds: 892,
    latitude: "28.62623",
    longitude: "77.21808",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    state: "DELHI",
    district: "SOUTH WEST",
    block: "Delhi W EST1",
    gramPanchayat: "Delhi West - 450011",
    villageName: "Badhosro - 64032",
    villageCode: "64032",
    selectionYear: "2022-2023",
    verificationStatus: "pending",
    totalPopulation: 3210,
    scPopulation: 1820,
    scPercentage: 56.7,
    totalHouseholds: 542,
    latitude: "28.58942",
    longitude: "77.19234",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    state: "JAMMU AND KASHMIR",
    district: "DODA",
    block: "Blandpur",
    gramPanchayat: "Blandpur - 6950",
    villageName: "Buland Pur - 4186",
    villageCode: "4186",
    selectionYear: "2018-2019",
    verificationStatus: "correct",
    totalPopulation: 1850,
    scPopulation: 1120,
    scPercentage: 60.5,
    totalHouseholds: 312,
    latitude: "33.14523",
    longitude: "75.54321",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockHouseholds: Household[] = [
  {
    id: "1",
    villageId: "1",
    householdId: "dl-sw-450010-64014-00001",
    headName: "Pratap Singh",
    address: "abd 233, loadthi ladif",
    caste: "SC",
    category: "SC",
    members: 8,
    incomeBracket: "Below 1 Lakh",
    contactNo: "9876543210",
    surveyStatus: "completed",
    domainsCompleted: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    villageId: "1",
    householdId: "dl-sw-450010-64014-00002",
    headName: "Ram Kumar",
    address: "House 45, Main Street",
    caste: "SC",
    category: "SC",
    members: 5,
    incomeBracket: "1-2 Lakh",
    contactNo: "9876543211",
    surveyStatus: "in_progress",
    domainsCompleted: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    villageId: "1",
    householdId: "dl-sw-450010-64014-00003",
    headName: "Kavita Devi",
    address: "Plot 78, New Colony",
    caste: "SC",
    category: "SC",
    members: 6,
    incomeBracket: "Below 1 Lakh",
    contactNo: "9876543212",
    surveyStatus: "pending",
    domainsCompleted: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockAgencies: Agency[] = [
  {
    id: "1",
    name: "PWD Delhi",
    type: "Government",
    district: "SOUTH WEST",
    contactPerson: "Sh. Rajesh Kumar",
    phone: "011-23456789",
    email: "pwd.delhi@gov.in",
    address: "Vikas Bhawan, Delhi",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "CPWD",
    type: "Central Government",
    district: "All Districts",
    contactPerson: "Sh. Suresh Sharma",
    phone: "011-23456790",
    email: "cpwd@gov.in",
    address: "Nirman Bhawan, Delhi",
    createdAt: new Date(),
  },
];

export const mockInfrastructureWorks: InfrastructureWork[] = [
  {
    id: "1",
    villageId: "1",
    workName: "3 hand pumps will be installed to provide adequate water",
    domain: "Drinking water and Sanitation",
    monitorableIndicator: "I1 - Whether adequate sustainable drinking water sources to cover the village are available?",
    estimatedCost: 60000,
    centralGovtScheme: "PMAJAY",
    centralGovtAmount: 20000,
    stateGovtScheme: "State Water Mission",
    stateGovtAmount: 15000,
    gapFillingFund: 25000,
    totalFunds: 60000,
    implementingAgency: "PWD Delhi",
    duration: "3 months",
    status: "in_progress",
    progressPercent: 45,
    lastUpdated: new Date(),
    remarks: "Work in progress",
    createdAt: new Date(),
  },
  {
    id: "2",
    villageId: "1",
    workName: "Construction of drains along internal roads",
    domain: "Drinking water and Sanitation",
    monitorableIndicator: "I6 - % of drains available along all internal roads",
    estimatedCost: 150000,
    centralGovtScheme: "PMAJAY",
    centralGovtAmount: 75000,
    stateGovtScheme: "State Rural Dev",
    stateGovtAmount: 50000,
    gapFillingFund: 25000,
    totalFunds: 150000,
    implementingAgency: "PWD Delhi",
    duration: "6 months",
    status: "not_started",
    progressPercent: 0,
    lastUpdated: new Date(),
    remarks: "",
    createdAt: new Date(),
  },
];

export const mockBeneficiaryInitiatives: BeneficiaryInitiative[] = [
  {
    id: "1",
    householdId: "1",
    villageId: "1",
    domain: "Education",
    indicator: "Pre-matric Scholarship for SC Students",
    schemeName: "Pre-Matric Scholarship",
    beneficiaryName: "kavita",
    status: "sanctioned",
    sanctionDate: new Date("2024-02-15"),
    completionDate: null,
    remarks: "details are necessary",
    createdAt: new Date(),
  },
  {
    id: "2",
    householdId: "2",
    villageId: "1",
    domain: "Health and Nutrition",
    indicator: "Ayushman Bharat Coverage",
    schemeName: "Ayushman Bharat",
    beneficiaryName: "Ram Kumar",
    status: "completed",
    sanctionDate: new Date("2024-01-10"),
    completionDate: new Date("2024-02-20"),
    remarks: "",
    createdAt: new Date(),
  },
];

export const mockVdps: Vdp[] = [
  {
    id: "1",
    villageId: "1",
    status: "submitted",
    householdsCompleted: true,
    beneficiariesLinked: true,
    actionPlansSubmitted: true,
    villageScoreVerified: true,
    estimateSubmitted: true,
    totalEstimatedCost: 2500000,
    submittedAt: new Date("2024-03-15"),
    approvedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    villageId: "3",
    status: "draft",
    householdsCompleted: true,
    beneficiariesLinked: false,
    actionPlansSubmitted: false,
    villageScoreVerified: false,
    estimateSubmitted: false,
    totalEstimatedCost: 0,
    submittedAt: null,
    approvedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const domains: Domain[] = [
  {
    id: "1",
    name: "Drinking water and Sanitation",
    indicators: [
      { id: "1.1", name: "Whether adequate sustainable drinking water sources to cover the village are available?", type: "yes_no" },
      { id: "1.2", name: "Is an emergency Ambulance facility available on call?", type: "yes_no" },
      { id: "1.3", name: "% of households having Individual Household Latrines (IHHL)", type: "number" },
      { id: "1.4", name: "% of solid and liquid waste being disposed effectively", type: "number" },
      { id: "1.5", name: "Total length (in Metres) of internal roads in the village", type: "number" },
      { id: "1.6", name: "% of drains available along all internal roads", type: "number" },
    ],
  },
  {
    id: "2",
    name: "Education",
    indicators: [
      { id: "2.1", name: "No. of SC children in the village eligible for getting Pre-matric Scholarship", type: "number" },
      { id: "2.2", name: "No. of children receiving Pre-matric Scholarship for SC students", type: "number" },
      { id: "2.3", name: "% of SC children (out of those attending school & eligible) receiving pre-matric scholarship", type: "number" },
      { id: "2.4", name: "Is Primary school available within 1 km?", type: "yes_no" },
      { id: "2.5", name: "Is Secondary school available within 3 km?", type: "yes_no" },
    ],
  },
  {
    id: "3",
    name: "Health and Nutrition",
    indicators: [
      { id: "3.1", name: "Is there a Sub-centre / PHC / CHC within 3 km?", type: "yes_no" },
      { id: "3.2", name: "Is an emergency Ambulance facility available on call?", type: "yes_no" },
      { id: "3.3", name: "% of eligible children immunized", type: "number" },
      { id: "3.4", name: "% of pregnant women receiving ANC check-ups", type: "number" },
      { id: "3.5", name: "Is Anganwadi centre functional in the village?", type: "yes_no" },
    ],
  },
  {
    id: "4",
    name: "Social Security",
    indicators: [
      { id: "4.1", name: "% of eligible persons receiving old age pension", type: "number" },
      { id: "4.2", name: "% of eligible persons receiving widow pension", type: "number" },
      { id: "4.3", name: "% of eligible persons receiving disability pension", type: "number" },
    ],
  },
  {
    id: "5",
    name: "Rural Housing",
    indicators: [
      { id: "5.1", name: "% of households living in pucca houses", type: "number" },
      { id: "5.2", name: "% of eligible households covered under PMAY-G", type: "number" },
    ],
  },
  {
    id: "6",
    name: "Road Connectivity and Electricity",
    indicators: [
      { id: "6.1", name: "Is the village connected by all-weather road?", type: "yes_no" },
      { id: "6.2", name: "% of households having electricity connection", type: "number" },
      { id: "6.3", name: "Are street lights installed and functional?", type: "yes_no" },
    ],
  },
  {
    id: "7",
    name: "Livelihood and Skill Development",
    indicators: [
      { id: "7.1", name: "% of eligible beneficiaries covered under MGNREGA", type: "number" },
      { id: "7.2", name: "% of youth who received skill training", type: "number" },
      { id: "7.3", name: "Is bank/post office available within 5 km?", type: "yes_no" },
    ],
  },
  {
    id: "8",
    name: "Agriculture Allied Activities",
    indicators: [
      { id: "8.1", name: "% of farmers having irrigation facilities", type: "number" },
      { id: "8.2", name: "% of farmers using modern agricultural practices", type: "number" },
      { id: "8.3", name: "Is agricultural market available within 10 km?", type: "yes_no" },
    ],
  },
];

export const schemeWiseFundAllocation = [
  { name: "Central Govt.", value: 70.5, color: "#22C55E" },
  { name: "State Govt.", value: 19.5, color: "#3B82F6" },
  { name: "Gap Filling", value: 10.0, color: "#F59E0B" },
];

export const adarshGramDeclarationData = [
  { year: "2018-2019", totalVillages: 5, declared: 3 },
  { year: "2019-2020", totalVillages: 8, declared: 5 },
  { year: "2020-2021", totalVillages: 10, declared: 7 },
  { year: "2021-2022", totalVillages: 12, declared: 9 },
  { year: "2022-2023", totalVillages: 10, declared: 6 },
];

export const householdsSurveyData = [
  { name: "Total Households", value: 15632 },
  { name: "Survey Initiated", value: 12450 },
  { name: "Survey Completed", value: 10234 },
];

export const infrastructureWorkInfo = [
  { domain: "Drinking Water", inProgress: 11, completed: 13, gapFilling: 4 },
  { domain: "Education", inProgress: 10, completed: 14, gapFilling: 3 },
  { domain: "Health", inProgress: 8, completed: 10, gapFilling: 6 },
  { domain: "Roads", inProgress: 12, completed: 16, gapFilling: 4 },
  { domain: "Sanitation", inProgress: 15, completed: 11, gapFilling: 5 },
  { domain: "Housing", inProgress: 9, completed: 12, gapFilling: 4 },
  { domain: "Electricity", inProgress: 11, completed: 15, gapFilling: 3 },
  { domain: "Livelihood", inProgress: 6, completed: 8, gapFilling: 4 },
];

export const completionOfInfraWorks = [
  { name: "Completed", value: 60.4, color: "#22C55E" },
  { name: "In Progress", value: 25.0, color: "#F59E0B" },
  { name: "Not Started", value: 14.6, color: "#EF4444" },
];

export const villageVdpData = [
  { name: "Draft", value: 11, color: "#3B82F6" },
  { name: "Completed", value: 17, color: "#22C55E" },
];

export const estimationWorksConvergence = [
  { name: "Estimation of works", value: 75, color: "#22C55E" },
  { name: "Utilization of works", value: 73, color: "#3B82F6" },
];

export const estimationWorksGapFilling = [
  { name: "Estimation of works", value: 75, color: "#22C55E" },
  { name: "Utilization of works", value: 50, color: "#3B82F6" },
];

export const faqItems = [
  {
    question: "What is PM-AJAY (Adarsh Gram Component)?",
    answer: "PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana) - Adarsh Gram Component is a flagship scheme of Department of Social Justice and Empowerment, Government of India. It enables area-based integrated development approach for scheduled caste dominated villages."
  },
  {
    question: "How are villages selected under this scheme?",
    answer: "Villages are selected based on having a significant SC population (usually more than 50%). The selection is done by the State Government in consultation with the District administration."
  },
  {
    question: "What is a Village Development Plan (VDP)?",
    answer: "VDP is a comprehensive plan that identifies gaps in infrastructure and services in a village, proposes interventions, estimates costs, and identifies funding sources. It is prepared based on household surveys and infrastructure assessments."
  },
  {
    question: "What are the key domains covered under the scheme?",
    answer: "The scheme covers 8 key domains: Drinking Water & Sanitation, Education, Health & Nutrition, Social Security, Rural Housing, Road Connectivity & Electricity, Livelihood & Skill Development, and Agriculture Allied Activities."
  },
  {
    question: "What is an Adarsh Gram?",
    answer: "An Adarsh Gram is a village that has achieved specified criteria across all development domains. Villages that meet all the monitorable indicators can be declared as Adarsh Gram."
  },
  {
    question: "How can I access the portal?",
    answer: "The portal can be accessed through https://pmagy.gov.in. You need authorized credentials from your State/District administration to login."
  },
  {
    question: "Who can I contact for technical support?",
    answer: "For technical support, you can email support@pmagy-msje.gov.in or contact your State Nodal Officer. The helpdesk is available during working hours."
  },
];

export const tutorialVideos = [
  {
    id: "1",
    title: "Introduction to PM-AJAY Portal",
    description: "Overview of the portal features and navigation",
    duration: "10:25",
    thumbnail: "",
  },
  {
    id: "2",
    title: "How to Complete Format I - Village Profile",
    description: "Step-by-step guide for filling village profile data",
    duration: "15:30",
    thumbnail: "",
  },
  {
    id: "3",
    title: "Household Survey Process",
    description: "Learn how to conduct and record household surveys",
    duration: "12:45",
    thumbnail: "",
  },
  {
    id: "4",
    title: "Generating Village Development Plan",
    description: "Complete guide to VDP generation and submission",
    duration: "18:20",
    thumbnail: "",
  },
  {
    id: "5",
    title: "Progress Reporting",
    description: "How to submit infrastructure and beneficiary progress",
    duration: "08:15",
    thumbnail: "",
  },
];

export const siteMapLinks = [
  {
    category: "Main",
    links: ["Home", "Dashboard", "Login", "Logout"]
  },
  {
    category: "Village Management",
    links: ["Village Verification", "Format I - Village Profile", "Format II - Infrastructure", "Format III(A) - Household Survey", "Format III(B) - Beneficiary Initiatives", "Format IV - Costing"]
  },
  {
    category: "Planning & Progress",
    links: ["Generate Village Score", "Manage VDP", "Submit Progress", "Adarsh Gram Declaration"]
  },
  {
    category: "Administration",
    links: ["Agency Management", "Reports", "Upload Video/Image"]
  },
  {
    category: "Help & Support",
    links: ["Tutorial Videos", "FAQ", "Contact Us", "Site Map", "Feedback"]
  },
];
