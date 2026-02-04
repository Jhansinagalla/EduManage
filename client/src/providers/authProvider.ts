import { AuthProvider } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";
export const ROLE_KEY = "refine-role";

// Mock user data for login
const MOCK_USERS = [
  { email: "admin@school.com", role: "admin", name: "Principal Anderson" },
  { email: "teacher@school.com", role: "teacher", name: "Ms. Jennifer Honey" },
  { email: "student@school.com", role: "student", name: "Matilda Wormwood" },
];

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    // Mock login logic - specific emails give specific roles
    // Any password works for MVP
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (user) {
      localStorage.setItem(TOKEN_KEY, email);
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
        message: "Invalid email or password",
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
    const user = MOCK_USERS.find(u => u.email === email);
    return {
      id: 1,
      name: user?.name || "John Doe",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      role: user?.role,
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
