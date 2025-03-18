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

export default function MerchPage() {
  // Define merch items using state with TypeScript interface
  const [merchItems, setMerchItems] = useState<
    Array<{
      id: number;
      name: string;
      status: string;
      imageLink?: string;
    }>
  >([]);

  useEffect(() => {
    setMerchItems([
      {
        id: 1,
        name: "SEAC Stickers",
        status: "Available Now",
        imageLink: "/merch/stickers.webp",
      },
      {
        id: 2,
        name: "SEAC Hoodies",
        status: "Coming Soon",
      },
      {
        id: 3,
        name: "SEAC Tote Bags",
        status: "Pre-Order",
      },
    ]);
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
          <div className="grid md:grid-cols-2 gap-4">
            {merchItems.map((item) => (
              <div
                key={item.id}
                className="bg-muted rounded-lg p-6 text-center"
              >
                <div className="relative w-full h-64 max-h-64 max-w-sm mx-auto mb-4 flex justify-center ">
                  {item.imageLink ? (
                    <Image
                      src={item.imageLink}
                      alt={item.name}
                      className="rounded-md object-contain w-full h-full bg-background/20"
                      width={600}
                      height={300}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-background/20 rounded-md">
                      <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-muted-foreground">{item.status}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild size="lg" className="w-1/2 mx-auto">
            <Link href="https://campus.hellorubric.com/?s=7807" target="_blank">
              <ShoppingBag />
              Shop Merch on Rubric
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
