"use client";

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
      <div className="rounded-lg border">
        <div className="border-b px-4 py-3">
          <Badge variant="default">Weekdays — 3–4 hours/day</Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Time</TableHead>
              <TableHead>Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weekdaySchedule.map((row) => (
              <TableRow key={row.time}>
                <TableCell className="font-mono text-xs text-muted-foreground">{row.time}</TableCell>
                <TableCell className="text-sm">{row.activity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-lg border">
        <div className="border-b px-4 py-3">
          <Badge variant="secondary">Weekends — 5–6 hours/day</Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Time</TableHead>
              <TableHead>Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weekendSchedule.map((row) => (
              <TableRow key={row.time}>
                <TableCell className="font-mono text-xs text-muted-foreground">{row.time}</TableCell>
                <TableCell className="text-sm">{row.activity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
