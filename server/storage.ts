import { eq, and, desc, sql, count, sum } from "drizzle-orm";
import { db } from "./db";
import {
  type User, type InsertUser, users,
  type Village, type InsertVillage, villages,
  type CommitteeMember, type InsertCommitteeMember, committeMembers,
  type InfrastructureIndicator, type InsertInfrastructureIndicator, infrastructureIndicators,
  type Household, type InsertHousehold, households,
  type HouseholdSurvey, type InsertHouseholdSurvey, householdSurveys,
  type BeneficiaryInitiative, type InsertBeneficiaryInitiative, beneficiaryInitiatives,
  type InfrastructureWork, type InsertInfrastructureWork, infrastructureWorks,
  type Agency, type InsertAgency, agencies,
  type Vdp, type InsertVdp, vdps,
  type VillageScore, type InsertVillageScore, villageScores,
  type AdarshGramDeclaration, type InsertAdarshGramDeclaration, adarshGramDeclarations,
  type MonthlyReport, type InsertMonthlyReport, monthlyReports,
  type Upload, type InsertUpload, uploads,
  type DashboardStats,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserLastLogin(id: string): Promise<void>;

  listVillages(filters?: { state?: string; district?: string; block?: string }): Promise<Village[]>;
  getVillage(id: string): Promise<Village | undefined>;
  getVillageByCode(code: string): Promise<Village | undefined>;
  createVillage(village: InsertVillage): Promise<Village>;
  updateVillage(id: string, village: Partial<InsertVillage>): Promise<Village | undefined>;

  listCommitteeMembers(villageId: string): Promise<CommitteeMember[]>;
  createCommitteeMember(member: InsertCommitteeMember): Promise<CommitteeMember>;
  deleteCommitteeMember(id: string): Promise<void>;

  listInfrastructureIndicators(villageId: string): Promise<InfrastructureIndicator[]>;
  createInfrastructureIndicator(indicator: InsertInfrastructureIndicator): Promise<InfrastructureIndicator>;
  updateInfrastructureIndicator(id: string, indicator: Partial<InsertInfrastructureIndicator>): Promise<InfrastructureIndicator | undefined>;

  listHouseholds(villageId: string): Promise<Household[]>;
  getHousehold(id: string): Promise<Household | undefined>;
  createHousehold(household: InsertHousehold): Promise<Household>;
  updateHousehold(id: string, household: Partial<InsertHousehold>): Promise<Household | undefined>;

  listHouseholdSurveys(householdId: string): Promise<HouseholdSurvey[]>;
  createHouseholdSurvey(survey: InsertHouseholdSurvey): Promise<HouseholdSurvey>;

  listBeneficiaryInitiatives(villageId: string): Promise<BeneficiaryInitiative[]>;
  createBeneficiaryInitiative(initiative: InsertBeneficiaryInitiative): Promise<BeneficiaryInitiative>;
  updateBeneficiaryInitiative(id: string, initiative: Partial<InsertBeneficiaryInitiative>): Promise<BeneficiaryInitiative | undefined>;

  listInfrastructureWorks(villageId: string): Promise<InfrastructureWork[]>;
  getInfrastructureWork(id: string): Promise<InfrastructureWork | undefined>;
  createInfrastructureWork(work: InsertInfrastructureWork): Promise<InfrastructureWork>;
  updateInfrastructureWork(id: string, work: Partial<InsertInfrastructureWork>): Promise<InfrastructureWork | undefined>;

  listAgencies(): Promise<Agency[]>;
  createAgency(agency: InsertAgency): Promise<Agency>;

  getVdp(villageId: string): Promise<Vdp | undefined>;
  getVdpById(id: string): Promise<Vdp | undefined>;
  createVdp(vdp: InsertVdp): Promise<Vdp>;
  updateVdp(id: string, vdp: Partial<InsertVdp>): Promise<Vdp | undefined>;

  listVillageScores(villageId: string): Promise<VillageScore[]>;
  upsertVillageScore(score: InsertVillageScore): Promise<VillageScore>;

  getAdarshGramDeclaration(villageId: string): Promise<AdarshGramDeclaration | undefined>;
  createAdarshGramDeclaration(declaration: InsertAdarshGramDeclaration): Promise<AdarshGramDeclaration>;
  updateAdarshGramDeclaration(id: string, declaration: Partial<InsertAdarshGramDeclaration>): Promise<AdarshGramDeclaration | undefined>;

  listMonthlyReports(filters?: { district?: string; month?: string; year?: number }): Promise<MonthlyReport[]>;
  createMonthlyReport(report: InsertMonthlyReport): Promise<MonthlyReport>;

  listUploads(entityId?: string, entityType?: string): Promise<Upload[]>;
  getUpload(id: string): Promise<Upload | undefined>;
  createUpload(upload: InsertUpload): Promise<Upload>;
  deleteUpload(id: string): Promise<void>;

  getDashboardStats(filters?: { state?: string; district?: string }): Promise<DashboardStats>;
}

