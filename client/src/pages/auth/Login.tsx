import { useLogin } from "@refinedev/core";
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { School, User, ShieldCheck, GraduationCap } from "lucide-react";
import { registerUser } from "@/providers/authProvider";

export function Login() {
  const { mutate: login, isLoading } = useLogin();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

  const getPasswordIssue = (value: string) => {
    if (value.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must include a lowercase letter.";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must include an uppercase letter.";
    }
    if (!/[0-9]/.test(value)) {
      return "Password must include a number.";
    }
    if (!SPECIAL_CHAR_REGEX.test(value)) {
      return "Password must include a special character.";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (mode === "signup") {
      if (!role) {
        setError("Please select a role.");
        return;
      }
      const passwordIssue = getPasswordIssue(password);
      if (passwordIssue) {
        setError(passwordIssue);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const result = registerUser({ email, password, role, name });
      if (!result.success) {
        setError(result.error || "Unable to create account.");
        return;
      }
    }

    login(
      {
        email,
        password,
        role: mode === "signin" ? role : undefined,
      },
      {
        onSuccess: () => {
          setLocation("/");
        },
        onError: (err) => {
          setError(err?.message || "Unable to sign in.");
        },
      },
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />

      <Card className="w-full max-w-md shadow-2xl border-border/50 bg-white/80 backdrop-blur-xl">
        <CardHeader className="text-center space-y-4 pt-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-500/20 transform -rotate-3">
            <School className="w-8 h-8" />
          </div>
          <div>
            <CardTitle className="text-2xl font-display font-bold">
              {mode === "signin" ? "Welcome Back" : "Create an Account"}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {mode === "signin" ? "Sign in to your dashboard" : "Sign up to access your dashboard"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={mode} className="w-full" onValueChange={(v) => setMode(v as any)}>
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100/50 p-1">
              <TabsTrigger value="signin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <Tabs defaultValue="student" className="w-full" onValueChange={(v) => setRole(v as any)}>
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-100/50 p-1">
                  <TabsTrigger value="student" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Student
                  </TabsTrigger>
                  <TabsTrigger value="teacher" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Teacher
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Admin
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </TabsContent>

            <TabsContent value="signup">
              <Tabs defaultValue="student" className="w-full" onValueChange={(v) => setRole(v as any)}>
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-100/50 p-1">
                  <TabsTrigger value="student" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Student
                  </TabsTrigger>
                  <TabsTrigger value="teacher" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Teacher
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Admin
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </TabsContent>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-9 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@school.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                  />
                </div>
                {mode === "signup" && (
                  <p className="text-xs text-muted-foreground">
                    Use 8+ chars with upper, lower, number, and a symbol.
                  </p>
                )}
              </div>

              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-9 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg">
                  {error}
                </div>
              )}

              {mode === "signin" && (
                <div className="bg-blue-50 text-blue-700 text-xs p-3 rounded-lg flex gap-2">
                  <GraduationCap className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>Use the role tabs to match your account role.</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : mode === "signin" ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-center pb-8">
          <p className="text-xs text-muted-foreground">(c) 2024 EduManage System</p>
        </CardFooter>
      </Card>
    </div>
  );
}
