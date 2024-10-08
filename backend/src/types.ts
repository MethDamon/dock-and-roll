import type { boats } from "./schema.js";

export type Boat = typeof boats.$inferInsert;

export type Error = {
  message: string;
};
