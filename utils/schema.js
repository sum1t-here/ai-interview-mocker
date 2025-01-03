import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const MockInterviewSchema = pgTable("mock_interview", {
  id: serial("id").primaryKey(),
  jsonMockResponse: text("jsonMockResponse").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDescription: text("jobDescription").notNull(),
  jobExperience: text("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  mockId: varchar("mockId").notNull(),
});
