import { integer, text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const boats = sqliteTable("boats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  imageUrl: text(),
  name: text().notNull(),
  description: text().notNull(),
  userId: text("user_id").notNull(),
});
