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
import { ShoppingBag, Trash2, Edit, PackagePlus } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/AuthContext";
import { Merch } from "@/types";
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import MerchForm from "@/components/MerchForm";

const FALLBACK_MERCH: Merch[] = [
  {
    id: 1,
    name: "SEAC Stickers",
    description: "Available Now",
    imageLink:
      "https://portal.hellorubric.com/assets/uploadedimgs/730e0c03377bb3a8bd015a42bc3fe9c4.png",
  },
  {
    id: 2,
    name: "SEAC Hoodies",
    description: "Coming Soon",
    imageLink:
      "https://portal.hellorubric.com/assets/uploadedimgs/your-hoodie-image-id.png",
  },
  {
    id: 3,
    name: "SEAC Tote Bags",
    description: "Pre-Order",
    imageLink:
      "https://portal.hellorubric.com/assets/uploadedimgs/your-tote-image-id.png",
  },
  {
    id: 4,
    name: "SEAC T-Shirts",
    description: "Limited Edition",
    imageLink:
      "https://portal.hellorubric.com/assets/uploadedimgs/your-tshirt-image-id.png",
  },
];

type MerchFormValues = {
  name: string;
  description: string;
  link?: string;
  imageLink?: string;
};

export default function MerchPage() {
  const { user } = useAuth();
  const [merchItems, setMerchItems] = useState<Merch[]>([]);
  const [loading, setLoading] = useState(true);
  const [merchToDelete, setMerchToDelete] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [refetchMerch, setRefetchMerch] = useState(false);

  const handleCreateMerchSubmit = (values: MerchFormValues) => {
    // Create a proper merch object
    const newMerch = {
      ...values,
      // Convert empty strings to undefined for optional fields
      link: values.link || undefined,
      imageLink: values.imageLink || undefined,
    };

    // Call the addMerch function
    addMerch(newMerch as Merch);

    // Close dialog
    setIsCreateDialogOpen(false);
  };

  const handleUpdateMerchSubmit =
    (merchId: number) => (values: MerchFormValues) => {
      const updatedMerch = {
        ...values,
        // Convert empty strings to undefined for optional fields
        link: values.link || undefined,
        imageLink: values.imageLink || undefined,
      };

      updateMerch(merchId, updatedMerch as Merch);
      toast.success("Merchandise item updated successfully!");
      setRefetchMerch(true);
    };

  useEffect(() => {
    fetchMerchItems();
  }, []);

  useEffect(() => {
    if (refetchMerch) {
      fetchMerchItems();
      setRefetchMerch(false);
    }
  }, [refetchMerch]);

  const fetchMerchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("merch")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error fetching merch items: " + error.message);
      // Fallback Data
      setMerchItems(FALLBACK_MERCH);
      setLoading(false);
    } else {
      console.log("Fetched merch items:", data);
      setMerchItems(data);
      setLoading(false);
    }
  };

  const addMerch = async (merch: Merch) => {
    try {
      console.log("Adding merch:", merch);
      const { data, error } = await supabase
        .from("merch")
        .insert([merch])
        .select("*");

      if (error) {
        console.error("Error adding merch:", error.message);
        toast.error("Error adding merch: " + error.message);
      } else {
        setMerchItems((prevMerch) => [...prevMerch, ...data]);
        toast.success("Merchandise item added successfully!");
        console.log("Added merch:", data);
      }
    } catch (error) {
      toast.error("Error adding merch: " + error);
      console.error("Error adding merch:", error);
    } finally {
      setRefetchMerch(true);
    }
  };

  const deleteMerch = async (merchId: number) => {
    try {
      const { data, error } = await supabase
        .from("merch")
        .delete()
        .eq("id", merchId)
        .select("*");

      if (error) {
        console.error("Error deleting merch:", error.message);
        toast.error("Error deleting item: " + error.message);
      } else {
        setMerchItems((prevMerch) =>
          prevMerch.filter((merch) => merch.id !== merchId)
        );
        toast.success("Merchandise item deleted successfully!");
        console.log("Deleted merch:", data);
        setRefetchMerch(true);
      }
    } catch (error) {
      console.error("Error deleting merch:", error);
      toast.error("Error deleting item: " + error);
    }
  };

  const updateMerch = async (merchId: number, updatedMerch: Merch) => {
    try {
      const { data, error } = await supabase
        .from("merch")
        .update(updatedMerch)
        .eq("id", merchId)
        .select("*");

      if (error) {
        console.error("Error updating merch:", error.message);
        toast.error("Error updating item: " + error.message);
      } else {
        setMerchItems((prevMerch) =>
          prevMerch.map((merch) =>
            merch.id === merchId ? { ...merch, ...updatedMerch } : merch
          )
        );
        console.log("Updated merch:", data);
        setRefetchMerch(true);
      }
    } catch (error) {
      console.error("Error updating merch:", error);
      toast.error("Error updating item: " + error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 mt-20 animate-fade-in">
      {/* Merch Section */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-2xl">SEAC Merch</CardTitle>
            <CardDescription>Show your SEAC pride</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Support our club and represent SEAC around campus with our official
            merchandise! Stay tuned for upcoming merch drops and limited edition
            items.
          </p>

          <Separator className="mb-4" />

          {user && (
            <div className="mb-4 flex justify-center">
              <Button
                variant="default"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <PackagePlus />
                Add Merch
              </Button>
            </div>
          )}

          {/* Create Merch Dialog */}
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Merchandise</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Please fill in all required fields marked with *.
                </DialogDescription>
              </DialogHeader>
              <MerchForm
                formId="create-merch-form"
                onSubmit={handleCreateMerchSubmit}
                submitButtonText="Add Merchandise"
                cancelButton={
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                }
              />
            </DialogContent>
          </Dialog>

          <div className="grid lg:grid-cols-2 gap-4">
            {loading ? (
              // Using shadcn Skeleton components while loading
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={`skeleton-${index}`} className="text-center gap-y-2">
                  <CardHeader>
                    <div className="relative w-full h-64 max-h-64 max-w-sm mx-auto flex justify-center">
                      <Skeleton className="w-full h-full rounded-md" />
                    </div>
                    <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                  </CardHeader>
                  <CardFooter className="flex justify-center">
                    <Skeleton className="h-8 w-1/2 mx-auto" />
                  </CardFooter>
                </Card>
              ))
            ) : (
              <>
                {/* Real merch items */}
                {merchItems.map((item) => (
                  <Card key={item.id} className="bg-muted text-center gap-y-2">
                    <CardHeader>
                      <div className="relative w-full h-64 max-h-64 max-w-sm mx-auto flex justify-center ">
                        {item.imageLink ? (
                          <Image
                            src={item.imageLink}
                            alt={item.name}
                            className="rounded-md object-contain w-full h-full bg-background/20"
                            width={600}
                            height={300}
                            priority={true}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-background/20 rounded-md">
                            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <CardTitle className="pt-4">{item.name}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>

                    <CardFooter className="flex flex-col gap-4">
                      <Button asChild className="w-full lg:w-1/2 mx-auto">
                        <Link
                          href={
                            item.link ||
                            "https://campus.hellorubric.com/?s=7807"
                          }
                          target="_blank"
                        >
                          <ShoppingBag className="mr-2" />
                          Purchase
                        </Link>
                      </Button>

                      {user && (
                        <div className="flex gap-2 w-full lg:w-1/2 mx-auto">
                          <AlertDialog
                            open={merchToDelete === item.id}
                            onOpenChange={(open) =>
                              !open && setMerchToDelete(null)
                            }
                          >
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => setMerchToDelete(item.id)}
                                className="flex-1"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Merchandise Item
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete &quot;
                                  {item.name}&quot;? This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    deleteMerch(item.id);
                                    setMerchToDelete(null);
                                  }}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="icon" className="flex-1">
                                <Edit size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Merchandise</DialogTitle>
                                <DialogDescription className="text-sm text-muted-foreground">
                                  Update merchandise details below.
                                </DialogDescription>
                              </DialogHeader>
                              <MerchForm
                                defaultValues={item}
                                formId={`edit-merch-form-${item.id}`}
                                onSubmit={handleUpdateMerchSubmit(item.id)}
                                submitButtonText="Update Merchandise"
                                cancelButton={
                                  <Button variant="secondary" type="button">
                                    Cancel
                                  </Button>
                                }
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                ))}

                {/* Coming soon placeholders when not loading */}
                {Array.from({ length: Math.max(0, 4 - merchItems.length) }).map(
                  (_, index) => (
                    <Card
                      key={`coming-soon-${index}`}
                      className="bg-muted text-center gap-y-2 border-dashed"
                    >
                      <CardHeader>
                        <div className="relative w-full h-64 max-h-64 max-w-sm mx-auto flex justify-center">
                          <div className="flex items-center justify-center w-full h-full bg-background/20 rounded-md">
                            <ShoppingBag className="h-16 w-16 text-muted-foreground opacity-50" />
                          </div>
                        </div>
                        <CardTitle className="pt-4">Coming Soon</CardTitle>
                        <CardDescription>
                          New merch dropping shortly
                        </CardDescription>
                      </CardHeader>

                      <CardFooter>
                        <Button disabled className="w-full lg:w-1/2 mx-auto">
                          <ShoppingBag className="mr-2" />
                          Not Available Yet
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
