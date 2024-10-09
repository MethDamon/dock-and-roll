import dotenv from "dotenv";

dotenv.config();

import express, { type Request, type Response } from "express";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import type {
  BoatGetDetailRequest,
  BoatGetDetailResponse,
  BoatCreateRequest,
  BoatCreateResponse,
  BoatUpdateRequest,
  BoatUpdateResponse,
  BoatDeleteRequest,
  BoatDeleteResponse,
} from "./interfaces.js";
import type { Boat } from "./types.js";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema.js";
import { eq } from "drizzle-orm/sqlite-core/expressions";

const dbClient = createClient({
  url: process.env.DATABASE_URL || "file:local.db",
});
const db = drizzle(dbClient, { schema });
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(clerkMiddleware());

// CREATE
app.post(
  "/boats",
  requireAuth(),
  async (req: BoatCreateRequest, res: BoatCreateResponse) => {
    if (req.body) {
      const newBoat = req.body as Boat; // Assume the new item is sent in the request body
      const result = await db.insert(schema.boats).values(newBoat).returning();
      res.status(201).json(result);
    } else {
      res.status(400).json({ message: "Missing request body" });
    }
  }
);

// READ (Get all boats)
app.get("/boats", async (req: Request, res: Response) => {
  const boats = await db.select().from(schema.boats);
  res.json(boats);
});

// READ (Get a single item by ID)
app.get(
  "/boats/:id",
  async (req: BoatGetDetailRequest, res: BoatGetDetailResponse) => {
    const id = parseInt(req.params.id);
    const item = await db.query.boats.findFirst({
      where: eq(schema.boats.id, id),
    });
    if (!item) {
      res.status(404).json({ message: "Boat not found" });
      return;
    }
    res.json(item);
  }
);

// UPDATE
app.put(
  "/boats/:id",
  async (req: BoatUpdateRequest, res: BoatUpdateResponse) => {
    const newBoat = req.body as Boat;
    const id = parseInt(req.params.id);
    const result = await db.query.boats.findFirst({
      where: eq(schema.boats.id, id),
    });
    if (!result) {
      res.status(404).json({ message: "Boat not found" });
      return;
    } else {
      const dbResult = await db
        .update(schema.boats)
        .set(newBoat)
        .where(eq(schema.boats.id, id))
        .returning();
      res.json(dbResult);
    }
  }
);

// DELETE
app.delete(
  "/boats/:id",
  async (req: BoatDeleteRequest, res: BoatDeleteResponse) => {
    const id = parseInt(req.params.id);
    const result = await db.query.boats.findFirst({
      where: eq(schema.boats.id, id),
    });
    if (!result) {
      res.status(404).json({ message: "Boat not found" });
      return;
    } else {
      await db.delete(schema.boats).where(eq(schema.boats.id, id)).returning();
      res.status(204);
    }
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
