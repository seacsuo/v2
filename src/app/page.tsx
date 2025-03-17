import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import preciousmemoriesvietnam from "@public/landing/preciousmemoriesvietnam.jpg";
import seacLogo from "@/app/icon.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <div className="relative">
        <Image
          src={preciousmemoriesvietnam}
          alt="Precious Memories Vietnam"
          className="w-screen h-screen inset-0 object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Card className="w-full mx-4 lg:w-1/2 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="lg:text-7xl text-2xl">
                Let&apos;s Have Fun With SEAC!
              </CardTitle>
              <CardDescription className="lg:text-2xl text-lg">
                A club that celebrates the diverse cultures of South East Asia.
              </CardDescription>
              <CardFooter className="flex justify-center ">
                <Button size="lg" variant={"default"}>
                  Join Us
                </Button>
              </CardFooter>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-0 lg:gap-4 my-10 gap-y-4">
        <Card className="mx-4">
          <CardHeader>
            <CardTitle className="text-center lg:text-6xl text-2xl">
              About SEAC
            </CardTitle>
            <CardDescription className="text-center lg:text-2xl text-lg">
              South East Asian Club (SEAC) is a part of Student Union Okanagan
              (SUO) at UBC Okanagan. Our mission is to create a vibrant and
              inclusive community that celebrates, shares, and promotes the rich
              cultural heritage of Southeast Asia, while fostering an immersive
              and enriching Southeast Asian experience for all students to
              enjoy!
            </CardDescription>
            <CardFooter className="flex items-center gap-4 justify-center">
              <Button asChild size="lg" variant={"default"}>
                <Link href="/about">Learn More</Link>
              </Button>
              <Button asChild size="lg" variant={"default"}>
                <Link href="/events">Merch</Link>
              </Button>
            </CardFooter>
          </CardHeader>
        </Card>
        <Card className="mx-4">
          <CardHeader>
            <CardTitle className="text-center lg:text-6xl text-2xl">
              About SEAC
            </CardTitle>
            <CardDescription className="text-center lg:text-2xl text-lg">
              South East Asian Club (SEAC) is a part of Student Union Okanagan
              (SUO) at UBC Okanagan. Our mission is to create a vibrant and
              inclusive community that celebrates, shares, and promotes the rich
              cultural heritage of Southeast Asia, while fostering an immersive
              and enriching Southeast Asian experience for all students to
              enjoy!
            </CardDescription>
            <CardFooter className="flex items-center gap-4 justify-center">
              <Button asChild size="lg" variant={"default"}>
                <Link href="/about">Learn More</Link>
              </Button>
              <Button asChild size="lg" variant={"default"}>
                <Link href="/events">Merch</Link>
              </Button>
            </CardFooter>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
