// Minimal schema file to replace the database schema
// This provides the types needed by the server code

import { z } from "zod";

// Users table for authentication
export const users = {}; // Placeholder

export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  name: z.string().min(1),
  designation: z.string().min(1),
  role: z.string().default("district"),
  mobile: z.string().optional(),
  email: z.string().optional(),
  state: z.string().optional(),
  district: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = {
  id: string;
  username: string;
  password: string;
  name: string;
  designation: string;
  role: string;
  mobile?: string;
  email?: string;
  state?: string;
  district?: string;
  lastLogin?: Date;
};

// Villages table
export const villages = {}; // Placeholder

export const insertVillageSchema = z.object({
  state: z.string().min(1),
  district: z.string().min(1),
  block: z.string().min(1),
  gramPanchayat: z.string().min(1),
  villageName: z.string().min(1),
  villageCode: z.string().min(1),
  selectionYear: z.string().min(1),
  verificationStatus: z.string().default("pending"),
  totalPopulation: z.number().optional(),
  scPopulation: z.number().optional(),
  scPercentage: z.number().optional(),
  totalHouseholds: z.number().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

export type InsertVillage = z.infer<typeof insertVillageSchema>;
export type Village = {
  id: string;
  state: string;
  district: string;
  block: string;
  gramPanchayat: string;
  villageName: string;
  villageCode: string;
  selectionYear: string;
  verificationStatus: string;
  totalPopulation?: number;
  scPopulation?: number;
  scPercentage?: number;
  totalHouseholds?: number;
  latitude?: string;
  longitude?: string;
  createdAt: Date;
  updatedAt: Date;
};

// Convergence Committee Members
export const committeMembers = {}; // Placeholder

export const insertCommitteeMemberSchema = z.object({
  villageId: z.string().min(1),
  name: z.string().min(1),
  designation: z.string().min(1),
  mobileNo: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  remarks: z.string().optional(),
});

export type InsertCommitteeMember = z.infer<typeof insertCommitteeMemberSchema>;
export type CommitteeMember = {
  id: string;
  villageId: string;
  name: string;
  designation: string;
  mobileNo?: string;
  email?: string;
  address?: string;
  remarks?: string;
};

// Format II - Infrastructure Indicators
export const infrastructureIndicators = {}; // Placeholder

export const insertInfrastructureIndicatorSchema = z.object({
  villageId: z.string().min(1),
  domain: z.string().min(1),
  indicator: z.string().min(1),
  currentStatus: z.string().optional(),
  gapDescription: z.string().optional(),
  actionPlan: z.string().optional(),
  priority: z.string().default("medium"),
});

export type InsertInfrastructureIndicator = z.infer<typeof insertInfrastructureIndicatorSchema>;
export type InfrastructureIndicator = {
  id: string;
  villageId: string;
  domain: string;
  indicator: string;
  currentStatus?: string;
  gapDescription?: string;
  actionPlan?: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
};

// Households
export const households = {}; // Placeholder

export const insertHouseholdSchema = z.object({
  villageId: z.string().min(1),
  householdId: z.string().min(1),
  headName: z.string().min(1),
  address: z.string().min(1),
  caste: z.string().min(1),
  category: z.string().default("SC"),
  members: z.number().default(1),
  incomeBracket: z.string().optional(),
  contactNo: z.string().optional(),
  surveyStatus: z.string().default("pending"),
  domainsCompleted: z.number().default(0),
});

export type InsertHousehold = z.infer<typeof insertHouseholdSchema>;
export type Household = {
  id: string;
  villageId: string;
  householdId: string;
  headName: string;
  address: string;
  caste: string;
  category: string;
  members: number;
  incomeBracket?: string;
  contactNo?: string;
  surveyStatus: string;
  domainsCompleted: number;
  createdAt: Date;
  updatedAt: Date;
};

// Household Survey Responses
export const householdSurveys = {}; // Placeholder

export const insertHouseholdSurveySchema = z.object({
  householdId: z.string().min(1),
  domain: z.string().min(1),
  indicatorId: z.string().min(1),
  response: z.string().optional(),
  remarks: z.string().optional(),
});

export type InsertHouseholdSurvey = z.infer<typeof insertHouseholdSurveySchema>;
export type HouseholdSurvey = {
  id: string;
  householdId: string;
  domain: string;
  indicatorId: string;
  response?: string;
  remarks?: string;
  createdAt: Date;
};

// Beneficiary Initiatives
export const beneficiaryInitiatives = {}; // Placeholder

export const insertBeneficiaryInitiativeSchema = z.object({
  householdId: z.string().min(1),
  villageId: z.string().min(1),
  domain: z.string().min(1),
  indicator: z.string().min(1),
  schemeName: z.string().min(1),
  beneficiaryName: z.string().min(1),
  status: z.string().default("identified"),
  sanctionDate: z.date().optional(),
  completionDate: z.date().optional(),
  remarks: z.string().optional(),
});

export type InsertBeneficiaryInitiative = z.infer<typeof insertBeneficiaryInitiativeSchema>;
export type BeneficiaryInitiative = {
  id: string;
  householdId: string;
  villageId: string;
  domain: string;
  indicator: string;
  schemeName: string;
  beneficiaryName: string;
  status: string;
  sanctionDate?: Date;
  completionDate?: Date;
  remarks?: string;
  createdAt: Date;
};

// Format IV - Infrastructure Works and Funding
export const infrastructureWorks = {}; // Placeholder

export const insertInfrastructureWorkSchema = z.object({
  villageId: z.string().min(1),
  workName: z.string().min(1),
  domain: z.string().min(1),
  monitorableIndicator: z.string().optional(),
  estimatedCost: z.number().default(0),
  centralGovtScheme: z.string().optional(),
  centralGovtAmount: z.number().default(0),
  stateGovtScheme: z.string().optional(),
  stateGovtAmount: z.number().default(0),
  gapFillingFund: z.number().default(0),
  totalFunds: z.number().default(0),
  implementingAgency: z.string().optional(),
  duration: z.string().optional(),
  status: z.string().default("estimation"),
  progressPercent: z.number().default(0),
  remarks: z.string().optional(),
});

export type InsertInfrastructureWork = z.infer<typeof insertInfrastructureWorkSchema>;
export type InfrastructureWork = {
  id: string;
  villageId: string;
  workName: string;
  domain: string;
  monitorableIndicator?: string;
  estimatedCost: number;
  centralGovtScheme?: string;
  centralGovtAmount: number;
  stateGovtScheme?: string;
  stateGovtAmount: number;
  gapFillingFund: number;
  totalFunds: number;
  implementingAgency?: string;
  duration?: string;
  status: string;
  progressPercent: number;
  lastUpdated: Date;
  remarks?: string;
  createdAt: Date;
};

// Agencies
export const agencies = {}; // Placeholder

export const insertAgencySchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  district: z.string().optional(),
  contactPerson: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
});

