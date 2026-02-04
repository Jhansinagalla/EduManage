import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Users table (handling authentication and basic profile)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  role: text("role", { enum: ["admin", "teacher", "student"] }).notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Teachers table (extends user)
export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  specialization: text("specialization").notNull(),
  phone: text("phone"),
});

// Classes table
export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., "Math 101", "Grade 5A"
  teacherId: integer("teacher_id").references(() => teachers.id),
  schedule: text("schedule"), // Simple text description for MVP
  room: text("room"),
});

// Students table (extends user)
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  classId: integer("class_id").references(() => classes.id),
  rollNumber: text("roll_number"),
  parentName: text("parent_name"),
  parentPhone: text("parent_phone"),
});

// Attendance table
export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => students.id),
  classId: integer("class_id").notNull().references(() => classes.id),
  date: date("date").notNull(),
  status: text("status", { enum: ["present", "absent", "late"] }).notNull(),
});

// Results/Grades table
export const results = pgTable("results", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => students.id),
  subject: text("subject").notNull(),
  score: integer("score").notNull(),
  totalMarks: integer("total_marks").notNull(),
  grade: text("grade"), // A, B, C...
  examDate: date("exam_date"),
});

// === SCHEMA & TYPES ===

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertTeacherSchema = createInsertSchema(teachers).omit({ id: true });
export const insertClassSchema = createInsertSchema(classes).omit({ id: true });
export const insertStudentSchema = createInsertSchema(students).omit({ id: true });
export const insertAttendanceSchema = createInsertSchema(attendance).omit({ id: true });
export const insertResultSchema = createInsertSchema(results).omit({ id: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Teacher = typeof teachers.$inferSelect;
export type InsertTeacher = z.infer<typeof insertTeacherSchema>;

export type Class = typeof classes.$inferSelect;
export type InsertClass = z.infer<typeof insertClassSchema>;

export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;

export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;

export type Result = typeof results.$inferSelect;
export type InsertResult = z.infer<typeof insertResultSchema>;
