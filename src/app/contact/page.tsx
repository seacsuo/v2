import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function ContactPage() {
  return (
    <Card className="container my-26 mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl lg:text-6xl">
          Contact Us
        </CardTitle>
        <CardDescription className="text-center text-lg lg:text-2xl">
          We would love to hear from you! Feel free to reach out to us on any of
          the following platforms.
        </CardDescription>
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
  );
}
