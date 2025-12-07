import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  authMiddleware, 
  requireRole, 
  hashPassword, 
  verifyPassword, 
  generateToken,
  type AuthenticatedRequest 
} from "./auth";
import { 
  insertUserSchema, 
  insertVillageSchema,
  insertCommitteeMemberSchema,
  insertInfrastructureIndicatorSchema,
  insertHouseholdSchema,
  insertHouseholdSurveySchema,
  insertBeneficiaryInitiativeSchema,
  insertInfrastructureWorkSchema,
  insertAgencySchema,
  insertVdpSchema,
  insertVillageScoreSchema,
  insertAdarshGramDeclarationSchema,
  insertMonthlyReportSchema,
} from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/auth/register", async (req, res) => {
    try {
      const body = insertUserSchema.parse(req.body);
      const existing = await storage.getUserByUsername(body.username);
      if (existing) {
        return res.status(400).json({ error: "Username already exists" });
      }
      const hashedPassword = await hashPassword(body.password);
      const user = await storage.createUser({ ...body, password: hashedPassword });
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const valid = await verifyPassword(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      await storage.updateUserLastLogin(user.id);
      const token = generateToken(user);
      const { password: _, ...userWithoutPassword } = user;
      res.json({ token, user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/auth/me", authMiddleware, (req: AuthenticatedRequest, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  });

  app.get("/api/villages", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const { state, district, block } = req.query;
      const villages = await storage.listVillages({
        state: state as string,
        district: district as string,
        block: block as string,
      });
      res.json(villages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch villages" });
    }
  });

  app.get("/api/villages/:id", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const village = await storage.getVillage(req.params.id);
      if (!village) {
        return res.status(404).json({ error: "Village not found" });
      }
      res.json(village);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch village" });
    }
  });

  app.post("/api/villages", authMiddleware, requireRole("admin", "district"), async (req: AuthenticatedRequest, res) => {
    try {
      const body = insertVillageSchema.parse(req.body);
      const existing = await storage.getVillageByCode(body.villageCode);
      if (existing) {
        return res.status(400).json({ error: "Village code already exists" });
      }
      const village = await storage.createVillage(body);
      res.status(201).json(village);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create village" });
    }
  });

  app.put("/api/villages/:id", authMiddleware, requireRole("admin", "district", "block"), async (req: AuthenticatedRequest, res) => {
    try {
      const updated = await storage.updateVillage(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Village not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update village" });
    }
  });

  app.get("/api/villages/:id/committee-members", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const members = await storage.listCommitteeMembers(req.params.id);
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch committee members" });
    }
  });

  app.post("/api/villages/:id/committee-members", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const body = insertCommitteeMemberSchema.parse({ ...req.body, villageId: req.params.id });
      const member = await storage.createCommitteeMember(body);
      res.status(201).json(member);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create committee member" });
    }
  });

  app.get("/api/villages/:id/infrastructure-indicators", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const indicators = await storage.listInfrastructureIndicators(req.params.id);
      res.json(indicators);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch infrastructure indicators" });
    }
  });

  app.post("/api/villages/:id/infrastructure-indicators", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const body = insertInfrastructureIndicatorSchema.parse({ ...req.body, villageId: req.params.id });
      const indicator = await storage.createInfrastructureIndicator(body);
      res.status(201).json(indicator);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create infrastructure indicator" });
    }
  });

  app.get("/api/villages/:id/households", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const households = await storage.listHouseholds(req.params.id);
      res.json(households);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch households" });
    }
  });

  app.post("/api/villages/:id/households", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const body = insertHouseholdSchema.parse({ ...req.body, villageId: req.params.id });
      const household = await storage.createHousehold(body);
      res.status(201).json(household);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create household" });
    }
  });

  app.get("/api/households/:id", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const household = await storage.getHousehold(req.params.id);
      if (!household) {
        return res.status(404).json({ error: "Household not found" });
      }
      res.json(household);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch household" });
    }
  });

  app.get("/api/households/:id/surveys", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const surveys = await storage.listHouseholdSurveys(req.params.id);
      res.json(surveys);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch surveys" });
    }
  });

  app.post("/api/households/:id/surveys", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const body = insertHouseholdSurveySchema.parse({ ...req.body, householdId: req.params.id });
      const survey = await storage.createHouseholdSurvey(body);
      res.status(201).json(survey);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create survey" });
    }
  });

  app.get("/api/villages/:id/beneficiaries", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const beneficiaries = await storage.listBeneficiaryInitiatives(req.params.id);
      res.json(beneficiaries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch beneficiaries" });
    }
  });

  app.post("/api/villages/:id/beneficiaries", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const body = insertBeneficiaryInitiativeSchema.parse({ ...req.body, villageId: req.params.id });
      const beneficiary = await storage.createBeneficiaryInitiative(body);
      res.status(201).json(beneficiary);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create beneficiary" });
    }
  });

  app.get("/api/villages/:id/works", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const works = await storage.listInfrastructureWorks(req.params.id);
      res.json(works);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch works" });
    }
  });

  app.post("/api/villages/:id/works", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const body = insertInfrastructureWorkSchema.parse({ ...req.body, villageId: req.params.id });
      const work = await storage.createInfrastructureWork(body);
      res.status(201).json(work);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create work" });
    }
  });

  app.get("/api/works/:id", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const work = await storage.getInfrastructureWork(req.params.id);
      if (!work) {
        return res.status(404).json({ error: "Work not found" });
      }
      res.json(work);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch work" });
    }
  });

  app.put("/api/works/:id", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const updated = await storage.updateInfrastructureWork(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Work not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update work" });
    }
  });

  app.get("/api/agencies", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const agencies = await storage.listAgencies();
      res.json(agencies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch agencies" });
    }
  });

  app.post("/api/agencies", authMiddleware, requireRole("admin", "district"), async (req: AuthenticatedRequest, res) => {
    try {
      const body = insertAgencySchema.parse(req.body);
      const agency = await storage.createAgency(body);
      res.status(201).json(agency);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create agency" });
    }
  });

  app.get("/api/villages/:id/vdp", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const vdp = await storage.getVdp(req.params.id);
      if (!vdp) {
        return res.status(404).json({ error: "VDP not found" });
      }
      res.json(vdp);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch VDP" });
    }
  });

  app.post("/api/villages/:id/vdp", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const existing = await storage.getVdp(req.params.id);
      if (existing) {
        return res.status(400).json({ error: "VDP already exists for this village" });
      }
      const body = insertVdpSchema.parse({ ...req.body, villageId: req.params.id });
      const vdp = await storage.createVdp(body);
      res.status(201).json(vdp);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create VDP" });
    }
  });

  app.put("/api/vdp/:id", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const existing = await storage.getVdpById(req.params.id);
      if (!existing) {
        return res.status(404).json({ error: "VDP not found" });
      }
      if (existing.status === "finalized" || existing.status === "approved") {
        return res.status(400).json({ error: "Cannot modify finalized VDP" });
      }
      const updated = await storage.updateVdp(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update VDP" });
    }
  });

  app.post("/api/vdp/:id/finalize", authMiddleware, requireRole("admin", "district", "block"), async (req: AuthenticatedRequest, res) => {
    try {
      const existing = await storage.getVdpById(req.params.id);
      if (!existing) {
        return res.status(404).json({ error: "VDP not found" });
      }
      if (existing.status === "finalized" || existing.status === "approved") {
        return res.status(400).json({ error: "VDP already finalized" });
      }
      const updated = await storage.updateVdp(req.params.id, { 
        status: "finalized", 
        submittedAt: new Date() 
      });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to finalize VDP" });
    }
  });

  app.get("/api/villages/:id/scores", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const scores = await storage.listVillageScores(req.params.id);
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scores" });
    }
  });

  app.post("/api/villages/:id/scores", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const body = insertVillageScoreSchema.parse({ ...req.body, villageId: req.params.id });
      const score = await storage.upsertVillageScore(body);
      res.status(201).json(score);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to save score" });
    }
  });

  app.get("/api/villages/:id/adarsh-declaration", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const declaration = await storage.getAdarshGramDeclaration(req.params.id);
      if (!declaration) {
        return res.status(404).json({ error: "Declaration not found" });
      }
      res.json(declaration);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch declaration" });
    }
  });

  app.post("/api/villages/:id/adarsh-declaration", authMiddleware, requireRole("admin", "state", "district"), async (req: AuthenticatedRequest, res) => {
    try {
      const existing = await storage.getAdarshGramDeclaration(req.params.id);
      if (existing) {
        return res.status(400).json({ error: "Declaration already exists" });
      }
      const body = insertAdarshGramDeclarationSchema.parse({ ...req.body, villageId: req.params.id });
      const declaration = await storage.createAdarshGramDeclaration(body);
      res.status(201).json(declaration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create declaration" });
    }
  });

  app.get("/api/reports/monthly", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const { district, month, year } = req.query;
      const reports = await storage.listMonthlyReports({
        district: district as string,
        month: month as string,
        year: year ? parseInt(year as string) : undefined,
      });
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reports" });
    }
  });

  app.post("/api/reports/monthly", authMiddleware, requireRole("admin", "district"), async (req: AuthenticatedRequest, res) => {
    try {
      const body = insertMonthlyReportSchema.parse(req.body);
      const report = await storage.createMonthlyReport(body);
      res.status(201).json(report);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create report" });
    }
  });

  app.get("/api/dashboard/stats", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const { state, district } = req.query;
      const stats = await storage.getDashboardStats({
        state: state as string,
        district: district as string,
      });
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  app.post("/api/uploads", authMiddleware, upload.single("file"), async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const { uploadType, entityId, entityType } = req.body;
      const uploadRecord = await storage.createUpload({
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        uploadType: uploadType || "general",
        entityId: entityId || null,
        entityType: entityType || null,
        uploadedBy: req.user?.id || null,
      });
      res.status(201).json(uploadRecord);
    } catch (error) {
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  app.post("/api/uploads/vdp-document", authMiddleware, upload.single("file"), async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const { vdpId } = req.body;
      if (!vdpId) {
        return res.status(400).json({ error: "VDP ID required" });
      }
      const uploadRecord = await storage.createUpload({
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        uploadType: "vdp-document",
        entityId: vdpId,
        entityType: "vdp",
        uploadedBy: req.user?.id || null,
      });
      res.status(201).json(uploadRecord);
    } catch (error) {
      res.status(500).json({ error: "Failed to upload VDP document" });
    }
  });

  app.post("/api/uploads/progress-photo", authMiddleware, upload.single("file"), async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const { workId } = req.body;
      if (!workId) {
        return res.status(400).json({ error: "Work ID required" });
      }
      const uploadRecord = await storage.createUpload({
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        uploadType: "progress-photo",
        entityId: workId,
        entityType: "infrastructure-work",
        uploadedBy: req.user?.id || null,
      });
      res.status(201).json(uploadRecord);
    } catch (error) {
      res.status(500).json({ error: "Failed to upload progress photo" });
    }
  });

  app.get("/api/uploads", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const { entityId, entityType } = req.query;
      const uploads = await storage.listUploads(
        entityId as string,
        entityType as string
      );
      res.json(uploads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch uploads" });
    }
  });

  app.get("/api/uploads/:id", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const uploadRecord = await storage.getUpload(req.params.id);
      if (!uploadRecord) {
        return res.status(404).json({ error: "Upload not found" });
      }
      res.json(uploadRecord);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch upload" });
    }
  });

  app.get("/uploads/:filename", (req, res) => {
    const filePath = path.join(uploadDir, req.params.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }
    res.sendFile(filePath);
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return httpServer;
}
