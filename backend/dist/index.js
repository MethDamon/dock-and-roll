import dotenv from "dotenv";
dotenv.config();
import express, {} from "express";
import cors from "cors";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema.js";
import { eq } from "drizzle-orm/sqlite-core/expressions";
import { ClerkExpressRequireAuth, ClerkExpressWithAuth, } from "@clerk/clerk-sdk-node";
const dbClient = createClient({
    url: process.env.DATABASE_URL || "file:local.db",
});
const db = drizzle(dbClient, { schema });
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors());
// CREATE
app.post("/boats", ClerkExpressWithAuth(), async (req, res) => {
    if (req.body) {
        const newBoat = req.body; // Assume the new item is sent in the request body
        const result = await db.insert(schema.boats).values(newBoat).returning();
        res.status(201).json(result);
    }
    else {
        res.status(400).json({ message: "Missing request body" });
    }
});
// READ (Get all boats)
app.get("/boats", ClerkExpressRequireAuth(), async (req, res) => {
    const boats = await db.select().from(schema.boats);
    res.json(boats);
});
// READ (Get a single item by ID)
app.get("/boats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ message: "No id provided" });
        return;
    }
    else {
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
});
// UPDATE
app.put("/boats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    const newBoat = req.body;
    if (!req.params.id) {
        res.status(400).json({ message: "No id provided" });
        return;
    }
    else {
        const id = parseInt(req.params.id);
        const result = await db.query.boats.findFirst({
            where: eq(schema.boats.id, id),
        });
        if (!result) {
            res.status(404).json({ message: "Boat not found" });
            return;
        }
        else {
            const dbResult = await db
                .update(schema.boats)
                .set(newBoat)
                .where(eq(schema.boats.id, id))
                .returning();
            res.json(dbResult);
        }
    }
});
// DELETE
app.delete("/boats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ message: "No id provided" });
        return;
    }
    else {
        const id = parseInt(req.params.id);
        const result = await db.query.boats.findFirst({
            where: eq(schema.boats.id, id),
        });
        if (!result) {
            res.status(404).json({ message: "Boat not found" });
            return;
        }
        else {
            await db
                .delete(schema.boats)
                .where(eq(schema.boats.id, id))
                .returning();
            res.status(204);
        }
    }
});
const errorHandler = (err, _, res, next) => {
    console.error(err.stack);
    res.status(401).send({ message: "Unauthenticated" });
    next();
};
app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
