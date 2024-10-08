import express, { type Request, type Response } from "express";
import type {
  Boat,
  BoatPostRequest,
  BoatPostResponse,
  BoatGetDetailRequest,
  BoatGetDetailResponse,
  BoatUpdateRequest,
  BoatUpdateResponse,
  BoatDeleteRequest,
} from "./types.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

let id = 0;
const boats: Boat[] = [];

// CREATE
app.post("/boats", (req: BoatPostRequest, res: BoatPostResponse) => {
  if (req.body) {
    const newBoat = { ...(req.body as Boat), id: id }; // Assume the new item is sent in the request body
    boats.push(newBoat);
    res.status(201).json(newBoat);
    id++;
  } else {
    res.status(400).json({ message: "Missing request body" });
  }
});

// READ (Get all boats)
app.get("/boats", (req: Request, res: Response) => {
  res.json(boats);
});

// READ (Get a single item by ID)
app.get(
  "/boats/:id",
  (req: BoatGetDetailRequest, res: BoatGetDetailResponse) => {
    const item = boats.find((i) => i.id === parseInt(req.params.id));
    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.json(item);
  }
);

// UPDATE
app.put("/boats/:id", (req: BoatUpdateRequest, res: BoatUpdateResponse) => {
  const itemIndex = boats.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    res.status(404).json({ message: "Item not found" });
    return;
  }
  boats[itemIndex] = { ...boats[itemIndex], ...req.body }; // Update the item
  res.json(boats[itemIndex]);
});

// DELETE
app.delete("/boats/:id", (req: BoatDeleteRequest, res: Response) => {
  const itemIndex = boats.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    res.status(404).json({ message: "Item not found" });
    return;
  }
  boats.splice(itemIndex, 1); // Remove the item from the array
  res.status(204);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
