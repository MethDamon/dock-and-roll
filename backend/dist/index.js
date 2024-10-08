"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const client_1 = require("@libsql/client");
const libsql_1 = require("drizzle-orm/libsql");
const schema = __importStar(require("./schema.js"));
const expressions_1 = require("drizzle-orm/sqlite-core/expressions");
const dbClient = (0, client_1.createClient)({
    url: process.env.DATABASE_URL || "file:local.db",
});
const db = (0, libsql_1.drizzle)(dbClient, { schema });
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON request bodies
// CREATE
app.post("/boats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body) {
        const newBoat = req.body; // Assume the new item is sent in the request body
        const result = yield db.insert(schema.boats).values(newBoat).returning();
        res.status(201).json(result);
    }
    else {
        res.status(400).json({ message: "Missing request body" });
    }
}));
// READ (Get all boats)
app.get("/boats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const boats = yield db.select().from(schema.boats);
    res.json(boats);
}));
// READ (Get a single item by ID)
app.get("/boats/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const item = yield db.query.boats.findFirst({
        where: (0, expressions_1.eq)(schema.boats.id, id),
    });
    if (!item) {
        res.status(404).json({ message: "Boat not found" });
        return;
    }
    res.json(item);
}));
// UPDATE
app.put("/boats/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBoat = req.body;
    const id = parseInt(req.params.id);
    const result = yield db.query.boats.findFirst({
        where: (0, expressions_1.eq)(schema.boats.id, id),
    });
    if (!result) {
        res.status(404).json({ message: "Boat not found" });
        return;
    }
    else {
        const dbResult = yield db
            .update(schema.boats)
            .set(newBoat)
            .where((0, expressions_1.eq)(schema.boats.id, id))
            .returning();
        res.json(dbResult);
    }
}));
// DELETE
app.delete("/boats/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const result = yield db.query.boats.findFirst({
        where: (0, expressions_1.eq)(schema.boats.id, id),
    });
    if (!result) {
        res.status(404).json({ message: "Boat not found" });
        return;
    }
    else {
        yield db.delete(schema.boats).where((0, expressions_1.eq)(schema.boats.id, id)).returning();
        res.status(204);
    }
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
