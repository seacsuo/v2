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
import { ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function MerchPage() {
  // Define merch items using state with TypeScript interface
  const [merchItems, setMerchItems] = useState<
    Array<{
      id: number;
      name: string;
      description: string;
      imageLink?: string;
      link?: string;
    }>
  >([]);

  const [loading, setLoading] = useState(true);

  const fetchMerchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("merch")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Error fetching merch items: " + error.message);
      // Fallback Data
      setMerchItems([
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
      ]);
      setLoading(false);
    } else {
      console.log("Fetched merch items:", data);
      setMerchItems(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchItems();
  }, []);

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

                    <CardFooter>
                      <Button asChild className="w-full lg:w-1/2 mx-auto">
                        <Link
                          href={
                            item.link ||
                            "https://campus.hellorubric.com/?s=7807"
                          }
                          target="_blank"
                        >
                          <ShoppingBag />
                          Link
                        </Link>
                      </Button>
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
                          <ShoppingBag />
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