export class PostgresStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserLastLogin(id: string): Promise<void> {
    await db.update(users).set({ lastLogin: new Date() }).where(eq(users.id, id));
  }

  async listVillages(filters?: { state?: string; district?: string; block?: string }): Promise<Village[]> {
    let query = db.select().from(villages);
    const conditions = [];
    if (filters?.state) conditions.push(eq(villages.state, filters.state));
    if (filters?.district) conditions.push(eq(villages.district, filters.district));
    if (filters?.block) conditions.push(eq(villages.block, filters.block));
    if (conditions.length > 0) {
      return await db.select().from(villages).where(and(...conditions)).orderBy(desc(villages.createdAt));
    }
    return await db.select().from(villages).orderBy(desc(villages.createdAt));
  }

  async getVillage(id: string): Promise<Village | undefined> {
    const [village] = await db.select().from(villages).where(eq(villages.id, id));
    return village;
  }

  async getVillageByCode(code: string): Promise<Village | undefined> {
    const [village] = await db.select().from(villages).where(eq(villages.villageCode, code));
    return village;
  }

  async createVillage(village: InsertVillage): Promise<Village> {
    const [created] = await db.insert(villages).values(village).returning();
    return created;
  }

  async updateVillage(id: string, village: Partial<InsertVillage>): Promise<Village | undefined> {
    const [updated] = await db.update(villages).set({ ...village, updatedAt: new Date() }).where(eq(villages.id, id)).returning();
    return updated;
  }

  async listCommitteeMembers(villageId: string): Promise<CommitteeMember[]> {
    return await db.select().from(committeMembers).where(eq(committeMembers.villageId, villageId));
  }

  async createCommitteeMember(member: InsertCommitteeMember): Promise<CommitteeMember> {
    const [created] = await db.insert(committeMembers).values(member).returning();
    return created;
  }

  async deleteCommitteeMember(id: string): Promise<void> {
    await db.delete(committeMembers).where(eq(committeMembers.id, id));
  }

  async listInfrastructureIndicators(villageId: string): Promise<InfrastructureIndicator[]> {
    return await db.select().from(infrastructureIndicators).where(eq(infrastructureIndicators.villageId, villageId));
  }

  async createInfrastructureIndicator(indicator: InsertInfrastructureIndicator): Promise<InfrastructureIndicator> {
    const [created] = await db.insert(infrastructureIndicators).values(indicator).returning();
    return created;
  }

  async updateInfrastructureIndicator(id: string, indicator: Partial<InsertInfrastructureIndicator>): Promise<InfrastructureIndicator | undefined> {
    const [updated] = await db.update(infrastructureIndicators).set({ ...indicator, updatedAt: new Date() }).where(eq(infrastructureIndicators.id, id)).returning();
    return updated;
  }

  async listHouseholds(villageId: string): Promise<Household[]> {
    return await db.select().from(households).where(eq(households.villageId, villageId));
  }

  async getHousehold(id: string): Promise<Household | undefined> {
    const [household] = await db.select().from(households).where(eq(households.id, id));
    return household;
  }

  async createHousehold(household: InsertHousehold): Promise<Household> {
    const [created] = await db.insert(households).values(household).returning();
    return created;
  }

  async updateHousehold(id: string, household: Partial<InsertHousehold>): Promise<Household | undefined> {
    const [updated] = await db.update(households).set({ ...household, updatedAt: new Date() }).where(eq(households.id, id)).returning();
    return updated;
  }

  async listHouseholdSurveys(householdId: string): Promise<HouseholdSurvey[]> {
    return await db.select().from(householdSurveys).where(eq(householdSurveys.householdId, householdId));
  }

  async createHouseholdSurvey(survey: InsertHouseholdSurvey): Promise<HouseholdSurvey> {
    const [created] = await db.insert(householdSurveys).values(survey).returning();
    return created;
  }

  async listBeneficiaryInitiatives(villageId: string): Promise<BeneficiaryInitiative[]> {
    return await db.select().from(beneficiaryInitiatives).where(eq(beneficiaryInitiatives.villageId, villageId));
  }

  async createBeneficiaryInitiative(initiative: InsertBeneficiaryInitiative): Promise<BeneficiaryInitiative> {
    const [created] = await db.insert(beneficiaryInitiatives).values(initiative).returning();
    return created;
  }

  async updateBeneficiaryInitiative(id: string, initiative: Partial<InsertBeneficiaryInitiative>): Promise<BeneficiaryInitiative | undefined> {
    const [updated] = await db.update(beneficiaryInitiatives).set(initiative).where(eq(beneficiaryInitiatives.id, id)).returning();
    return updated;
  }

  async listInfrastructureWorks(villageId: string): Promise<InfrastructureWork[]> {
    return await db.select().from(infrastructureWorks).where(eq(infrastructureWorks.villageId, villageId));
  }

  async getInfrastructureWork(id: string): Promise<InfrastructureWork | undefined> {
    const [work] = await db.select().from(infrastructureWorks).where(eq(infrastructureWorks.id, id));
    return work;
  }

  async createInfrastructureWork(work: InsertInfrastructureWork): Promise<InfrastructureWork> {
    const [created] = await db.insert(infrastructureWorks).values(work).returning();
    return created;
  }

  async updateInfrastructureWork(id: string, work: Partial<InsertInfrastructureWork>): Promise<InfrastructureWork | undefined> {
    const [updated] = await db.update(infrastructureWorks).set({ ...work, lastUpdated: new Date() }).where(eq(infrastructureWorks.id, id)).returning();
    return updated;
  }

  async listAgencies(): Promise<Agency[]> {
    return await db.select().from(agencies);
  }

  async createAgency(agency: InsertAgency): Promise<Agency> {
    const [created] = await db.insert(agencies).values(agency).returning();
    return created;
  }

  async getVdp(villageId: string): Promise<Vdp | undefined> {
    const [vdp] = await db.select().from(vdps).where(eq(vdps.villageId, villageId));
    return vdp;
  }

  async getVdpById(id: string): Promise<Vdp | undefined> {
    const [vdp] = await db.select().from(vdps).where(eq(vdps.id, id));
    return vdp;
  }

  async createVdp(vdp: InsertVdp): Promise<Vdp> {
    const [created] = await db.insert(vdps).values(vdp).returning();
    return created;
  }

  async updateVdp(id: string, vdp: Partial<InsertVdp>): Promise<Vdp | undefined> {
    const [updated] = await db.update(vdps).set({ ...vdp, updatedAt: new Date() }).where(eq(vdps.id, id)).returning();
    return updated;
  }

  async listVillageScores(villageId: string): Promise<VillageScore[]> {
    return await db.select().from(villageScores).where(eq(villageScores.villageId, villageId));
  }

  async upsertVillageScore(score: InsertVillageScore): Promise<VillageScore> {
    const existing = await db.select().from(villageScores)
      .where(and(eq(villageScores.villageId, score.villageId), eq(villageScores.domain, score.domain)));
    
    if (existing.length > 0) {
      const [updated] = await db.update(villageScores)
        .set({ score: score.score, maxScore: score.maxScore, computedAt: new Date() })
        .where(eq(villageScores.id, existing[0].id))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(villageScores).values(score).returning();
    return created;
  }

  async getAdarshGramDeclaration(villageId: string): Promise<AdarshGramDeclaration | undefined> {
    const [declaration] = await db.select().from(adarshGramDeclarations).where(eq(adarshGramDeclarations.villageId, villageId));
    return declaration;
  }

  async createAdarshGramDeclaration(declaration: InsertAdarshGramDeclaration): Promise<AdarshGramDeclaration> {
    const [created] = await db.insert(adarshGramDeclarations).values(declaration).returning();
    return created;
  }

  async updateAdarshGramDeclaration(id: string, declaration: Partial<InsertAdarshGramDeclaration>): Promise<AdarshGramDeclaration | undefined> {
    const [updated] = await db.update(adarshGramDeclarations).set(declaration).where(eq(adarshGramDeclarations.id, id)).returning();
    return updated;
  }

  async listMonthlyReports(filters?: { district?: string; month?: string; year?: number }): Promise<MonthlyReport[]> {
    const conditions = [];
    if (filters?.district) conditions.push(eq(monthlyReports.district, filters.district));
    if (filters?.month) conditions.push(eq(monthlyReports.month, filters.month));
    if (filters?.year) conditions.push(eq(monthlyReports.year, filters.year));
    if (conditions.length > 0) {
      return await db.select().from(monthlyReports).where(and(...conditions)).orderBy(desc(monthlyReports.createdAt));
    }
    return await db.select().from(monthlyReports).orderBy(desc(monthlyReports.createdAt));
  }

  async createMonthlyReport(report: InsertMonthlyReport): Promise<MonthlyReport> {
    const [created] = await db.insert(monthlyReports).values(report).returning();
    return created;
  }

  async listUploads(entityId?: string, entityType?: string): Promise<Upload[]> {
    const conditions = [];
    if (entityId) conditions.push(eq(uploads.entityId, entityId));
    if (entityType) conditions.push(eq(uploads.entityType, entityType));
    if (conditions.length > 0) {
      return await db.select().from(uploads).where(and(...conditions)).orderBy(desc(uploads.createdAt));
    }
    return await db.select().from(uploads).orderBy(desc(uploads.createdAt));
  }

  async getUpload(id: string): Promise<Upload | undefined> {
    const [upload] = await db.select().from(uploads).where(eq(uploads.id, id));
    return upload;
  }

  async createUpload(upload: InsertUpload): Promise<Upload> {
    const [created] = await db.insert(uploads).values(upload).returning();
    return created;
  }

  async deleteUpload(id: string): Promise<void> {
    await db.delete(uploads).where(eq(uploads.id, id));
  }

  async getDashboardStats(filters?: { state?: string; district?: string }): Promise<DashboardStats> {
    const villageConditions = [];
    if (filters?.state) villageConditions.push(eq(villages.state, filters.state));
    if (filters?.district) villageConditions.push(eq(villages.district, filters.district));

    const villagesList = villageConditions.length > 0
      ? await db.select().from(villages).where(and(...villageConditions))
      : await db.select().from(villages);

    const villageIds = villagesList.map(v => v.id);
    
    let householdsSurveyed = 0;
    let infraWorksInProgress = 0;
    let infraWorksCompleted = 0;
    let fundsReleased = 0;
    let fundsUtilized = 0;
    let beneficiariesIdentified = 0;
    let beneficiariesSaturated = 0;

    if (villageIds.length > 0) {
      for (const vid of villageIds) {
        const hh = await db.select().from(households).where(eq(households.villageId, vid));
        householdsSurveyed += hh.filter(h => h.surveyStatus === 'completed').length;

        const works = await db.select().from(infrastructureWorks).where(eq(infrastructureWorks.villageId, vid));
        infraWorksInProgress += works.filter(w => w.status === 'in_progress').length;
        infraWorksCompleted += works.filter(w => w.status === 'completed').length;
        fundsReleased += works.reduce((sum, w) => sum + (w.totalFunds || 0), 0);
        fundsUtilized += works.filter(w => w.status === 'completed').reduce((sum, w) => sum + (w.totalFunds || 0), 0);

        const benefits = await db.select().from(beneficiaryInitiatives).where(eq(beneficiaryInitiatives.villageId, vid));
        beneficiariesIdentified += benefits.length;
        beneficiariesSaturated += benefits.filter(b => b.status === 'completed' || b.status === 'saturated').length;
      }
    }

    const declarations = await db.select().from(adarshGramDeclarations);
    const adarshGramsRecommended = declarations.filter(d => d.status === 'recommended' || d.status === 'declared').length;
    const adarshGramsDeclared = declarations.filter(d => d.status === 'declared').length;

    return {
      villagesCovered: villagesList.length,
      householdsSurveyed,
      infraWorksInProgress,
      infraWorksCompleted,
      fundsReleased,
      fundsUtilized,
      adarshGramsRecommended,
      adarshGramsDeclared,
      beneficiariesIdentified,
      beneficiariesSaturated,
    };
  }
}

export const storage = new PostgresStorage();
