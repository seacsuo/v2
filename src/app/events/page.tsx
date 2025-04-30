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
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";

type Event = {
  id: number;
  title: string;
  description: string;
  datetime: string; // ISO-8601 timestamp with offset
  location: string;
  calendarLink?: string;
  registerLink?: string;
};

const RUBRIC_EVENTS_FALLBACK: Event[] = [
  {
    id: 1,
    title: "Cultural Desert Cafe",
    description: "",
    datetime: "2024-10-18T12:00:00-07:00",
    location: "UBCO, University Way, Kelowna, BC, Canada",
    calendarLink: "https://campus.hellorubric.com/?s=7807",
    registerLink: "https://campus.hellorubric.com/?s=7807",
  },

  {
    id: 2,
    title: "DIY Batik-Inspired Art Night",
    description: "",
    datetime: "2024-11-07T18:00:00-07:00",
    location: "Charles E. Fipke Building, University Way, Kelowna, BC, Canada",
    calendarLink: "https://campus.hellorubric.com/?s=7807",
    registerLink: "https://campus.hellorubric.com/?s=7807",
  },
  {
    id: 3,
    title: "Ramen Movie Night",
    description: "",
    datetime: "2025-02-12T17:30:00-07:00",
    location: "3272 University Way, Kelowna, BC, Canada",
    calendarLink: "https://campus.hellorubric.com/?s=7807",
    registerLink: "https://campus.hellorubric.com/?s=7807",
  },
  {
    id: 4,
    title: "Tropical Rainforest Gala",
    description: "",
    datetime: "2025-03-22T18:00:00-07:00",
    location: "FIP 204",
    calendarLink: "https://campus.hellorubric.com/?s=7807",
    registerLink: "https://campus.hellorubric.com/?s=7807",
  },
  {
    id: 5,
    title: "Cultural Sports Day",
    description: "",
    datetime: "2025-03-28T17:30:00-07:00",
    location: "The Hangar Fitness and Wellness Centre",
    calendarLink: "https://campus.hellorubric.com/?s=7807",
    registerLink: "https://campus.hellorubric.com/?s=7807",
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("event")
          .select("*")
          .order("datetime", { ascending: true });

        if (error) {
          setEvents(RUBRIC_EVENTS_FALLBACK);
          console.error("Error fetching events:", error.message);
        } else {
          setEvents(data);
          console.log("Fetched events:", data);
        }
      } catch (error) {
        /* swallow errors and fall back */
        setEvents(RUBRIC_EVENTS_FALLBACK);
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatDate = (dt: string) =>
    new Date(dt).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  const formatTime = (dt: string) =>
    new Date(dt).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 mt-20 animate-fade-in">
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
            {loading
              ? // Skeleton loaders for events
                Array.from({ length: 4 }).map((_, index) => (
                  <Card
                    key={`skeleton-${index}`}
                    className="shadow-md bg-primary/10"
                  >
                    <CardHeader>
                      <Skeleton className="h-7 w-3/4 mb-4" />
                      <div className="flex flex-wrap gap-3">
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-8 w-48" />
                      </div>
                      <Skeleton className="h-4 w-full mt-3" />
                      <Skeleton className="h-4 w-5/6 mt-2" />
                    </CardHeader>
                    <CardContent></CardContent>
                    <CardFooter className="flex flex-wrap gap-4">
                      <Skeleton className="h-10 w-36" />
                      <Skeleton className="h-10 w-32" />
                    </CardFooter>
                  </Card>
                ))
              : events.map((event) => (
                  <Card key={event.id} className="shadow-md bg-primary/10">
                    <CardHeader>
                      <CardTitle className="text-xl">{event.title}</CardTitle>

                      <div className="flex flex-wrap gap-3">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 py-1.5"
                        >
                          <Calendar />
                          <span>{formatDate(event.datetime)}</span>
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 py-1.5"
                        >
                          <Clock />
                          <span>{formatTime(event.datetime)}</span>
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 py-1.5"
                        >
                          <MapPin />
                          <span>{event.location}</span>
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent></CardContent>
                    <CardFooter className="flex flex-wrap gap-4">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <CalendarPlus className="h-4 w-4" />
                        <Link href={event.calendarLink ?? "#"} target="_blank">
                          Add to Calendar
                        </Link>
                      </Button>
                      <Button className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        <Link href={event.registerLink ?? "#"} target="_blank">
                          Register
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
