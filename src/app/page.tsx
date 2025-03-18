import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  History,
  Calendar,
  GraduationCap,
  SquareArrowOutUpRight,
  Target,
  Users,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
      <Card className="container mx-auto p-4 bg-transparent rounded-none border-y-0 shadow-none flex flex-col space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-y-4 lg:gap-4 lg:gap-y-0">
          <Card className="h-auto lg:h-96">
            <CardHeader>
              <CardTitle className="text-center lg:text-6xl text-2xl">
                About SEAC
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center lg:text-2xl text-lg">
              South East Asian Club (SEAC) is a part of Student Union Okanagan
              (SUO) at UBC Okanagan. Our mission is to create a vibrant and
              inclusive community that celebrates, shares, and promotes the rich
              cultural heritage of Southeast Asia, while fostering an immersive
              and enriching Southeast Asian experience for all students to
              enjoy!
            </CardContent>
            <CardFooter className="flex items-center gap-4 justify-center">
              <Link href="/merch">
                <Button size="lg" variant={"default"}>
                  Merch
                  <SquareArrowOutUpRight />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="h-auto lg:h-96 ">
            <CardHeader>
              <CardTitle className="text-center lg:text-6xl text-2xl">
                SEAC In Kelowna
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center lg:text-2xl text-lg">
              Kelowna is a city located in the Okanagan Valley in the province
              of British Columbia, Canada. It is a city known for its beautiful
              landscapes, wineries, and outdoor activities. In Kelowna, you can
              find many Southeast Asian restaurants, shops, and cultural events
              that promotes the diverse cultures of Southeast Asia.
            </CardContent>
            <CardFooter className="flex items-center gap-4 justify-center">
              <Link href="/seainywl">
                <Button size="lg" variant={"default"}>
                  Learn More
                  <SquareArrowOutUpRight />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        {/* History Section */}
        <Card className="shadow-md container mx-auto">
          <CardHeader className="flex flex-row items-center gap-4">
            <History className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">History of SEAC</CardTitle>
              <CardDescription>Our journey through the years</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              SEAC was founded around a decade ago (we&apos;re digging through
              the old Facebook account and it may actually be back in 2012!), by
              students aiming to create a community that is inviting, inclusive,
              and feels welcoming to all UBCO students!
            </p>
            <p>
              This club has run lots of events in the past ranging from lantern
              events, scavenger hunts, movie nights, and recently larger social
              events like galas.
            </p>
            <p>
              Despite the changes in the presence and efforts of SEAC at UBCO,
              our club has always made it our goal to foster a fun, positive,
              and welcoming community for all students through various events
              and initiatives!
            </p>
          </CardContent>
        </Card>
        {/* Goals Section */}
        <Card className="shadow-md container mx-auto">
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
                  <CardTitle className="text-center text-lg">
                    Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center">
                    Create a strong, connected, and inclusive community for all
                    students. We aim to provide a safe space for students to
                    connect with each other and share their experiences
                    throughout their time at UBCO.
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
                    intertwined with SEA culture to share the SEA experience
                    with all students at UBCO.
                  </p>
                </CardContent>
              </Card>

              {/* Goal 3 */}
              <Card className="border-0 shadow-sm bg-primary/5">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-2">
                    <GraduationCap className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-center text-lg">
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center">
                    Educate students in our community about Southeast Asia and
                    all that it has to offer; sharing and teaching about the
                    aspects and perspectives beyond what is often portrayed in
                    the Western world, if at all included.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </Card>
    </>
  );
}
