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
import {
  History,
  Target,
  ShoppingBag,
  Users,
  Calendar,
  GraduationCap,
} from "lucide-react";
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
    <div className="container mx-auto px-4 py-8 space-y-8 mt-20">
      {/* History Section */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <History className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-2xl">History of SEAC</CardTitle>
            <CardDescription>Our journey through the years</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            SEAC was founded around a decade ago (we&apos;re digging through the
            old Facebook account and it may actually be back in 2012!), by
            students aiming to create a community that is inviting, inclusive,
            and feels welcoming to all UBCO students!
          </p>
          <p>
            This club has run lots of events in the past ranging from lantern
            events, scavenger hunts, movie nights, and recently larger social
            events like galas.
          </p>
          <p>
            Despite the changes in the presence and efforts of SEAC at UBCO, our
            club has always made it our goal to foster a fun, positive, and
            welcoming community for all students through various events and
            initiatives!
          </p>
        </CardContent>
      </Card>

      {/* Goals Section */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <Target className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-2xl">Our Goals</CardTitle>
            <CardDescription>What drives our community</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Goal 1 */}
            <Card className="border-0 shadow-sm bg-primary/5">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-center text-lg">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  Create a strong, connected, and inclusive community for all
                  students. We aim to provide a safe space for students to
                  connect with each other and share their experiences throughout
                  their time at UBCO.
                </p>
              </CardContent>
            </Card>

            {/* Goal 2 */}
            <Card className="border-0 shadow-sm bg-primary/5">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <Calendar className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-center text-lg">
                  Cultural Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  Provide and facilitate a wide range of events/projects
                  intertwined with SEA culture to share the SEA experience with
                  all students at UBCO.
                </p>
              </CardContent>
            </Card>

            {/* Goal 3 */}
            <Card className="border-0 shadow-sm bg-primary/5">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  <GraduationCap className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-center text-lg">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  Educate students in our community about Southeast Asia and all
                  that it has to offer; sharing and teaching about the aspects
                  and perspectives beyond what is often portrayed in the Western
                  world, if at all included.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

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
          <div className="grid md:grid-cols-3 gap-4">
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
