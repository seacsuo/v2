"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

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

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 mt-20 items-center flex flex-col justify-center animate-fade-in">
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

        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {socialLinks.map((link) => (
              <Card
                key={link.label}
                className="hover:shadow-lg transition-shadow cursor-pointer bg-primary/10"
              >
                <Link href={link.href} target="_blank" className="block h-full">
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
        </CardContent>
      </Card>
    </div>
  );
}
