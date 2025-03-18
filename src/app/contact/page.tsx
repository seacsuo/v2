"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";

const socialLinks = [
  {
    icon: "/icons/instagram-svgrepo-com.svg",
    href: "https://www.instagram.com/seac.suo/",
    label: "Instagram",
    description: "Follow us for event updates and photos",
  },
  {
    icon: "/icons/mail-svgrepo-com.svg",
    href: "mailto:seac.suo@gmail.com",
    label: "Mail",
    description: "Email us with any questions",
  },
  {
    icon: "/icons/linkedin-linked-in-svgrepo-com.svg",
    href: "https://www.linkedin.com/in/southeast-asian-club-seac-980a43331/",
    label: "LinkedIn",
    description: "Connect with us professionally",
  },
];

const teamMembers = [
  {
    name: "SEAC President",
    email: "seac.suo@gmail.com",
    role: "President",
    initial: "P",
  },
  {
    name: "Events Coordinator",
    email: "seac.suo@gmail.com",
    role: "Events",
    initial: "EvC",
  },
  {
    name: "Internal Coordinator",
    email: "seac.suo@gmail.com",
    role: "Internal",
    initial: "InC",
  },
  {
    name: "External Coordinator",
    email: "seac.suo@gmail.com",
    role: "External",
    initial: "ExC",
  },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 mt-20 items-center flex flex-col justify-center">
      <Card className="shadow-md overflow-hidden w-full h-3/4 flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-center text-3xl lg:text-5xl">
            Get In Touch
          </CardTitle>
          <CardDescription className="text-center text-lg">
            We&apos;d love to hear from you! Connect with SEAC through any of
            our channels.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <Tabs defaultValue="connect" className="w-full">
            <TabsList className="grid w-full  h-full grid-cols-2 gap-4 bg-primary/10">
              <TabsTrigger value="connect" className="w-full">
                Connect With Us
              </TabsTrigger>
              <TabsTrigger value="team" className="w-full">
                Meet The Team
              </TabsTrigger>
            </TabsList>

            <TabsContent value="connect" className="mt-4">
              <div className="grid md:grid-cols-2 gap-6">
                {socialLinks.map((link) => (
                  <Card
                    key={link.label}
                    className="hover:shadow-lg transition-shadow cursor-pointer bg-primary/10"
                  >
                    <Link
                      href={link.href}
                      target="_blank"
                      className="block h-full"
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                          <Image
                            src={link.icon}
                            width={32}
                            height={32}
                            alt={link.label}
                            className="text-primary dark:invert-100 not:dark:invert-0"
                          />
                        </div>
                        <h3 className="font-bold text-xl mb-2">{link.label}</h3>
                        <p className="text-muted-foreground text-sm">
                          {link.description}
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team" className="mt-4">
              <p className="text-center text-muted-foreground mb-6">
                Meet the people behind SEAC who work hard to make our community
                thrive!
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {teamMembers.map((member) => (
                  <Card key={member.role} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-center mb-4">
                        <Avatar className="h-16 w-16 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {member.initial}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <CardTitle className="text-center">
                        {member.name}
                      </CardTitle>
                      <CardDescription className="text-center flex justify-center">
                        <Badge variant="default" className="mt-1">
                          {member.role}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2 pb-4 flex justify-center">
                      <Button variant="outline" asChild size="sm">
                        <Link href={`mailto:${member.email}`}>
                          <Mail />
                          Contact
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
