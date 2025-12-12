// Simple in-memory storage for demo purposes
// This replaces the database functionality with temporary storage

export interface User {
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
}

export interface Village {
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
}

export interface Vdp {
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
}

export interface DashboardStats {
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
}

// In-memory storage
const users: User[] = [
  {
    id: "1",
    username: "admin",
    password: "$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQ",
    name: "Admin User",
    designation: "Administrator",
    role: "admin",
    state: "Delhi",
    district: "West Delhi"
  }
];

const villages: Village[] = [
  {
    id: "1",
    state: "Delhi",
    district: "West Delhi",
    block: "Delhi West",
    gramPanchayat: "Delhi West",
    villageName: "Buland Pur",
    villageCode: "4186",
    selectionYear: "2018-2019",
    verificationStatus: "verified",
    totalPopulation: 5000,
    scPopulation: 1500,
    scPercentage: 30,
    totalHouseholds: 1000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2", 
    state: "Delhi",
    district: "West Delhi",
    block: "Delhi West",
    gramPanchayat: "Blandpur",
    villageName: "Rewla Khanm Pur",
    villageCode: "64014",
    selectionYear: "2022-2023",
    verificationStatus: "pending",
    totalPopulation: 3000,
    scPopulation: 900,
    scPercentage: 30,
    totalHouseholds: 600,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const vdps: Vdp[] = [];

export const storage = {
  // User operations
  async getUserByUsername(username: string): Promise<User | undefined> {
    return users.find(u => u.username === username);
  },
  
  async createUser(userData: Omit<User, 'id' | 'lastLogin'>): Promise<User> {
    const user: User = {
      ...userData,
      id: Date.now().toString(),
    };
    users.push(user);
    return user;
  },
  
  async getUser(id: string): Promise<User | undefined> {
    return users.find(u => u.id === id);
  },
  
  async updateUserLastLogin(id: string): Promise<void> {
    const user = users.find(u => u.id === id);
    if (user) {
      user.lastLogin = new Date();
    }
  },

  // Village operations
  async listVillages(filters?: { state?: string; district?: string }): Promise<Village[]> {
    if (!filters) return villages;
    
    return villages.filter(v => {
      if (filters.state && v.state !== filters.state) return false;
      if (filters.district && v.district !== filters.district) return false;
      return true;
    });
  },
  
  async getVillage(id: string): Promise<Village | undefined> {
    return villages.find(v => v.id === id);
  },
  
  async getVillageByCode(code: string): Promise<Village | undefined> {
    return villages.find(v => v.villageCode === code);
  },
  
  async createVillage(villageData: Omit<Village, 'id' | 'createdAt' | 'updatedAt'>): Promise<Village> {
    const village: Village = {
      ...villageData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    villages.push(village);
    return village;
  },
  
  async updateVillage(id: string, updates: Partial<Village>): Promise<Village | undefined> {
    const village = villages.find(v => v.id === id);
    if (village) {
      Object.assign(village, updates, { updatedAt: new Date() });
      return village;
    }
    return undefined;
  },

  // VDP operations
  async getVdp(villageId: string): Promise<Vdp | undefined> {
    return vdps.find(v => v.villageId === villageId);
  },
  
  async getVdpById(id: string): Promise<Vdp | undefined> {
    return vdps.find(v => v.id === id);
  },
  
  async createVdp(vdpData: Omit<Vdp, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vdp> {
    const vdp: Vdp = {
      ...vdpData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vdps.push(vdp);
    return vdp;
  },
  
  async updateVdp(id: string, updates: Partial<Vdp>): Promise<Vdp | undefined> {
    const vdp = vdps.find(v => v.id === id);
    if (vdp) {
      Object.assign(vdp, updates, { updatedAt: new Date() });
      return vdp;
    }
    return undefined;
  },

  // Placeholder methods for other operations
  async listCommitteeMembers(villageId: string): Promise<any[]> { return []; },
  async createCommitteeMember(data: any): Promise<any> { return { id: Date.now().toString(), ...data }; },
  async listInfrastructureIndicators(villageId: string): Promise<any[]> { return []; },
  async createInfrastructureIndicator(data: any): Promise<any> { return { id: Date.now().toString(), ...data }; },
  async listHouseholds(villageId: string): Promise<any[]> { return []; },
  async createHousehold(data: any): Promise<any> { return { id: Date.now().toString(), ...data }; },
  async getHousehold(id: string): Promise<any> { return undefined; },
  async listHouseholdSurveys(villageId: string): Promise<any[]> { return []; },
  async createHouseholdSurvey(data: any): Promise<any> { return { id: Date.now().toString(), ...data }; },
  async listBeneficiaryInitiatives(villageId: string): Promise<any[]> { return []; },
  async createBeneficiaryInitiative(data: any): Promise<any> { return { id: Date.now().toString(), ...data }; },
  async listInfrastructureWorks(villageId: string): Promise<any[]> { return []; },
  async createInfrastructureWork(data: any): Promise<any> { return { id: Date.now().toString(), ...data }; },
  async getInfrastructureWork(id: string): Promise<any> { return undefined; },
  async updateInfrastructureWork(id: string, updates: any): Promise<any> { return undefined; },
  async listAgencies(): Promise<any[]> { return []; },
  async createAgency(data: any): Promise<any> { return { id: Date.now().toString(), ...data }; },
  async listVillageScores(villageId: string): Promise<any[]> { return []; },
  async upsertVillageScore(data: any): Promise<any> { return { id: Date.now().toString(), ...data }; },
  async getAdarshGramDeclaration(villageId: string): Promise<any> { return undefined; },
  async createAdarshGramDeclaration(data: any): Promise<any> { return { id: Date.now().toString(), ...data }; },
  async listMonthlyReports(filters?: any): Promise<any[]> { return []; },
  async createMonthlyReport(data: any): Promise<any> { return { id: Date.now().toString(), ...data }; },
  async getDashboardStats(filters?: any): Promise<DashboardStats> {
    return {
      villagesCovered: villages.length,
      householdsSurveyed: 0,
      infraWorksInProgress: 0,
      infraWorksCompleted: 0,
      fundsReleased: 0,
      fundsUtilized: 0,
      adarshGramsRecommended: 0,
      adarshGramsDeclared: 0,
      beneficiariesIdentified: 0,
      beneficiariesSaturated: 0,
    };
  },
  async createUpload(data: any): Promise<any> { return { id: Date.now().toString(), ...data }; },
  async listUploads(filters?: any): Promise<any[]> { return []; },
  async getUpload(id: string): Promise<any> { return undefined; },
};
