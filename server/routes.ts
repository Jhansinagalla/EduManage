import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // For the MVP, the frontend is using a mock data provider.
  // We set up the basic route structure here for future backend integration.
  
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Example API endpoint mirroring the mock provider
  app.get("/api/students", async (req, res) => {
    const students = await storage.getStudents();
    res.json(students);
  });

  return httpServer;
}