export type InsertAgency = z.infer<typeof insertAgencySchema>;
export type Agency = {
  id: string;
  name: string;
  type: string;
  district?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  createdAt: Date;
};

// Village Development Plans (VDP)
export const vdps = {}; // Placeholder

export const insertVdpSchema = z.object({
  villageId: z.string().min(1),
  status: z.string().default("draft"),
  householdsCompleted: z.boolean().default(false),
  beneficiariesLinked: z.boolean().default(false),
  actionPlansSubmitted: z.boolean().default(false),
  villageScoreVerified: z.boolean().default(false),
  estimateSubmitted: z.boolean().default(false),
  totalEstimatedCost: z.number().default(0),
});

export type InsertVdp = z.infer<typeof insertVdpSchema>;
export type Vdp = {
  id: string;
  villageId: string;
  status: string;
  householdsCompleted: boolean;
  beneficiariesLinked: boolean;
  actionPlansSubmitted: boolean;
  villageScoreVerified: boolean;
  estimateSubmitted: boolean;
  totalEstimatedCost: number;
  submittedAt?: Date;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

// Village Scores
export const villageScores = {}; // Placeholder

export const insertVillageScoreSchema = z.object({
  villageId: z.string().min(1),
  domain: z.string().min(1),
  score: z.number().default(0),
  maxScore: z.number().default(100),
});

export type InsertVillageScore = z.infer<typeof insertVillageScoreSchema>;
export type VillageScore = {
  id: string;
  villageId: string;
  domain: string;
  score: number;
  maxScore: number;
  computedAt: Date;
};

// Adarsh Gram Declarations
export const adarshGramDeclarations = {}; // Placeholder

export const insertAdarshGramDeclarationSchema = z.object({
  villageId: z.string().min(1),
  status: z.string().default("pending"),
  criteriaChecklist: z.any().optional(),
  remarks: z.string().optional(),
});

export type InsertAdarshGramDeclaration = z.infer<typeof insertAdarshGramDeclarationSchema>;
export type AdarshGramDeclaration = {
  id: string;
  villageId: string;
  status: string;
  criteriaChecklist?: any;
  recommendedAt?: Date;
  declaredAt?: Date;
  remarks?: string;
  createdAt: Date;
};

// File Uploads
export const uploads = {}; // Placeholder

export const insertUploadSchema = z.object({
  filename: z.string().min(1),
  originalName: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.number().min(1),
  uploadType: z.string().min(1),
  entityId: z.string().optional(),
  entityType: z.string().optional(),
  uploadedBy: z.string().optional(),
});

export type InsertUpload = z.infer<typeof insertUploadSchema>;
export type Upload = {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadType: string;
  entityId?: string;
  entityType?: string;
  uploadedBy?: string;
  createdAt: Date;
};

// Monthly Reports
export const monthlyReports = {}; // Placeholder

export const insertMonthlyReportSchema = z.object({
  district: z.string().min(1),
  month: z.string().min(1),
  year: z.number().min(1),
  villagesOnboarded: z.number().default(0),
  householdsSurveyed: z.number().default(0),
  infraWorksInProgress: z.number().default(0),
  infraWorksCompleted: z.number().default(0),
  fundsReleased: z.number().default(0),
  fundsUtilized: z.number().default(0),
  summary: z.string().optional(),
  challenges: z.string().optional(),
});

export type InsertMonthlyReport = z.infer<typeof insertMonthlyReportSchema>;
export type MonthlyReport = {
  id: string;
  district: string;
  month: string;
  year: number;
  villagesOnboarded: number;
  householdsSurveyed: number;
  infraWorksInProgress: number;
  infraWorksCompleted: number;
  fundsReleased: number;
  fundsUtilized: number;
  summary?: string;
  challenges?: string;
  createdAt: Date;
};

// Dashboard Stats Type
export type DashboardStats = {
  villagesCovered: number;
  householdsSurveyed: number;
  infraWorksInProgress: number;
  infraWorksCompleted: number;
  fundsReleased: number;
  fundsUtilized: number;
  adarshGramsRecommended: number;
  adarshGramsDeclared: number;
  beneficiariesIdentified: number;
  beneficiariesSaturated: number;
};

// Location hierarchy types
export type State = {
  code: string;
  name: string;
};

export type District = {
  code: string;
  name: string;
  stateCode: string;
};

export type Block = {
  code: string;
  name: string;
  districtCode: string;
};

export type GramPanchayat = {
  code: string;
  name: string;
  blockCode: string;
};

// Domain types for forms
export type Domain = {
  id: string;
  name: string;
  indicators: Indicator[];
};

export type Indicator = {
  id: string;
  name: string;
  type: "yes_no" | "number" | "text" | "select";
  options?: string[];
};
