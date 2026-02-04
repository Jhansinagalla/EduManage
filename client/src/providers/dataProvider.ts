import { DataProvider } from "@refinedev/core";

// --- MOCK DATA ---
const USERS = [
  { id: 1, fullName: "Principal Anderson", email: "admin@school.com", role: "admin" },
  { id: 2, fullName: "Ms. Jennifer Honey", email: "teacher@school.com", role: "teacher", specialization: "Mathematics" },
  { id: 3, fullName: "Matilda Wormwood", email: "student@school.com", role: "student", classId: 1, rollNumber: "5A-001" },
  { id: 4, fullName: "Harry Potter", email: "harry@school.com", role: "student", classId: 1, rollNumber: "5A-002" },
  { id: 5, fullName: "Hermione Granger", email: "hermione@school.com", role: "student", classId: 1, rollNumber: "5A-003" },
  { id: 6, fullName: "Ron Weasley", email: "ron@school.com", role: "student", classId: 1, rollNumber: "5A-004" },
];

const CLASSES = [
  { id: 1, name: "Grade 5A", teacherId: 2, room: "101", schedule: "Mon-Fri 08:00 - 14:00" },
  { id: 2, name: "Grade 6B", teacherId: 2, room: "102", schedule: "Mon-Fri 08:00 - 14:00" },
  { id: 3, name: "Science Club", teacherId: 2, room: "Lab A", schedule: "Wed 15:00 - 16:30" },
];

const ATTENDANCE = [
  { id: 1, studentId: 3, classId: 1, date: "2023-10-25", status: "present" },
  { id: 2, studentId: 4, classId: 1, date: "2023-10-25", status: "absent" },
  { id: 3, studentId: 5, classId: 1, date: "2023-10-25", status: "present" },
];

const RESULTS = [
  { id: 1, studentId: 3, subject: "Mathematics", score: 98, totalMarks: 100, grade: "A+" },
  { id: 2, studentId: 3, subject: "Science", score: 95, totalMarks: 100, grade: "A" },
  { id: 3, studentId: 4, subject: "Mathematics", score: 72, totalMarks: 100, grade: "B" },
];

// In-memory "database"
const DB: any = {
  users: [...USERS],
  students: USERS.filter(u => u.role === "student"),
  teachers: USERS.filter(u => u.role === "teacher"),
  classes: [...CLASSES],
  attendance: [...ATTENDANCE],
  results: [...RESULTS],
};

const SIMULATED_DELAY = 500;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, sorters, filters }) => {
    await sleep(SIMULATED_DELAY);
    
    let data = DB[resource] || [];

    // Simple client-side filtering logic could go here if needed
    // For MVP we just return full lists mostly

    if (pagination) {
      const { current = 1, pageSize = 10 } = pagination;
      const start = (current - 1) * pageSize;
      const end = start + pageSize;
      // Note: for this mock, we aren't slicing to simplify, 
      // but in real app you would slice.
    }

    return {
      data,
      total: data.length,
    };
  },

  getOne: async ({ resource, id }) => {
    await sleep(SIMULATED_DELAY);
    const data = DB[resource]?.find((item: any) => item.id == id);
    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    await sleep(SIMULATED_DELAY);
    const newItem = {
      id: Math.floor(Math.random() * 10000),
      ...variables as any,
    };
    
    if (!DB[resource]) DB[resource] = [];
    DB[resource].push(newItem);

    // If creating a student or teacher, also add to users table logic
    if (resource === 'students' || resource === 'teachers') {
       // logic to sync would go here
    }

    return {
      data: newItem,
    };
  },

  update: async ({ resource, id, variables }) => {
    await sleep(SIMULATED_DELAY);
    const index = DB[resource]?.findIndex((item: any) => item.id == id);
    if (index > -1) {
      DB[resource][index] = { ...DB[resource][index], ...variables as any };
      return {
        data: DB[resource][index],
      };
    }
    throw new Error("Item not found");
  },

  deleteOne: async ({ resource, id }) => {
    await sleep(SIMULATED_DELAY);
    const index = DB[resource]?.findIndex((item: any) => item.id == id);
    if (index > -1) {
      const [deleted] = DB[resource].splice(index, 1);
      return {
        data: deleted,
      };
    }
    throw new Error("Item not found");
  },

  getApiUrl: () => "https://api.fake-school.com",
};
