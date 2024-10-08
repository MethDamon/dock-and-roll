import { relations } from "drizzle-orm/relations";
import { integer, text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
});

export const usersRelations = relations(users, ({ many }) => ({
  boats: many(boats),
}));

export const boats = sqliteTable("boats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  imageUrl: text(),
  name: text().notNull(),
  description: text().notNull(),
  userId: integer("user_id").references(() => users.id),
});

export const boatsRelations = relations(boats, ({ one }) => ({
  user: one(users, { fields: [boats.userId], references: [users.id] }),
}));
