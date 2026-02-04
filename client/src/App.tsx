import { Refine, Authenticated } from "@refinedev/core";
import { Switch, Route, Redirect } from "wouter";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";
import { Login } from "./pages/auth/Login";
import { Sidebar } from "./components/Sidebar";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { StudentList } from "./pages/admin/StudentList";
import { TeacherList } from "./pages/admin/TeacherList";
import { MyClasses } from "./pages/teacher/MyClasses";
import { StudentProfile } from "./pages/student/StudentProfile";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "./pages/not-found";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-[#FAFAFA]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Refine
        authProvider={authProvider}
        dataProvider={dataProvider}
        resources={[
          {
            name: "dashboard",
            list: "/",
          },
          {
            name: "students",
            list: "/students",
          },
          {
            name: "teachers",
            list: "/teachers",
          },
          {
            name: "classes",
            list: "/classes",
          },
          {
            name: "profile",
            list: "/profile",
          },
        ]}
      >
        <Switch>
          <Route path="/login" component={Login} />
          
          <Route path="/">
            <Authenticated fallback={<Redirect to="/login" />}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </Authenticated>
          </Route>

          <Route path="/students">
            <Authenticated fallback={<Redirect to="/login" />}>
              <Layout>
                <StudentList />
              </Layout>
            </Authenticated>
          </Route>

          <Route path="/teachers">
            <Authenticated fallback={<Redirect to="/login" />}>
              <Layout>
                <TeacherList />
              </Layout>
            </Authenticated>
          </Route>

          <Route path="/classes">
            <Authenticated fallback={<Redirect to="/login" />}>
              <Layout>
                <MyClasses />
              </Layout>
            </Authenticated>
          </Route>

          <Route path="/profile">
            <Authenticated fallback={<Redirect to="/login" />}>
              <Layout>
                <StudentProfile />
              </Layout>
            </Authenticated>
          </Route>

          <Route component={NotFound} />
        </Switch>
      </Refine>
    </QueryClientProvider>
  );
}

export default App;
