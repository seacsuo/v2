import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const links: { icon: string; href: string; label: string }[] = [
  {
    icon: "/icons/instagram-svgrepo-com.svg",
    href: "https://www.instagram.com/seac.suo/",
    label: "Instagram",
  },
  {
    icon: "/icons/mail-svgrepo-com.svg",
    href: "mailto:seac.suo@gmail.com",
    label: "Mail",
  },
  {
    icon: "/icons/linkedin-linked-in-svgrepo-com.svg",
    href: "https://www.linkedin.com/in/southeast-asian-club-seac-980a43331/",
    label: "Linked In",
  },
];

export default function HomePage() {
  return (
    <>
      <div className="relative">
        <Image
          src="/landing/preciousmemoriesvietnam.jpg"
          width={1920}
          height={1080}
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
            </CardHeader>
            <CardFooter className="flex justify-center ">
              <Link href="/events">
                <Button size="lg" variant={"default"}>
                  Join Our Next Event
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="border-x container mx-auto h-10 border-dashed"></div>
      <Separator />
      <Card className="container mx-auto p-4 bg-transparent rounded-none border-y-0 shadow-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center  gap-y-4 lg:gap-4 lg:gap-y-0">
          <Card className="mx-4 lg:mx-0 h-auto lg:h-96">
            <CardHeader>
              <CardTitle className="text-center lg:text-6xl text-2xl">
                About SEAC
              </CardTitle>
              <CardDescription className="text-center lg:text-2xl text-lg">
                South East Asian Club (SEAC) is a part of Student Union Okanagan
                (SUO) at UBC Okanagan. Our mission is to create a vibrant and
                inclusive community that celebrates, shares, and promotes the
                rich cultural heritage of Southeast Asia, while fostering an
                immersive and enriching Southeast Asian experience for all
                students to enjoy!
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center gap-4 justify-center">
              <Link href="/about">
                <Button size="lg" variant={"default"}>
                  Learn More
                  <SquareArrowOutUpRight />
                </Button>
              </Link>
              <Link href="/events">
                <Button size="lg" variant={"default"}>
                  Merch
                  <SquareArrowOutUpRight />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="mx-4 lg:mx-0 h-auto lg:h-96 ">
            <CardHeader>
              <CardTitle className="text-center lg:text-6xl text-2xl">
                SEAC In Kelowna
              </CardTitle>
              <CardDescription className="text-center lg:text-2xl text-lg">
                Kelowna is a city located in the Okanagan Valley in the province
                of British Columbia, Canada. It is a city known for its
                beautiful landscapes, wineries, and outdoor activities. In
                Kelowna, you can find many Southeast Asian restaurants, shops,
                and cultural events that promotes the diverse cultures of
                Southeast Asia.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center gap-4 justify-center">
              <Link href="/about">
                <Button size="lg" variant={"default"}>
                  Learn More
                  <SquareArrowOutUpRight />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </Card>
      {/* <Card className="container mx-auto rounded-none border-y shadow-none bg-transparent">
        <Card className="container w-1/2 mx-auto">
          <CardHeader className="text-center text-2xl lg:text-6xl">
            <CardTitle>Let&apos;s Connect!</CardTitle>
          </CardHeader>
          <CardFooter className="flex items-center justify-center gap-4">
            {links.map(({ icon, href, label }) => (
              <Link key={label} href={href}>
                <Button size="lg" variant={"default"}>
                  <Image
                    src={icon}
                    width={24}
                    height={24}
                    alt={label}
                    className="invert-100"
                  />
                  {label}
                </Button>
              </Link>
            ))}
          </CardFooter>
        </Card>
      </Card> 
      <div className="border-x container mx-auto h-10 border-dashed"></div> */}
    </>
  );
}
