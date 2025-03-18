"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  UserPlus,
  PartyPopper,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EventsPage() {
  // Define events using state with TypeScript interface
  const [events, setEvents] = useState<
    Array<{
      id: number;
      name: string;
      description: string;
      date: string;
      time: string;
      location: string;
      calendarLink?: string;
      registerLink?: string;
    }>
  >([]);

  useEffect(() => {
    setEvents([
      {
        id: 1,
        name: "Southeast Asian Cultural Night",
        description:
          "Experience traditional performances, music, and food from various Southeast Asian countries",
        date: "March 20, 2025",
        time: "6:00 PM - 9:00 PM",
        location: "Student Center, Grand Ballroom",
        calendarLink: "https://calendar.google.com",
        registerLink: "https://forms.gle/example1",
      },
      {
        id: 2,
        name: "SEAC General Meeting",
        description:
          "Join our monthly meeting to discuss upcoming cultural events and community initiatives",
        date: "April 5, 2025",
        time: "5:30 PM - 6:30 PM",
        location: "Student Union, Room 202",
        calendarLink: "https://calendar.google.com",
        registerLink: "https://forms.gle/example2",
      },
      {
        id: 3,
        name: "Southeast Asian Food Festival",
        description:
          "Taste authentic dishes from Thailand, Vietnam, Philippines, Malaysia, Indonesia and more",
        date: "April 15, 2025",
        time: "12:00 PM - 4:00 PM",
        location: "Campus Center, Main Plaza",
        calendarLink: "https://calendar.google.com",
        registerLink: "https://forms.gle/example3",
      },
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 mt-20">
      {/* Main Events Card */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <PartyPopper className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-2xl">SEAC Events</CardTitle>
            <CardDescription>
              Celebrate Southeast Asian culture and community
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Join us for exciting events that showcase the rich cultural heritage
            of Southeast Asia. From traditional performances to authentic
            cuisine, our events provide opportunities to connect with the
            Southeast Asian community and learn about diverse traditions.
          </p>

          <div className="grid gap-6">
            {events.map((event) => (
              <Card key={event.id} className="shadow-md bg-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl">{event.name}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 py-1.5"
                    >
                      <Calendar />
                      <span>{event.date}</span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 py-1.5"
                    >
                      <Clock />
                      <span>{event.time}</span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 py-1.5"
                    >
                      <MapPin />
                      <span>{event.location}</span>
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <CalendarPlus className="h-4 w-4" />
                    <Link href={event.calendarLink || "#"} target="_blank">
                      Add to Calendar
                    </Link>
                  </Button>
                  <Button className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    <Link href={event.registerLink || "#"} target="_blank">
                      Register
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No upcoming events at the moment. Check back soon!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
