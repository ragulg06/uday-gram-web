import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  designation: text("designation").notNull(),
  role: text("role").notNull().default("district"),
  mobile: text("mobile"),
  email: text("email"),
  state: text("state"),
  district: text("district"),
  lastLogin: timestamp("last_login"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  designation: true,
  role: true,
  mobile: true,
  email: true,
  state: true,
  district: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Villages table
export const villages = pgTable("villages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  state: text("state").notNull(),
  district: text("district").notNull(),
  block: text("block").notNull(),
  gramPanchayat: text("gram_panchayat").notNull(),
  villageName: text("village_name").notNull(),
  villageCode: text("village_code").notNull().unique(),
  selectionYear: text("selection_year").notNull(),
  verificationStatus: text("verification_status").default("pending"),
  totalPopulation: integer("total_population"),
  scPopulation: integer("sc_population"),
  scPercentage: real("sc_percentage"),
  totalHouseholds: integer("total_households"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertVillageSchema = createInsertSchema(villages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertVillage = z.infer<typeof insertVillageSchema>;
export type Village = typeof villages.$inferSelect;

// Convergence Committee Members
export const committeMembers = pgTable("committee_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  villageId: varchar("village_id").notNull(),
  name: text("name").notNull(),
  designation: text("designation").notNull(),
  mobileNo: text("mobile_no"),
  email: text("email"),
  address: text("address"),
  remarks: text("remarks"),
});

export const insertCommitteeMemberSchema = createInsertSchema(committeMembers).omit({
  id: true,
});

export type InsertCommitteeMember = z.infer<typeof insertCommitteeMemberSchema>;
export type CommitteeMember = typeof committeMembers.$inferSelect;

// Format II - Infrastructure Indicators
export const infrastructureIndicators = pgTable("infrastructure_indicators", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  villageId: varchar("village_id").notNull(),
  domain: text("domain").notNull(),
  indicator: text("indicator").notNull(),
  currentStatus: text("current_status"),
  gapDescription: text("gap_description"),
  actionPlan: text("action_plan"),
  priority: text("priority").default("medium"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertInfrastructureIndicatorSchema = createInsertSchema(infrastructureIndicators).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertInfrastructureIndicator = z.infer<typeof insertInfrastructureIndicatorSchema>;
export type InfrastructureIndicator = typeof infrastructureIndicators.$inferSelect;

// Households
export const households = pgTable("households", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  villageId: varchar("village_id").notNull(),
  householdId: text("household_id").notNull().unique(),
  headName: text("head_name").notNull(),
  address: text("address").notNull(),
  caste: text("caste").notNull(),
  category: text("category").default("SC"),
  members: integer("members").default(1),
  incomeBracket: text("income_bracket"),
  contactNo: text("contact_no"),
  surveyStatus: text("survey_status").default("pending"),
  domainsCompleted: integer("domains_completed").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertHouseholdSchema = createInsertSchema(households).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertHousehold = z.infer<typeof insertHouseholdSchema>;
export type Household = typeof households.$inferSelect;

// Household Survey Responses
export const householdSurveys = pgTable("household_surveys", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  householdId: varchar("household_id").notNull(),
  domain: text("domain").notNull(),
  indicatorId: text("indicator_id").notNull(),
  response: text("response"),
  remarks: text("remarks"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHouseholdSurveySchema = createInsertSchema(householdSurveys).omit({
  id: true,
  createdAt: true,
});

export type InsertHouseholdSurvey = z.infer<typeof insertHouseholdSurveySchema>;
export type HouseholdSurvey = typeof householdSurveys.$inferSelect;

// Beneficiary Initiatives
export const beneficiaryInitiatives = pgTable("beneficiary_initiatives", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  householdId: varchar("household_id").notNull(),
  villageId: varchar("village_id").notNull(),
  domain: text("domain").notNull(),
  indicator: text("indicator").notNull(),
  schemeName: text("scheme_name").notNull(),
  beneficiaryName: text("beneficiary_name").notNull(),
  status: text("status").default("identified"),
  sanctionDate: timestamp("sanction_date"),
  completionDate: timestamp("completion_date"),
  remarks: text("remarks"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBeneficiaryInitiativeSchema = createInsertSchema(beneficiaryInitiatives).omit({
  id: true,
  createdAt: true,
});

export type InsertBeneficiaryInitiative = z.infer<typeof insertBeneficiaryInitiativeSchema>;
export type BeneficiaryInitiative = typeof beneficiaryInitiatives.$inferSelect;

// Format IV - Infrastructure Works and Funding
export const infrastructureWorks = pgTable("infrastructure_works", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  villageId: varchar("village_id").notNull(),
  workName: text("work_name").notNull(),
  domain: text("domain").notNull(),
  monitorableIndicator: text("monitorable_indicator"),
  estimatedCost: real("estimated_cost").default(0),
  centralGovtScheme: text("central_govt_scheme"),
  centralGovtAmount: real("central_govt_amount").default(0),
  stateGovtScheme: text("state_govt_scheme"),
  stateGovtAmount: real("state_govt_amount").default(0),
  gapFillingFund: real("gap_filling_fund").default(0),
  totalFunds: real("total_funds").default(0),
  implementingAgency: text("implementing_agency"),
  duration: text("duration"),
  status: text("status").default("estimation"),
  progressPercent: integer("progress_percent").default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
  remarks: text("remarks"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInfrastructureWorkSchema = createInsertSchema(infrastructureWorks).omit({
  id: true,
  createdAt: true,
});

export type InsertInfrastructureWork = z.infer<typeof insertInfrastructureWorkSchema>;
export type InfrastructureWork = typeof infrastructureWorks.$inferSelect;

// Agencies
export const agencies = pgTable("agencies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(),
  district: text("district"),
  contactPerson: text("contact_person"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAgencySchema = createInsertSchema(agencies).omit({
  id: true,
  createdAt: true,
});

export type InsertAgency = z.infer<typeof insertAgencySchema>;
export type Agency = typeof agencies.$inferSelect;

// Village Development Plans (VDP)
export const vdps = pgTable("vdps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  villageId: varchar("village_id").notNull(),
  status: text("status").default("draft"),
  householdsCompleted: boolean("households_completed").default(false),
  beneficiariesLinked: boolean("beneficiaries_linked").default(false),
  actionPlansSubmitted: boolean("action_plans_submitted").default(false),
  villageScoreVerified: boolean("village_score_verified").default(false),
  estimateSubmitted: boolean("estimate_submitted").default(false),
  totalEstimatedCost: real("total_estimated_cost").default(0),
  submittedAt: timestamp("submitted_at"),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertVdpSchema = createInsertSchema(vdps).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertVdp = z.infer<typeof insertVdpSchema>;
export type Vdp = typeof vdps.$inferSelect;

// Village Scores
export const villageScores = pgTable("village_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  villageId: varchar("village_id").notNull(),
  domain: text("domain").notNull(),
  score: real("score").default(0),
  maxScore: real("max_score").default(100),
  computedAt: timestamp("computed_at").defaultNow(),
});

export const insertVillageScoreSchema = createInsertSchema(villageScores).omit({
  id: true,
  computedAt: true,
});

export type InsertVillageScore = z.infer<typeof insertVillageScoreSchema>;
export type VillageScore = typeof villageScores.$inferSelect;

// Adarsh Gram Declarations
export const adarshGramDeclarations = pgTable("adarsh_gram_declarations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  villageId: varchar("village_id").notNull(),
  status: text("status").default("pending"),
  criteriaChecklist: jsonb("criteria_checklist"),
  recommendedAt: timestamp("recommended_at"),
  declaredAt: timestamp("declared_at"),
  remarks: text("remarks"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAdarshGramDeclarationSchema = createInsertSchema(adarshGramDeclarations).omit({
  id: true,
  createdAt: true,
});

export type InsertAdarshGramDeclaration = z.infer<typeof insertAdarshGramDeclarationSchema>;
export type AdarshGramDeclaration = typeof adarshGramDeclarations.$inferSelect;

// Monthly Reports
export const monthlyReports = pgTable("monthly_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  district: text("district").notNull(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
  villagesOnboarded: integer("villages_onboarded").default(0),
  householdsSurveyed: integer("households_surveyed").default(0),
  infraWorksInProgress: integer("infra_works_in_progress").default(0),
  infraWorksCompleted: integer("infra_works_completed").default(0),
  fundsReleased: real("funds_released").default(0),
  fundsUtilized: real("funds_utilized").default(0),
  summary: text("summary"),
  challenges: text("challenges"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMonthlyReportSchema = createInsertSchema(monthlyReports).omit({
  id: true,
  createdAt: true,
});

export type InsertMonthlyReport = z.infer<typeof insertMonthlyReportSchema>;
export type MonthlyReport = typeof monthlyReports.$inferSelect;

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
