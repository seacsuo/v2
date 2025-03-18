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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Clock, Users, ExternalLink } from "lucide-react";

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
    initial: "EC",
  },
  {
    name: "Internal Coordinator",
    email: "seac.suo@gmail.com",
    role: "Internal",
    initial: "IC",
  },
  {
    name: "External Coordinator",
    email: "seac.suo@gmail.com",
    role: "External",
    initial: "EC",
  },
];

const faqs = [
  {
    question: "How do I join SEAC?",
    answer:
      "You can join SEAC by attending our events and signing up for our mailing list. Follow us on Instagram for updates on upcoming events!",
  },
  {
    question: "When do you meet?",
    answer:
      "We host events throughout the academic year. Check our Events page or social media for the latest schedule.",
  },
  {
    question: "Do I need to be Southeast Asian to join?",
    answer:
      "Not at all! SEAC welcomes students of all backgrounds who are interested in Southeast Asian cultures.",
  },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 mt-20  items-center flex flex-col justify-center">
      <Card className="shadow-md overflow-hidden w-full h-3/4 flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-center text-3xl lg:text-5xl">
            Get In Touch
          </CardTitle>
          <CardDescription className="text-center text-lg text-white/90">
            We&apos;d love to hear from you! Connect with SEAC through any of
            our channels.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <Tabs defaultValue="connect" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="connect">Connect With Us</TabsTrigger>
              <TabsTrigger value="team">Meet The Team</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="connect" className="mt-4">
              <div className="grid md:grid-cols-3 gap-6">
                {socialLinks.map((link) => (
                  <HoverCard key={link.label}>
                    <HoverCardTrigger asChild>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
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
                                className="text-primary"
                              />
                            </div>
                            <h3 className="font-bold text-xl mb-2">
                              {link.label}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {link.description}
                            </p>
                          </CardContent>
                        </Link>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div>
                          <h4 className="text-sm font-semibold">
                            {link.label}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {link.description}
                          </p>
                          <div className="flex items-center pt-2">
                            <ExternalLink className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Click to visit
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team" className="mt-4">
              <p className="text-center text-muted-foreground mb-6">
                Meet the people behind SEAC who work hard to make our community
                thrive!
              </p>

              <div className="grid md:grid-cols-4 gap-6">
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
                        <Badge variant="outline" className="mt-1">
                          {member.role}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2 pb-4 flex justify-center">
                      <Button variant="outline" asChild size="sm">
                        <Link href={`mailto:${member.email}`}>
                          <Mail className="mr-2 h-4 w-4" />
                          Contact
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faq" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </CardContent>

        <Separator className="my-2" />

        <CardFooter className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            <span>University of British Columbia, Okanagan Campus</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>Response time: 1-2 business days</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
