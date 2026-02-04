import { useGetIdentity, useList } from "@refinedev/core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, CalendarCheck, BookOpen, Clock } from "lucide-react";
import { StatCard } from "@/components/StatCard";

export function StudentProfile() {
  const { data: user } = useGetIdentity<{ name: string; avatar: string; role: string }>();
  const { data: resultsData } = useList({ resource: "results" });
  const results = resultsData?.data ?? [];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl -ml-10 -mb-10" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <Avatar className="w-32 h-32 border-4 border-white/10 shadow-2xl">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-4xl bg-slate-700 text-slate-300">
              {user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center md:text-left space-y-2 flex-1">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl font-display font-bold">{user?.name}</h1>
              <Badge className="bg-primary hover:bg-primary text-white border-none">Grade 5A</Badge>
            </div>
            <p className="text-slate-300 max-w-lg">
              Passionate learner interested in Science and Mathematics. Member of the Debate Club and Junior Science League.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 px-3 py-1.5 rounded-full">
                <BookOpen className="w-4 h-4" /> 6 Subjects
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4" /> 96% Attendance
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Overall GPA" 
          value="3.8" 
          icon={<Trophy className="w-6 h-6" />} 
          color="warning" 
          trend="Top 5%"
          trendUp={true}
        />
        <StatCard 
          title="Attendance" 
          value="96%" 
          icon={<CalendarCheck className="w-6 h-6" />} 
          color="success"
        />
        <StatCard 
          title="Assignments" 
          value="12/14" 
          icon={<BookOpen className="w-6 h-6" />} 
          color="blue" 
          trend="2 Pending"
          trendUp={false}
        />
      </div>

      <h2 className="text-2xl font-display font-bold mt-8">Recent Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result: any) => (
          <Card key={result.id} className="border-border hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {result.subject}
              </CardTitle>
              <span className={`text-xl font-bold ${result.score >= 90 ? 'text-emerald-500' : 'text-primary'}`}>
                {result.grade}
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display">{result.score}%</div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                <div 
                  className={`h-2 rounded-full ${result.score >= 90 ? 'bg-emerald-500' : 'bg-primary'}`} 
                  style={{ width: `${result.score}%` }} 
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Class Average: 85%
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
