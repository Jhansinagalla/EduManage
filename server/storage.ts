import { db } from "./db";
import {
  users, teachers, classes, students, attendance, results,
  type User, type InsertUser,
  type Teacher, type InsertTeacher,
  type Class, type InsertClass,
  type Student, type InsertStudent,
  type Attendance, type InsertAttendance,
  type Result, type InsertResult
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Students
  getStudents(): Promise<Student[]>;
  createStudent(student: InsertStudent): Promise<Student>;
  
  // Basic placeholder methods for MVP backend structure
  // In a real app, we'd implement full CRUD for all tables
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async getStudents(): Promise<Student[]> {
    return await db.select().from(students);
  }

  async createStudent(student: InsertStudent): Promise<Student> {
    const [newStudent] = await db.insert(students).values(student).returning();
    return newStudent;
  }
}

export const storage = new DatabaseStorage();
