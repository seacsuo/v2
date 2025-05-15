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
import { Merch } from "@/types";

// Merch schema for form validation
const merchSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  link: z.string().url("Invalid URL").optional().or(z.literal("")),
  imageLink: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type MerchFormValues = z.infer<typeof merchSchema>;

interface MerchFormProps {
  defaultValues?: Merch;
  onSubmit: (values: MerchFormValues) => void;
  formId: string;
  cancelButton?: React.ReactNode;
  submitButtonText: string;
}

export default function MerchForm({
  defaultValues,
  onSubmit,
  formId,
  cancelButton,
  submitButtonText,
}: MerchFormProps) {
  const form = useForm<MerchFormValues>({
    resolver: zodResolver(merchSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
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
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="Merch Name" {...field} />
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
                  placeholder="Merch Description"
                  {...field}
                />
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
              <FormLabel>Purchase Link</FormLabel>
              <FormControl>
                <Input placeholder="Purchase Link" {...field} />
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
                <Input placeholder="Merch Image Link" {...field} />
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
