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
import { Calendar, Clock, MapPin, UserPlus, PartyPopper } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import CMSFunctions from "@/components/CMSFunctions";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/types";

import { useAuth } from "@/lib/AuthContext";

const RUBRIC_EVENTS_FALLBACK: Event[] = [
  {
    id: 1,
    title: "Cultural Desert Cafe",
    description:
      "We are thrilled to announce that Southeast Asian Club (SEAC) and Singapore International Ice Cream Club (ICC) present Cultural Desert Cafe in the spirit of National Dessert Day!\n\nJoin us for a taste of mouth-watering desserts from across Southeast Asia.\n\nRSVP by October 18, 2024 for FREE!",
    datetime: "2024-10-18T19:00:00+00:00",
    location: "UBCO Courtyard",
    link: "https://campus.hellorubric.com/?s=7807",
    imageLink:
      "https://portal.hellorubric.com/assets/uploadedimgs/df57923f038ef7604e0c3f865be23a7f.jpeg",
  },
  {
    id: 2,
    title: "DIY Batik-Inspired Art Night",
    description:
      "Immerse yourself in beautiful batik-inspired patterns and get a free tote bag! 🎨🖌👜\n\nJoin us for a night of creativity and DIY one of SEA traditional crafts—for FREE! Invite your friends and unleash your creativity!\n\nP.S. There will be free pizzas as well 🍕🤫",
    datetime: "2024-11-08T00:00:00+00:00",
    location: "FIP 250",
    link: "https://campus.hellorubric.com/?s=7807",
    imageLink:
      "https://portal.hellorubric.com/assets/uploadedimgs/b139e2fcc827f1e56353029f964525d2.png",
  },
  {
    id: 3,
    title: "Ramen Movie Night",
    description:
      "Stressed about midterms, the weather, or life in general?? 👀✨️\n\nTake a break and join SEAC for a screening of \"How to Make Millions Before Grandma Dies\"—with FREE ramen and drinks (all halal)! 🍜🎞✨️🚨\n\nHurry and reserve your spot on RUBRIC — first 30 to sign up are guaranteed FREE ramen, so don't miss out!! 🚨\n\nWe'll also be selling our signature SEAC stickers—be sure to check them out!",
    datetime: "2025-02-13T00:30:00+00:00",
    location: "FIP 121",
    link: "https://campus.hellorubric.com/?s=7807",
    imageLink:
      "https://cachedresources.hellorubric.com/uploaded_assets/d9a2300d-3df6-48ff-b022-75e969112fde.png",
  },
  {
    id: 4,
    title: "Tropical Rainforest Gala",
    description:
      "🌿✨ You have been invited to the Tropical Rainforest Gala! ✨🌿\n\nJoin us for one of SEAC’s most unforgettable annual events!\n\nDress to impress in your best or traditional attire and enjoy exotic games like Chapteh from China, Pasikat Piring from Indonesia, and Tumbang Preso from the Philippines.\n\nWhether you played these growing up or are trying them for the first time, come connect, compete, and have fun!",
    datetime: "2025-03-23T01:00:00+00:00",
    location: "FIP 204",
    link: "https://campus.hellorubric.com/?s=7807",
    imageLink:
      "https://cachedresources.hellorubric.com/uploaded_assets/fb52ebc5-cb24-4f5e-9862-57470c7f3373.png",
  },
  {
    id: 5,
    title: "Cultural Sports Day",
    description:
      "Gear up for Southeast Asian Club's Cultural Sports Day! Join us for a day of friendly competition, laughter, and nostalgia—FREE FOOD (all halal) and fun, with a chance to win some great prizes!",
    datetime: "2025-03-29T00:30:00+00:00",
    location: "The Hangar",
    link: "https://campus.hellorubric.com/?s=7807",
    imageLink:
      "https://cachedresources.hellorubric.com/uploaded_assets/5006064e-44b5-4bbb-bec7-43c13b2f31d9.jpeg",
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date();

  const [eventToModify, setEventToModify] = useState<Event | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const { user } = useAuth();

  function isPastEvent(event: Event): boolean {
    return new Date(event.datetime) < today;
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (eventToModify) {
      if (eventToModify.id) {
        // If event has ID, we're editing existing event
        updateEvent(eventToModify.id, eventToModify);
      } else {
        // No ID means new event
        addEvent(eventToModify);
      }
      setEventToModify(null); // Reset after handling
    }
  }, [eventToModify]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("event")
        .select("*")
        .order("datetime", { ascending: false });

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
  };

  const addEvent = async (event: Event) => {
    try {
      const { data, error } = await supabase
        .from("event")
        .insert([event])
        .select("*");

      if (error) {
        console.error("Error adding event:", error.message);
      } else {
        setEvents((prevEvents) => [...prevEvents, ...data]);
        console.log("Added event:", data);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const deleteEvent = async (eventId: number) => {
    try {
      const { data, error } = await supabase
        .from("event")
        .delete()
        .eq("id", eventId)
        .select("*");

      if (error) {
        console.error("Error deleting event:", error.message);
      } else {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId)
        );
        console.log("Deleted event:", data);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const updateEvent = async (eventId: number, updatedEvent: Event) => {
    try {
      const { data, error } = await supabase
        .from("event")
        .update(updatedEvent)
        .eq("id", eventId)
        .select("*");

      if (error) {
        console.error("Error updating event:", error.message);
      } else {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, ...updatedEvent } : event
          )
        );
        console.log("Updated event:", data);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

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
          <div className="mb-4">
            Join us for exciting events that showcase the rich cultural heritage
            of Southeast Asia. From traditional performances to authentic
            cuisine, our events provide opportunities to connect with the
            Southeast Asian community and learn about diverse traditions.
          </div>

          <Separator className="mb-4" />

          {user && (
            <div className="mb-4 flex justify-center">
              <CMSFunctions
                contentType="event"
                setEventToModify={setEventToModify}
                onAddItem={(item) => addEvent(item as Event)}
                onEditItem={(id, item) => updateEvent(id, item as Event)}
                onDeleteItem={(id) => deleteEvent(id)}
                selectedItemId={selectedEventId}
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {loading
              ? // Skeleton loaders for events
                Array.from({ length: 6 }).map((_, index) => (
                  <Card
                    key={`skeleton-${index}`}
                    className="shadow-md bg-primary/10"
                  >
                    <CardHeader>
                      <Skeleton className="h-7 w-3/4 mb-4" />
                      <div className="flex flex-wrap gap-3">
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-8 w-32" />
                      </div>
                      <Skeleton className="h-96 w-full mt-4 mb-4 rounded-lg" />
                      <Skeleton className="h-4 w-full mt-3" />
                      <Skeleton className="h-4 w-5/6 mt-2" />
                    </CardHeader>
                    <CardFooter>
                      <Skeleton className="h-10 w-32" />
                    </CardFooter>
                  </Card>
                ))
              : events.map((event) => (
                  <Card key={event.id} className="shadow-md bg-primary/10">
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        <div>{event.title}</div>
                      </CardTitle>

                      <div className="flex flex-wrap gap-3">
                        <Badge
                          variant={
                            isPastEvent(event) ? "destructive" : "default"
                          }
                        >
                          {isPastEvent(event) ? "Past Event" : "Upcoming Event"}
                        </Badge>
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
                        {event.imageLink ? (
                          <div className="relative w-full h-96 mb-4">
                            <Image
                              src={event.imageLink}
                              alt={event.title}
                              fill
                              className="object-cover rounded-lg"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              priority={true}
                            />
                          </div>
                        ) : (
                          <div className="flex justify-center mb-4">
                            <Image
                              src="/images/placeholder.png"
                              alt="Placeholder"
                              width={600}
                              height={300}
                              className="rounded-lg object-cover"
                            />
                          </div>
                        )}
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        <Link href={event.link ?? "#"} target="_blank">
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
