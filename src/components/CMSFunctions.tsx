import {
  CalendarClock,
  Edit,
  Trash2,
  ShoppingBag,
  CalendarIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Event } from "@/types";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type ModalType = "create" | "edit" | "delete";
export type ContentType = "event" | "merch";

interface CMSFunctionsProps {
  contentType: ContentType; // Functions to handle add, edit, and delete actions
  addFunction?: (data: Event) => Promise<void> | void;
  editFunction?: (id: number, data: Event) => Promise<void> | void;
  deleteFunction?: (id: number) => Promise<void> | void;
}

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  datetime: z.string().min(1, "Date and time are required"),
  location: z.string().min(1, "Location is required"),
  link: z.string().url("Invalid URL").optional(),
  imageLink: z.string().url("Invalid URL").optional(),
});

const merchSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  link: z.string().url("Invalid URL").optional(),
  imageLink: z.string().url("Invalid URL").optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;
type MerchFormValues = z.infer<typeof merchSchema>;

export default function CMSFunctions({
  contentType,
  addFunction,
  editFunction,
  deleteFunction,
}: CMSFunctionsProps) {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const open = (m: ModalType) => () => setActiveModal(m);
  const close = () => setActiveModal(null);

  const eventForm = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      datetime: "",
      location: "",
      link: "",
      imageLink: "",
    },
  });

  const merchForm = useForm<MerchFormValues>({
    resolver: zodResolver(merchSchema),
    defaultValues: {
      name: "",
      description: "",
      link: "",
      imageLink: "",
    },
  });

  const handleSubmitEvent = () => {
    // turn the form data into a new event or merch object
    const formData =
      contentType === "event" ? eventForm.getValues() : merchForm.getValues();

    // Create a proper event/merch object with all required fields
    if (contentType === "event") {
      const newEvent = {
        ...formData,
        // Convert empty strings to undefined for optional fields
        link: formData.link || undefined,
        imageLink: formData.imageLink || undefined,
      };

      // Directly call the add function instead of setting state
      if (activeModal === "create" && addFunction) {
        addFunction(newEvent as Event);
      }
    } else if (contentType === "merch") {
      const newMerch = {
        ...formData,
        link: formData.link || undefined,
        imageLink: formData.imageLink || undefined,
      };
      console.log("New Merch:", newMerch);

      // Handle merch similarly...
    }

    // Reset the form
    if (contentType === "event") {
      eventForm.reset();
    } else {
      merchForm.reset();
    }

    // Close the modal after submission
    close();
  };

  const getDialog = (
    modalType: ModalType,
    contentType: ContentType,
    isOpen: boolean,
    onClose: () => void
  ) => {
    let title = "";
    let content = null;
    const formId = `${contentType}-${modalType}-form`; // Create unique form ID

    if (contentType === "event") {
      if (modalType === "create") {
        title = "Create Event";
        content = (
          <div>
            <Form {...eventForm}>
              <form
                id={formId}
                onSubmit={eventForm.handleSubmit(handleSubmitEvent)}
                className="space-y-4"
              >
                {/* Title */}
                <FormField
                  control={eventForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Event Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Location */}
                <FormField
                  control={eventForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
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
                          <FormLabel>Date and Time</FormLabel>
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
                            <FormLabel className="text-xs">Hour</FormLabel>
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
                            <FormLabel className="text-xs">Minute</FormLabel>
                            <Select
                              value={
                                field.value
                                  ? String(
                                      new Date(field.value).getMinutes()
                                    ).padStart(2, "0")
                                  : "00"
                              }
                              onValueChange={(value) => {
                                const currentDate = field.value
                                  ? new Date(field.value)
                                  : new Date();
                                currentDate.setMinutes(parseInt(value));
                                field.onChange(currentDate.toISOString());
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
                            <FormLabel className="text-xs">AM/PM</FormLabel>
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
                                } else if (value === "PM" && currentHour < 12) {
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
                      <FormLabel>Location</FormLabel>
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
          </div>
        );
      } else if (modalType === "edit") {
        title = "Edit Event";
        content = <div>Edit event form content goes here</div>;
      } else if (modalType === "delete") {
        title = "Delete Event";
        content = <div>Are you sure you want to delete this event?</div>;
      }
    } else if (contentType === "merch") {
      if (modalType === "create") {
        title = "Create Merch";
        content = <div>Create merch form content goes here</div>;
      } else if (modalType === "edit") {
        title = "Edit Merch";
        content = <div>Edit merch form content goes here</div>;
      } else if (modalType === "delete") {
        title = "Delete Merch";
        content = <div>Are you sure you want to delete this merch?</div>;
      }
    }

    const hasForm =
      (modalType === "create" || modalType === "edit") &&
      (contentType === "event" || contentType === "merch");

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {content}
          <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            {hasForm ? (
              <Button variant="default" type="submit" form={formId}>
                Confirm
              </Button>
            ) : (
              <Button variant="default" onClick={onClose}>
                Confirm
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const getIcon = () => {
    if (contentType === "event") return <CalendarClock size={18} />;
    if (contentType === "merch") return <ShoppingBag size={18} />;
  };

  const getCreateButtonText = () => {
    return `Create ${contentType === "event" ? "Event" : "Merch"}`;
  };

  const getEditButtonText = () => {
    return `Edit ${contentType === "event" ? "Event" : "Merch"}`;
  };

  const getDeleteButtonText = () => {
    return `Delete ${contentType === "event" ? "Event" : "Merch"}`;
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        <Button variant="default" onClick={open("create")}>
          {getIcon()}
          {getCreateButtonText()}
        </Button>
        <Button variant="secondary" onClick={open("edit")}>
          <Edit size={18} />
          {getEditButtonText()}
        </Button>
        <Button variant="destructive" onClick={open("delete")}>
          <Trash2 size={18} />
          {getDeleteButtonText()}
        </Button>
      </div>

      {getDialog("create", contentType, activeModal === "create", close)}
      {getDialog("edit", contentType, activeModal === "edit", close)}
      {getDialog("delete", contentType, activeModal === "delete", close)}
    </>
  );
}
