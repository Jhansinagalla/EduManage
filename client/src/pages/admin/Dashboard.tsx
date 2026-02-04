import { useList } from "@refinedev/core";
import { Users, BookOpen, GraduationCap, TrendingUp, Calendar } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function AdminDashboard() {
  const { data: studentsData } = useList({ resource: "students" });
  const { data: teachersData } = useList({ resource: "teachers" });
  const { data: classesData } = useList({ resource: "classes" });

  const chartData = [
    { name: 'Grade 5', students: 45, fill: '#6366f1' },
    { name: 'Grade 6', students: 52, fill: '#8b5cf6' },
    { name: 'Grade 7', students: 38, fill: '#ec4899' },
    { name: 'Grade 8', students: 41, fill: '#f43f5e' },
    { name: 'Grade 9', students: 35, fill: '#f97316' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Principal Anderson.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={studentsData?.total || 452}
          icon={<Users className="w-6 h-6" />}
          trend="12%"
          trendUp={true}
          color="blue"
        />
        <StatCard
          title="Total Teachers"
          value={teachersData?.total || 24}
          icon={<GraduationCap className="w-6 h-6" />}
          trend="4%"
          trendUp={true}
          color="purple"
        />
        <StatCard
          title="Active Classes"
          value={classesData?.total || 18}
          icon={<BookOpen className="w-6 h-6" />}
          color="orange"
        />
        <StatCard
          title="Attendance Rate"
          value="96%"
          icon={<TrendingUp className="w-6 h-6" />}
          trend="2%"
          trendUp={false}
          color="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-display">Student Enrollment by Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="students" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-display">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New assignment posted</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Grade 5 Science • 2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <h4 className="font-semibold text-primary mb-1 text-sm">Upcoming Event</h4>
              <p className="text-sm text-foreground/80">Science Fair 2024</p>
              <p className="text-xs text-muted-foreground mt-1">Oct 28, 9:00 AM</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
