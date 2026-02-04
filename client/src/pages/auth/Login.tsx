import { useLogin } from "@refinedev/core";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { School, User, ShieldCheck, GraduationCap } from "lucide-react";

export function Login() {
  const { mutate: login, isLoading } = useLogin();
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");

  // Pre-filled credentials for convenience
  const credentials = {
    admin: { email: "admin@school.com", password: "password" },
    teacher: { email: "teacher@school.com", password: "password" },
    student: { email: "student@school.com", password: "password" },
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials[role]);
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
            <CardTitle className="text-2xl font-display font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-base mt-2">Sign in to your dashboard</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="student" className="w-full" onValueChange={(v) => setRole(v as any)}>
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100/50 p-1">
              <TabsTrigger value="student" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Student</TabsTrigger>
              <TabsTrigger value="teacher" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Teacher</TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Admin</TabsTrigger>
            </TabsList>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@school.com" 
                    defaultValue={credentials[role].email}
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
                    defaultValue="password"
                    className="pl-9 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="bg-blue-50 text-blue-700 text-xs p-3 rounded-lg flex gap-2">
                <GraduationCap className="w-4 h-4 shrink-0 mt-0.5" />
                <p>Demo Mode: Click "Sign In" to login as {role} immediately.</p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-center pb-8">
          <p className="text-xs text-muted-foreground">
            © 2024 EduManage System
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
