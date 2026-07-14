import { GlassCard } from "@/components/ui/glass-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const weekdaySchedule = [
  { time: "1 hour", activity: "Theory & Concepts (reading/watching)" },
  { time: "1.5 hours", activity: "Hands-on Coding (practice)" },
  { time: "0.5 hour", activity: "Review & Notes" },
  { time: "1 hour (optional)", activity: "Side project" },
];

const weekendSchedule = [
  { time: "2 hours", activity: "Deep dive into complex topics" },
  { time: "3 hours", activity: "Project work" },
  { time: "1 hour", activity: "Review week's learning" },
];

export function ScheduleTable() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <GlassCard className="overflow-hidden">
        <div className="border-b border-border/50 px-4 py-3">
          <Badge className="bg-gradient-to-r from-violet-600 to-indigo-600">
            Weekdays — 3–4 hours/day
          </Badge>
        </div>
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="w-[100px] sm:w-[140px] text-muted-foreground">Time</TableHead>
              <TableHead className="text-muted-foreground">Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weekdaySchedule.map((row) => (
              <TableRow key={row.time} className="border-border/50">
                <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">{row.time}</TableCell>
                <TableCell className="text-sm">{row.activity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden">
        <div className="border-b border-border/50 px-4 py-3">
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
            Weekends — 5–6 hours/day
          </Badge>
        </div>
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="w-[100px] sm:w-[140px] text-muted-foreground">Time</TableHead>
              <TableHead className="text-muted-foreground">Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weekendSchedule.map((row) => (
              <TableRow key={row.time} className="border-border/50">
                <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">{row.time}</TableCell>
                <TableCell className="text-sm">{row.activity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </GlassCard>
    </div>
  );
}
