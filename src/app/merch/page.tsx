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
import { Loader2, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function MerchPage() {
  // Define merch items using state with TypeScript interface
  const [merchItems, setMerchItems] = useState<
    Array<{
      id: number;
      name: string;
      description: string;
      imageLink?: string;
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
    <div className="container mx-auto px-4 py-8 space-y-8 mt-20 ">
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
          <div className="grid lg:grid-cols-2  gap-4">
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
                      href="https://campus.hellorubric.com/?s=7807"
                      target="_blank"
                    >
                      <ShoppingBag />
                      Shop Merch on Rubric
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <Loader2 size={50} className="animate-spin text-primary" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
