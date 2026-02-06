import { useGetIdentity, useList } from "@refinedev/core";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trophy, CalendarCheck, BookOpen, Clock, Camera } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { TOKEN_KEY, UserProfile, getUserByEmail, updateUserAvatar, updateUserProfile } from "@/providers/authProvider";

export function StudentProfile() {
  const { data: user } = useGetIdentity<{ name: string; avatar?: string; role: string }>();
  const { data: resultsData } = useList({ resource: "results" });
  const results = resultsData?.data ?? [];
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<
    UserProfile & {
      name: string;
    }
  >({
    name: "",
    phone: "",
    address: "",
    bio: "",
    department: "",
    subject: "",
    qualification: "",
    experienceYears: "",
    grade: "",
    section: "",
    studentId: "",
    admissionYear: "",
    parentName: "",
    parentPhone: "",
  });

  useEffect(() => {
    setAvatarPreview(user?.avatar);
  }, [user?.avatar]);

  useEffect(() => {
    const email = localStorage.getItem(TOKEN_KEY);
    if (!email) return;
    const current = getUserByEmail(email);
    setForm({
      name: current?.name || user?.name || "",
      phone: current?.profile?.phone || "",
      address: current?.profile?.address || "",
      bio: current?.profile?.bio || "",
      department: current?.profile?.department || "",
      subject: current?.profile?.subject || "",
      qualification: current?.profile?.qualification || "",
      experienceYears: current?.profile?.experienceYears || "",
      grade: current?.profile?.grade || "",
      section: current?.profile?.section || "",
      studentId: current?.profile?.studentId || "",
      admissionYear: current?.profile?.admissionYear || "",
      parentName: current?.profile?.parentName || "",
      parentPhone: current?.profile?.parentPhone || "",
    });
  }, [user?.name]);

  const getInitials = (value?: string) => {
    const safe = value?.trim() || "";
    if (!safe) return "U";
    const parts = safe.split(" ");
    const letters = parts.length >= 2 ? `${parts[0][0]}${parts[1][0]}` : safe.slice(0, 2);
    return letters.toUpperCase();
  };

  const getAvatarStyle = (value?: string) => {
    const text = value || "user";
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return { backgroundColor: `hsl(${hue}, 55%, 35%)`, color: "hsl(0 0% 98%)" };
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) return;
      const email = localStorage.getItem(TOKEN_KEY);
      if (email) {
        updateUserAvatar(email, result);
      }
      setAvatarPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const updateField = (key: keyof UserProfile | "name", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    const email = localStorage.getItem(TOKEN_KEY);
    if (!email) return;
    const current = getUserByEmail(email);
    setForm({
      name: current?.name || user?.name || "",
      phone: current?.profile?.phone || "",
      address: current?.profile?.address || "",
      bio: current?.profile?.bio || "",
      department: current?.profile?.department || "",
      subject: current?.profile?.subject || "",
      qualification: current?.profile?.qualification || "",
      experienceYears: current?.profile?.experienceYears || "",
      grade: current?.profile?.grade || "",
      section: current?.profile?.section || "",
      studentId: current?.profile?.studentId || "",
      admissionYear: current?.profile?.admissionYear || "",
      parentName: current?.profile?.parentName || "",
      parentPhone: current?.profile?.parentPhone || "",
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    const email = localStorage.getItem(TOKEN_KEY);
    if (!email) return;
    updateUserProfile(email, {
      name: form.name,
      profile: {
        phone: form.phone,
        address: form.address,
        bio: form.bio,
        department: form.department,
        subject: form.subject,
        qualification: form.qualification,
        experienceYears: form.experienceYears,
        grade: form.grade,
        section: form.section,
        studentId: form.studentId,
        admissionYear: form.admissionYear,
        parentName: form.parentName,
        parentPhone: form.parentPhone,
      },
    });
    setIsEditing(false);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl -ml-10 -mb-10" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white/10 shadow-2xl">
              {avatarPreview ? <AvatarImage src={avatarPreview} /> : null}
              <AvatarFallback className="text-4xl" style={getAvatarStyle(form.name || user?.name)}>
                {getInitials(form.name || user?.name)}
              </AvatarFallback>
            </Avatar>
            <Button
              type="button"
              onClick={handleAvatarClick}
              className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full p-0 bg-white text-slate-900 hover:bg-slate-100 shadow-lg"
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          
          <div className="text-center md:text-left space-y-2 flex-1">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl font-display font-bold text-emerald-200">
                {form.name || user?.name}
              </h1>
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

      <Card className="border-border">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Edit Profile</CardTitle>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {user?.role === "student" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={form.studentId}
                  onChange={(e) => updateField("studentId", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  value={form.grade}
                  onChange={(e) => updateField("grade", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Input
                  id="section"
                  value={form.section}
                  onChange={(e) => updateField("section", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admissionYear">Admission Year</Label>
                <Input
                  id="admissionYear"
                  value={form.admissionYear}
                  onChange={(e) => updateField("admissionYear", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent/Guardian Name</Label>
                <Input
                  id="parentName"
                  value={form.parentName}
                  onChange={(e) => updateField("parentName", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                <Input
                  id="parentPhone"
                  value={form.parentPhone}
                  onChange={(e) => updateField("parentPhone", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </>
          )}

          {user?.role === "teacher" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={form.department}
                  onChange={(e) => updateField("department", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={form.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={form.qualification}
                  onChange={(e) => updateField("qualification", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceYears">Experience (Years)</Label>
                <Input
                  id="experienceYears"
                  value={form.experienceYears}
                  onChange={(e) => updateField("experienceYears", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={form.department}
                  onChange={(e) => updateField("department", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceYears">Experience (Years)</Label>
                <Input
                  id="experienceYears"
                  value={form.experienceYears}
                  onChange={(e) => updateField("experienceYears", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </>
          )}

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={form.bio}
              onChange={(e) => updateField("bio", e.target.value)}
              disabled={!isEditing}
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>
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
