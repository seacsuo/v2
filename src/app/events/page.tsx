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
  Calendar1Icon,
  Clock,
  MapPin,
  UserPlus,
  PartyPopper,
  ImageIcon,
  Trash2,
  Edit,
  CalendarClock,
  CalendarIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/types";
import { Calendar } from "@/components/ui/calendar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [refetchEvents, setRefetchEvents] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const today = new Date();

  const { user } = useAuth();

  // Event schema for form validation
  const eventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    datetime: z.string().min(1, "Date and time are required"),
    location: z.string().min(1, "Location is required"),
    link: z.string().url("Invalid URL").optional().or(z.literal("")),
    imageLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  });

  // Form setup with React Hook Form
  const eventForm = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      datetime: new Date().toISOString(),
      location: "",
      link: "",
      imageLink: "",
    },
  });

  // Function to handle form submission
  const handleCreateEventSubmit = (values: z.infer<typeof eventSchema>) => {
    // Create a proper event object
    const newEvent = {
      ...values,
      // Convert empty strings to undefined for optional fields
      link: values.link || undefined,
      imageLink: values.imageLink || undefined,
    };

    // Call the existing addEvent function
    addEvent(newEvent as Event);

    // Reset form and close dialog
    eventForm.reset();
    setIsCreateDialogOpen(false);
  };

  function isPastEvent(event: Event): boolean {
    return new Date(event.datetime) < today;
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (refetchEvents) {
      fetchEvents();
      setRefetchEvents(false);
    }
  }, [refetchEvents]);

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
      console.log("Adding event:", event);
      const { data, error } = await supabase
        .from("event")
        .insert([event])
        .select("*");

      if (error) {
        console.error("Error adding event:", error.message);
        toast.error("Error adding event: " + error.message);
      } else {
        setEvents((prevEvents) => [...prevEvents, ...data]);
        toast.success("Event added successfully!");
        console.log("Added event:", data);
      }
    } catch (error) {
      toast.error("Error adding event: " + error);
      console.error("Error adding event:", error);
    } finally {
      setRefetchEvents(true);
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
              <Button
                variant="default"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <CalendarClock size={18} />
                Create Event
              </Button>
            </div>
          )}

          {/* Create Event Dialog */}
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Event</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Please fill in all required fields marked with *.
                </DialogDescription>
              </DialogHeader>
              <Form {...eventForm}>
                <form
                  id="create-event-form"
                  onSubmit={eventForm.handleSubmit(handleCreateEventSubmit)}
                  className="space-y-4"
                >
                  {/* Title */}
                  <FormField
                    control={eventForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="Event Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Description */}
                  <FormField
                    control={eventForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description*</FormLabel>
                        <FormControl>
                          <Input placeholder="Event Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Date and Time Picker */}
                  <FormField
                    control={eventForm.control}
                    name="datetime"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-2 w-1/2">
                            <FormLabel>Date and Time*</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(new Date(field.value), "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={(date) => {
                                    if (date) {
                                      try {
                                        const currentDateTime = field.value
                                          ? new Date(field.value)
                                          : new Date();

                                        // Ensure the date is valid before setting hours/minutes
                                        const newDate = new Date(date);

                                        // Copy the time from the current value
                                        newDate.setHours(
                                          currentDateTime.getHours()
                                        );
                                        newDate.setMinutes(
                                          currentDateTime.getMinutes()
                                        );

                                        // Verify the date is valid before setting the ISO string
                                        if (!isNaN(newDate.getTime())) {
                                          field.onChange(newDate.toISOString());
                                        }
                                      } catch (e) {
                                        // If any error occurs, set today's date as fallback
                                        const today = new Date();
                                        field.onChange(today.toISOString());
                                        console.error("Error setting date:", e);
                                      }
                                    }
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="flex justify-center gap-1 w-1/2">
                            <div className="grid gap-1">
                              <FormLabel className="text-xs">Hour*</FormLabel>
                              <Select
                                value={
                                  field.value &&
                                  !isNaN(new Date(field.value).getTime())
                                    ? String(
                                        new Date(field.value).getHours() % 12 ||
                                          12
                                      )
                                    : "12"
                                }
                                onValueChange={(value) => {
                                  try {
                                    const currentDate =
                                      field.value &&
                                      !isNaN(new Date(field.value).getTime())
                                        ? new Date(field.value)
                                        : new Date();

                                    const isPM = currentDate.getHours() >= 12;
                                    const hourValue = parseInt(value);
                                    const newHour = isPM
                                      ? hourValue === 12
                                        ? 12
                                        : hourValue + 12
                                      : hourValue === 12
                                      ? 0
                                      : hourValue;

                                    currentDate.setHours(newHour);

                                    // Verify date is valid before setting value
                                    if (!isNaN(currentDate.getTime())) {
                                      field.onChange(currentDate.toISOString());
                                    }
                                  } catch (e) {
                                    console.error("Error setting hour:", e);
                                  }
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Hour" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[...Array(12)].map((_, i) => (
                                    <SelectItem key={i} value={String(i + 1)}>
                                      {i + 1}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-1">
                              <FormLabel className="text-xs">Minute*</FormLabel>
                              <Select
                                value={
                                  field.value
                                    ? String(
                                        new Date(field.value).getMinutes()
                                      ).padStart(2, "0")
                                    : "00"
                                }
                                onValueChange={(value) => {
                                  try {
                                    // Ensure we start with a valid date
                                    let currentDate = field.value
                                      ? new Date(field.value)
                                      : new Date();

                                    // If currentDate is invalid, create a new date
                                    if (isNaN(currentDate.getTime())) {
                                      currentDate = new Date();
                                    }

                                    currentDate.setMinutes(parseInt(value));

                                    // Validate before converting to ISO string
                                    if (!isNaN(currentDate.getTime())) {
                                      field.onChange(currentDate.toISOString());
                                    }
                                  } catch (e) {
                                    console.error("Error setting minutes:", e);
                                    // Fallback to current time
                                    field.onChange(new Date().toISOString());
                                  }
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Minute" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[...Array(4)].map((_, i) => (
                                    <SelectItem
                                      key={i}
                                      value={String(i * 15).padStart(2, "0")}
                                    >
                                      {String(i * 15).padStart(2, "0")}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-1">
                              <FormLabel className="text-xs">AM/PM*</FormLabel>
                              <Select
                                value={
                                  field.value &&
                                  new Date(field.value).getHours() >= 12
                                    ? "PM"
                                    : "AM"
                                }
                                onValueChange={(value) => {
                                  const currentDate = field.value
                                    ? new Date(field.value)
                                    : new Date();
                                  const currentHour = currentDate.getHours();
                                  const is12Hour = currentHour % 12 === 0;

                                  if (value === "AM" && currentHour >= 12) {
                                    currentDate.setHours(
                                      is12Hour ? 0 : currentHour - 12
                                    );
                                  } else if (
                                    value === "PM" &&
                                    currentHour < 12
                                  ) {
                                    currentDate.setHours(
                                      is12Hour ? 12 : currentHour + 12
                                    );
                                  }

                                  field.onChange(currentDate.toISOString());
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="AM/PM" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="AM">AM</SelectItem>
                                  <SelectItem value="PM">PM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Location */}
                  <FormField
                    control={eventForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location*</FormLabel>
                        <FormControl>
                          <Input placeholder="Event Location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Link */}
                  <FormField
                    control={eventForm.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                          <Input placeholder="Event Link" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Image Link */}
                  <FormField
                    control={eventForm.control}
                    name="imageLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Link</FormLabel>
                        <FormControl>
                          <Input placeholder="Event Image Link" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  type="submit"
                  form="create-event-form"
                >
                  Create Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
                  <Card
                    key={event.id}
                    className="shadow-md bg-primary/10 flex flex-col justify-between"
                  >
                    <CardHeader>
                      <CardTitle className="flex gap-2 text-2xl">
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
                          <Calendar1Icon />
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
                          <div className="relative w-full h-96 mb-4 flex items-center justify-center bg-muted rounded-lg border border-border">
                            <ImageIcon className="h-32 w-32 text-muted-foreground/50" />
                          </div>
                        )}
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex gap-2 justify-between items-center">
                      {event.link && (
                        <Button className="flex items-center gap-2">
                          <UserPlus className="h-4 w-4" />
                          <Link
                            href={
                              event.link ??
                              "https://campus.hellorubric.com/?s=7807"
                            }
                            target="_blank"
                          >
                            Register
                          </Link>
                        </Button>
                      )}
                      {user && (
                        <div className="flex gap-2">
                          <AlertDialog
                            open={eventToDelete === event.id}
                            onOpenChange={(open) =>
                              !open && setEventToDelete(null)
                            }
                          >
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size={"icon"}
                                onClick={() => setEventToDelete(event.id)}
                              >
                                <Trash2 />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Event
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete &quot;
                                  {event.title}&quot;? This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    deleteEvent(event.id);
                                    setEventToDelete(null);
                                    toast.success(
                                      "Event deleted successfully!"
                                    );
                                    setRefetchEvents(true);
                                  }}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size={"icon"}
                                onClick={() => {
                                  // Pre-fill the form with event data when dialog opens
                                  eventForm.reset({
                                    title: event.title,
                                    description: event.description,
                                    datetime: event.datetime,
                                    location: event.location,
                                    link: event.link || "",
                                    imageLink: event.imageLink || "",
                                  });
                                }}
                              >
                                <Edit />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit Event</DialogTitle>
                                <DialogDescription className="text-sm text-muted-foreground">
                                  Update event details below.
                                </DialogDescription>
                              </DialogHeader>
                              <Form {...eventForm}>
                                <form
                                  id="edit-event-form"
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = eventForm.getValues();
                                    updateEvent(event.id, formData as Event);
                                    toast.success(
                                      "Event updated successfully!"
                                    );
                                    setRefetchEvents(true);
                                  }}
                                  className="space-y-4"
                                >
                                  {/* Title */}
                                  <FormField
                                    control={eventForm.control}
                                    name="title"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Title*</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Event Title"
                                            defaultValue={event.title}
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* Description */}
                                  <FormField
                                    control={eventForm.control}
                                    name="description"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Description*</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Event Description"
                                            defaultValue={event.description}
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* Date and Time Picker */}
                                  <FormField
                                    control={eventForm.control}
                                    name="datetime"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-col">
                                        <div className="flex gap-2">
                                          <div className="flex flex-col gap-2 w-1/2">
                                            <FormLabel>
                                              Date and Time*
                                            </FormLabel>
                                            <Popover>
                                              <PopoverTrigger asChild>
                                                <FormControl>
                                                  <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                      "text-left font-normal",
                                                      !field.value &&
                                                        "text-muted-foreground"
                                                    )}
                                                  >
                                                    {field.value
                                                      ? format(
                                                          new Date(field.value),
                                                          "PPP"
                                                        )
                                                      : format(
                                                          new Date(
                                                            event.datetime
                                                          ),
                                                          "PPP"
                                                        )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                  </Button>
                                                </FormControl>
                                              </PopoverTrigger>
                                              <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                              >
                                                <Calendar
                                                  mode="single"
                                                  selected={
                                                    field.value
                                                      ? new Date(field.value)
                                                      : new Date(event.datetime)
                                                  }
                                                  onSelect={(date) => {
                                                    if (date) {
                                                      try {
                                                        const currentDateTime =
                                                          field.value
                                                            ? new Date(
                                                                field.value
                                                              )
                                                            : new Date(
                                                                event.datetime
                                                              );

                                                        // Ensure the date is valid before setting hours/minutes
                                                        const newDate =
                                                          new Date(date);

                                                        // Copy the time from the current value
                                                        newDate.setHours(
                                                          currentDateTime.getHours()
                                                        );
                                                        newDate.setMinutes(
                                                          currentDateTime.getMinutes()
                                                        );

                                                        // Verify the date is valid before setting the ISO string
                                                        if (
                                                          !isNaN(
                                                            newDate.getTime()
                                                          )
                                                        ) {
                                                          field.onChange(
                                                            newDate.toISOString()
                                                          );
                                                        }
                                                      } catch (e) {
                                                        // If any error occurs, set today's date as fallback
                                                        const today =
                                                          new Date();
                                                        field.onChange(
                                                          today.toISOString()
                                                        );
                                                        console.error(
                                                          "Error setting date:",
                                                          e
                                                        );
                                                      }
                                                    }
                                                  }}
                                                  initialFocus
                                                />
                                              </PopoverContent>
                                            </Popover>
                                          </div>
                                          <div className="flex justify-center gap-1 w-1/2">
                                            <div className="grid gap-1">
                                              <FormLabel className="text-xs">
                                                Hour*
                                              </FormLabel>
                                              <Select
                                                defaultValue={String(
                                                  new Date(
                                                    event.datetime
                                                  ).getHours() % 12 || 12
                                                )}
                                                onValueChange={(value) => {
                                                  try {
                                                    const currentDate =
                                                      field.value
                                                        ? new Date(field.value)
                                                        : new Date(
                                                            event.datetime
                                                          );

                                                    const isPM =
                                                      currentDate.getHours() >=
                                                      12;
                                                    const hourValue =
                                                      parseInt(value);
                                                    const newHour = isPM
                                                      ? hourValue === 12
                                                        ? 12
                                                        : hourValue + 12
                                                      : hourValue === 12
                                                      ? 0
                                                      : hourValue;

                                                    currentDate.setHours(
                                                      newHour
                                                    );

                                                    // Verify date is valid before setting value
                                                    if (
                                                      !isNaN(
                                                        currentDate.getTime()
                                                      )
                                                    ) {
                                                      field.onChange(
                                                        currentDate.toISOString()
                                                      );
                                                    }
                                                  } catch (e) {
                                                    console.error(
                                                      "Error setting hour:",
                                                      e
                                                    );
                                                  }
                                                }}
                                              >
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Hour" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  {[...Array(12)].map(
                                                    (_, i) => (
                                                      <SelectItem
                                                        key={i}
                                                        value={String(i + 1)}
                                                      >
                                                        {i + 1}
                                                      </SelectItem>
                                                    )
                                                  )}
                                                </SelectContent>
                                              </Select>
                                            </div>
                                            <div className="grid gap-1">
                                              <FormLabel className="text-xs">
                                                Minute*
                                              </FormLabel>
                                              <Select
                                                defaultValue={String(
                                                  new Date(
                                                    event.datetime
                                                  ).getMinutes()
                                                ).padStart(2, "0")}
                                                onValueChange={(value) => {
                                                  try {
                                                    // Ensure we start with a valid date
                                                    let currentDate =
                                                      field.value
                                                        ? new Date(field.value)
                                                        : new Date(
                                                            event.datetime
                                                          );

                                                    // If currentDate is invalid, create a new date
                                                    if (
                                                      isNaN(
                                                        currentDate.getTime()
                                                      )
                                                    ) {
                                                      currentDate = new Date();
                                                    }

                                                    currentDate.setMinutes(
                                                      parseInt(value)
                                                    );

                                                    // Validate before converting to ISO string
                                                    if (
                                                      !isNaN(
                                                        currentDate.getTime()
                                                      )
                                                    ) {
                                                      field.onChange(
                                                        currentDate.toISOString()
                                                      );
                                                    }
                                                  } catch (e) {
                                                    console.error(
                                                      "Error setting minutes:",
                                                      e
                                                    );
                                                    // Fallback to current time
                                                    field.onChange(
                                                      new Date().toISOString()
                                                    );
                                                  }
                                                }}
                                              >
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Minute" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  {[...Array(4)].map((_, i) => (
                                                    <SelectItem
                                                      key={i}
                                                      value={String(
                                                        i * 15
                                                      ).padStart(2, "0")}
                                                    >
                                                      {String(i * 15).padStart(
                                                        2,
                                                        "0"
                                                      )}
                                                    </SelectItem>
                                                  ))}
                                                </SelectContent>
                                              </Select>
                                            </div>
                                            <div className="grid gap-1">
                                              <FormLabel className="text-xs">
                                                AM/PM*
                                              </FormLabel>
                                              <Select
                                                defaultValue={
                                                  new Date(
                                                    event.datetime
                                                  ).getHours() >= 12
                                                    ? "PM"
                                                    : "AM"
                                                }
                                                onValueChange={(value) => {
                                                  const currentDate =
                                                    field.value
                                                      ? new Date(field.value)
                                                      : new Date(
                                                          event.datetime
                                                        );
                                                  const currentHour =
                                                    currentDate.getHours();
                                                  const is12Hour =
                                                    currentHour % 12 === 0;

                                                  if (
                                                    value === "AM" &&
                                                    currentHour >= 12
                                                  ) {
                                                    currentDate.setHours(
                                                      is12Hour
                                                        ? 0
                                                        : currentHour - 12
                                                    );
                                                  } else if (
                                                    value === "PM" &&
                                                    currentHour < 12
                                                  ) {
                                                    currentDate.setHours(
                                                      is12Hour
                                                        ? 12
                                                        : currentHour + 12
                                                    );
                                                  }

                                                  field.onChange(
                                                    currentDate.toISOString()
                                                  );
                                                }}
                                              >
                                                <SelectTrigger>
                                                  <SelectValue placeholder="AM/PM" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="AM">
                                                    AM
                                                  </SelectItem>
                                                  <SelectItem value="PM">
                                                    PM
                                                  </SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                          </div>
                                        </div>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* Location */}
                                  <FormField
                                    control={eventForm.control}
                                    name="location"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Location*</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Event Location"
                                            defaultValue={event.location}
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* Link */}
                                  <FormField
                                    control={eventForm.control}
                                    name="link"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Link</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Event Link"
                                            defaultValue={event.link || ""}
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  {/* Image Link */}
                                  <FormField
                                    control={eventForm.control}
                                    name="imageLink"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Image Link</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Event Image Link"
                                            defaultValue={event.imageLink || ""}
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </form>
                              </Form>
                              <DialogFooter>
                                <Button variant="secondary" type="button">
                                  Cancel
                                </Button>
                                <Button
                                  variant="default"
                                  type="submit"
                                  form="edit-event-form"
                                >
                                  Update Event
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
