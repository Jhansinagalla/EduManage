import { AuthProvider } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";
export const ROLE_KEY = "refine-role";
const USERS_KEY = "refine-users";

type StoredUser = {
  email: string;
  password: string;
  role: "admin" | "teacher" | "student";
  name: string;
  avatar?: string;
  profile?: UserProfile;
};

export type UserProfile = {
  phone?: string;
  address?: string;
  bio?: string;
  department?: string;
  subject?: string;
  qualification?: string;
  experienceYears?: string;
  grade?: string;
  section?: string;
  studentId?: string;
  admissionYear?: string;
  parentName?: string;
  parentPhone?: string;
};

const SEED_USERS: StoredUser[] = [
  { email: "admin@school.com", password: "password", role: "admin", name: "Principal Anderson" },
  { email: "teacher@school.com", password: "password", role: "teacher", name: "Ms. Jennifer Honey" },
  { email: "student@school.com", password: "password", role: "student", name: "Matilda Wormwood" },
];

const getStoredUsers = (): StoredUser[] => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
    return SEED_USERS;
  }

  try {
    const parsed = JSON.parse(raw) as StoredUser[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return parsed;
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
    return SEED_USERS;
  }
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const registerUser = (input: Omit<StoredUser, "name"> & { name?: string }) => {
  const users = getStoredUsers();
  const existing = users.find((user) => user.email.toLowerCase() === input.email.toLowerCase());
  if (existing) {
    return { success: false, error: "Email already exists" };
  }

  const name = input.name?.trim() || input.email.split("@")[0] || "New User";
  const next: StoredUser = {
    email: input.email,
    password: input.password,
    role: input.role,
    name,
    avatar: input.avatar,
    profile: input.profile,
  };

  saveUsers([...users, next]);
  return { success: true };
};

export const updateUserAvatar = (email: string, avatar: string) => {
  const users = getStoredUsers();
  const updated = users.map((user) =>
    user.email.toLowerCase() === email.toLowerCase()
      ? { ...user, avatar }
      : user,
  );
  saveUsers(updated);
  return updated.find((user) => user.email.toLowerCase() === email.toLowerCase());
};

export const getUserByEmail = (email: string) => {
  const users = getStoredUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
};

export const updateUserProfile = (
  email: string,
  updates: { name?: string; profile?: UserProfile },
) => {
  const users = getStoredUsers();
  const updated = users.map((user) => {
    if (user.email.toLowerCase() !== email.toLowerCase()) {
      return user;
    }
    return {
      ...user,
      name: updates.name ?? user.name,
      profile: {
        ...user.profile,
        ...updates.profile,
      },
    };
  });
  saveUsers(updated);
  return updated.find((user) => user.email.toLowerCase() === email.toLowerCase());
};

export const authProvider: AuthProvider = {
  login: async ({ email, password, role }) => {
    const users = getStoredUsers();
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email?.toLowerCase() &&
        u.password === password &&
        (!role || u.role === role),
    );

    if (user) {
      localStorage.setItem(TOKEN_KEY, user.email);
      localStorage.setItem(ROLE_KEY, user.role);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid email, password, or role",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const role = localStorage.getItem(ROLE_KEY);
    return role;
  },
  getIdentity: async () => {
    const email = localStorage.getItem(TOKEN_KEY);
    const users = getStoredUsers();
    const user = users.find((u) => u.email === email);
    return {
      id: 1,
      name: user?.name || "John Doe",
      avatar: user?.avatar,
      role: user?.role,
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
