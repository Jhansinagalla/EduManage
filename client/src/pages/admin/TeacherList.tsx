import { Search, MoreHorizontal, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TEACHERS = [
  {
    id: 1,
    fullName: "Anita Rao",
    subject: "Mathematics",
    email: "anita.rao@school.com",
    phone: "+1 (555) 120-9087",
    status: "Active",
  },
  {
    id: 2,
    fullName: "Marcus Hill",
    subject: "Physics",
    email: "marcus.hill@school.com",
    phone: "+1 (555) 334-1212",
    status: "Active",
  },
  {
    id: 3,
    fullName: "Priya Das",
    subject: "English",
    email: "priya.das@school.com",
    phone: "+1 (555) 841-4482",
    status: "On Leave",
  },
  {
    id: 4,
    fullName: "Daniel Kim",
    subject: "History",
    email: "daniel.kim@school.com",
    phone: "+1 (555) 229-7741",
    status: "Active",
  },
  {
    id: 5,
    fullName: "Sofia Alvarez",
    subject: "Biology",
    email: "sofia.alvarez@school.com",
    phone: "+1 (555) 678-3025",
    status: "Active",
  },
];

export function TeacherList() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Teachers</h1>
          <p className="text-muted-foreground">Manage faculty records and subjects</p>
        </div>
        <Button className="shadow-lg shadow-primary/20 hover:shadow-primary/30">
          Add Teacher
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-slate-50/50 flex gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search teachers..." className="pl-9 bg-white" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Teacher Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TEACHERS.map((teacher) => (
              <TableRow key={teacher.id} className="group">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {teacher.fullName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {teacher.fullName}
                  </div>
                </TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{teacher.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    teacher.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {teacher.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Remove Teacher
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
