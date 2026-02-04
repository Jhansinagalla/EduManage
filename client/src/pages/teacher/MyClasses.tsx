import { useList } from "@refinedev/core";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function MyClasses() {
  const { data } = useList({ resource: "classes" });
  const classes = data?.data ?? [];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold">My Classes</h1>
          <p className="text-muted-foreground mt-1">Manage your schedule and students</p>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Today is Oct 25, 2024</p>
          <p>Fall Semester</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls: any) => (
          <Card key={cls.id} className="group hover:shadow-lg transition-all duration-300 border-border">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                  {cls.name.split(" ")[0]}
                </Badge>
                <Badge variant="secondary" className="bg-slate-100">Active</Badge>
              </div>
              <CardTitle className="text-xl font-display group-hover:text-primary transition-colors">
                {cls.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{cls.schedule}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Room {cls.room}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>24 Students Enrolled</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                View Class Details <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
