import { z } from 'zod';
import { 
  insertUserSchema, 
  insertTeacherSchema, 
  insertClassSchema, 
  insertStudentSchema, 
  insertAttendanceSchema, 
  insertResultSchema,
  users,
  teachers,
  classes,
  students,
  attendance,
  results
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  // Although the frontend will use a mock provider initially, 
  // we define the API contract for future implementation.
  users: {
    list: {
      method: 'GET' as const,
      path: '/api/users',
      responses: {
        200: z.array(z.custom<typeof users.$inferSelect>()),
      },
    },
    // ... add other user routes as needed
  },
  students: {
    list: {
      method: 'GET' as const,
      path: '/api/students',
      responses: {
        200: z.array(z.custom<typeof students.$inferSelect>()),
      },
    },
    create: {
        method: 'POST' as const,
        path: '/api/students',
        input: insertStudentSchema,
        responses: {
          201: z.custom<typeof students.$inferSelect>(),
          400: errorSchemas.validation,
        }
    }
  },
  // We can expand this for all resources, but for now we focus on the structure
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
