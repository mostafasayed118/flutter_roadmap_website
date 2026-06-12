"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const courses = [
  { title: "Mastering Programming: A Comprehensive Course in Arabic", url: "https://www.udemy.com/course/mastering-programming-a-comprehensive-course-in-arabic/", phase: "Phase 1 - Week 1" },
  { title: "Master Git & GitHub: Essential Skills for Developers in Arabic", url: "https://www.udemy.com/course/master-git-github-essential-skills-for-developersarabic/", phase: "Phase 1 - Week 1" },
  { title: "Best and Complete Flutter Course for Beginners", url: "https://www.udemy.com/course/best-and-complete-flutter-course-for-beginners/", phase: "Phase 2 - Weeks 5-9" },
  { title: "Flutter BLoC Pattern From Zero to Hero in Arabic", url: "https://www.udemy.com/course/flutter-bloc-pattern-from-zero-to-hero-in-arabic/", phase: "Phase 3 - Weeks 10-13" },
  { title: "Flutter App Creation: Google Maps Integration Guide in Arabic", url: "https://www.udemy.com/course/flutter-app-creation-google-maps-integration-guide-arabic/", phase: "Phase 6 - Week 20" },
  { title: "Deep Dive into Clean Architecture in Flutter 2022 [Arabic]", url: "https://www.udemy.com/course/deep-dive-into-clean-architecture-in-flutter-2022arabic/", phase: "Phase 7 - Weeks 23-25" },
  { title: "Flutter Payment Integration (Stripe, PayPal & More) in Arabic", url: "https://www.udemy.com/course/flutter-payment-integration-stripe-paypal-more-arabic/", phase: "Phase 9 - Week 30" },
];

export function CoursesSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recommended Courses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {courses.map((course) => (
          <a
            key={course.title}
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="w-full justify-between gap-2 h-auto py-3 text-left"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{course.title}</p>
                <p className="text-xs text-muted-foreground">{course.phase}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="secondary" className="text-[10px]">Udemy</Badge>
                <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
              </div>
            </Button>
          </a>
        ))}
      </CardContent>
    </Card>
  );
}
