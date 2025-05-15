import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Event } from "@/types";

// Event schema for form validation
const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  datetime: z.string().min(1, "Date and time are required"),
  location: z.string().min(1, "Location is required"),
  link: z.string().url("Invalid URL").optional().or(z.literal("")),
  imageLink: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormProps {
  defaultValues?: Event;
  onSubmit: (values: EventFormValues) => void;
  formId: string;
  cancelButton?: React.ReactNode;
  submitButtonText: string;
}

export default function EventForm({
  defaultValues,
  onSubmit,
  formId,
  cancelButton,
  submitButtonText,
}: EventFormProps) {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      datetime: defaultValues?.datetime || new Date().toISOString(),
      location: defaultValues?.location || "",
      link: defaultValues?.link || "",
      imageLink: defaultValues?.imageLink || "",
    },
  });

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Title */}
        <FormField
          control={form.control}
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
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description*</FormLabel>
              <FormControl>
                <Textarea
                  className="h-20"
                  placeholder="Event Description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Date and Time Picker */}
        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col gap-2">
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
                        {field.value
                          ? format(new Date(field.value), "PPP")
                          : "Select date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          try {
                            const currentDateTime = field.value
                              ? new Date(field.value)
                              : new Date();

                            // Ensure the date is valid before setting hours/minutes
                            const newDate = new Date(date);

                            // Copy the time from the current value
                            newDate.setHours(currentDateTime.getHours());
                            newDate.setMinutes(currentDateTime.getMinutes());

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
              <div className="flex gap-2">
                <div className="grid gap-1">
                  <FormLabel className="text-xs">Hour*</FormLabel>
                  <Select
                    defaultValue={String(
                      new Date(field.value).getHours() % 12 || 12
                    )}
                    onValueChange={(value) => {
                      try {
                        const currentDate = new Date(field.value);

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
                    defaultValue={String(
                      new Date(field.value).getMinutes()
                    ).padStart(2, "0")}
                    onValueChange={(value) => {
                      try {
                        // Ensure we start with a valid date
                        const currentDate = new Date(field.value);

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
                    defaultValue={
                      new Date(field.value).getHours() >= 12 ? "PM" : "AM"
                    }
                    onValueChange={(value) => {
                      const currentDate = new Date(field.value);
                      const currentHour = currentDate.getHours();
                      const is12Hour = currentHour % 12 === 0;

                      if (value === "AM" && currentHour >= 12) {
                        currentDate.setHours(is12Hour ? 0 : currentHour - 12);
                      } else if (value === "PM" && currentHour < 12) {
                        currentDate.setHours(is12Hour ? 12 : currentHour + 12);
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
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Location */}
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
        {cancelButton && (
          <div className="flex justify-end gap-2 pt-2">
            {cancelButton}
            <Button type="submit">{submitButtonText}</Button>
          </div>
        )}
      </form>
    </Form>
  );
}
